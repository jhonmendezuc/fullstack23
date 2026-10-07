import React, { useState, useEffect, useMemo, useCallback } from 'react';
import TaskService from '../../services/TaskService.js';
import TaskTable from '../task/TaskTable.jsx';
import TaskDialog from '../task/TaskDialog.jsx';
import ConfirmDialog from '../task/ConfirmDialog.jsx';

import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  LinearProgress,
  Avatar,
  Tab,
  Tabs,
  Paper
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import LogoutIcon from '@mui/icons-material/Logout';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import FilterListIcon from '@mui/icons-material/FilterList';

/**
 * Módulo principal CRUD para la gestión de Tareas
 */
function Task({ dataUser = {}, onLogout }) {
  // Estado de las tareas
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Estados de diálogo
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [saving, setSaving] = useState(false);

  // Estados de confirmación de eliminación
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Estado para cambio rápido de estado
  const [togglingId, setTogglingId] = useState(null);

  // Filtros y búsqueda
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'pending', 'completed'

  // Notificaciones Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info', // 'success', 'error', 'warning', 'info'
  });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Cargar tareas desde la API
  const fetchTasks = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const data = await TaskService.obtenerTareas();
      // Asegurarse de que data sea un arreglo (algunos backends retornan { datos: [] })
      const taskList = Array.isArray(data)
        ? data
        : Array.isArray(data?.datos)
        ? data.datos
        : [];
      setTasks(taskList);
      if (isRefresh) {
        showSnackbar('Lista de tareas actualizada', 'info');
      }
    } catch (error) {
      console.error('Error al cargar tareas:', error);
      const errorMsg =
        error.response?.data?.mensaje ||
        error.response?.data?.respuesta ||
        error.message ||
        'Error de conexión al cargar las tareas';
      showSnackbar(errorMsg, 'error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Manejar creación / apertura de modal
  const handleOpenCreate = () => {
    setEditingTask(null);
    setOpenFormDialog(true);
  };

  // Manejar edición
  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setOpenFormDialog(true);
  };

  // Guardar tarea (Crear o Editar)
  const handleSaveTask = async (formData) => {
    setSaving(true);
    try {
      if (editingTask && editingTask.id) {
        // Actualizar
        await TaskService.actualizarTarea(editingTask.id, {
          ...formData,
          usuarioId: editingTask.usuarioId || dataUser?.id,
        });
        showSnackbar('Tarea actualizada con éxito', 'success');
      } else {
        // Crear
        await TaskService.crearTarea({
          ...formData,
          usuarioId: dataUser?.id,
        });
        showSnackbar('Tarea creada con éxito', 'success');
      }

      setOpenFormDialog(false);
      setEditingTask(null);
      await fetchTasks(false);
    } catch (error) {
      console.error('Error al guardar tarea:', error);
      const errorMsg =
        error.response?.data?.mensaje ||
        error.response?.data?.respuesta ||
        error.message ||
        'Error al procesar la tarea en el servidor';
      showSnackbar(errorMsg, 'error');
    } finally {
      setSaving(false);
    }
  };

  // Manejar eliminación
  const handleOpenDelete = (task) => {
    setTaskToDelete(task);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;

    setDeleting(true);
    try {
      await TaskService.eliminarTarea(taskToDelete.id);
      showSnackbar(`Tarea "${taskToDelete.nombre}" eliminada`, 'success');
      setOpenConfirmDialog(false);
      setTaskToDelete(null);
      await fetchTasks(false);
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      const errorMsg =
        error.response?.data?.mensaje ||
        error.response?.data?.respuesta ||
        error.message ||
        'Error al eliminar la tarea en el servidor';
      showSnackbar(errorMsg, 'error');
    } finally {
      setDeleting(false);
    }
  };

  // Alternar estado completada / pendiente
  const handleToggleStatus = async (task) => {
    setTogglingId(task.id);
    const nuevoEstado = !task.estado;

    // Actualización optimista en el estado local
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, estado: nuevoEstado } : t))
    );

    try {
      await TaskService.actualizarTarea(task.id, {
        ...task,
        estado: nuevoEstado,
        usuarioId: task.usuarioId || dataUser?.id,
      });
      showSnackbar(
        nuevoEstado
          ? `Tarea "${task.nombre}" marcada como completada`
          : `Tarea "${task.nombre}" marcada como pendiente`,
        'success'
      );
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      // Revertir optimismo
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, estado: task.estado } : t))
      );
      const errorMsg =
        error.response?.data?.mensaje ||
        error.response?.data?.respuesta ||
        error.message ||
        'No se pudo actualizar el estado de la tarea';
      showSnackbar(errorMsg, 'error');
    } finally {
      setTogglingId(null);
    }
  };

  // Cierre de sesión local
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('token');
      window.location.reload();
    }
  };

  // Métricas calculadas
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => Boolean(t.estado)).length;
    const pending = total - completed;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, percentage };
  }, [tasks]);

  // Filtrado de tareas
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Filtro de estado
      if (statusFilter === 'pending' && task.estado) return false;
      if (statusFilter === 'completed' && !task.estado) return false;

      // Filtro de búsqueda por texto
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = task.nombre?.toLowerCase().includes(query);
        const matchesDesc = task.descripcion?.toLowerCase().includes(query);
        return matchesName || matchesDesc;
      }

      return true;
    });
  }, [tasks, statusFilter, searchQuery]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        py: 4,
        px: { xs: 2, sm: 3, md: 4 },
        textAlign: 'left',
      }}
    >
      <Container maxWidth="lg" disableGutters>
        {/* Barra superior de navegación / Encabezado */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 3 },
            mb: 4,
            borderRadius: 3,
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 16px rgba(79, 70, 229, 0.25)',
              }}
            >
              <TaskAltIcon sx={{ fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight="800" color="#0f172a">
                Gestor de Tareas
              </Typography>
              <Typography variant="body2" color="#64748b">
                Bienvenido,&nbsp;
                <strong style={{ color: '#334155' }}>
                  {dataUser?.nombre || dataUser?.correo || 'Usuario'}
                </strong>
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            <Chip
              avatar={<Avatar sx={{ bgcolor: '#e0e7ff', color: '#4338ca', fontWeight: 'bold' }}>✓</Avatar>}
              label="Sesión Activa"
              color="success"
              variant="outlined"
              size="small"
              sx={{ fontWeight: 600, display: { xs: 'none', md: 'inline-flex' } }}
            />

            <Button
              variant="outlined"
              color="inherit"
              size="small"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                borderColor: '#cbd5e1',
                color: '#475569',
                '&:hover': {
                  borderColor: '#94a3b8',
                  backgroundColor: '#f1f5f9',
                },
              }}
            >
              Cerrar Sesión
            </Button>
          </Box>
        </Paper>

        {/* Tarjetas de Estadísticas y Progreso */}
        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          {/* Card Total */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.03)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.06)',
                },
              }}
            >
              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" color="#64748b" fontWeight="600">
                      Total de Tareas
                    </Typography>
                    <Typography variant="h4" fontWeight="800" color="#0f172a" sx={{ mt: 0.5 }}>
                      {stats.total}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      backgroundColor: '#eff6ff',
                      color: '#2563eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <AssignmentIcon sx={{ fontSize: 26 }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Card Pendientes */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: '1px solid #fed7aa',
                backgroundColor: '#fffbeb',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.03)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(245, 158, 11, 0.1)',
                },
              }}
            >
              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" color="#92400e" fontWeight="600">
                      Tareas Pendientes
                    </Typography>
                    <Typography variant="h4" fontWeight="800" color="#b45309" sx={{ mt: 0.5 }}>
                      {stats.pending}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      backgroundColor: '#fef3c7',
                      color: '#d97706',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <PendingActionsIcon sx={{ fontSize: 26 }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Card Completadas y Progreso */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: '1px solid #bbf7d0',
                backgroundColor: '#f0fdf4',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.03)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(16, 185, 129, 0.1)',
                },
              }}
            >
              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" color="#166534" fontWeight="600">
                      Tareas Completadas ({stats.percentage}%)
                    </Typography>
                    <Typography variant="h4" fontWeight="800" color="#15803d" sx={{ mt: 0.5 }}>
                      {stats.completed}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      backgroundColor: '#dcfce7',
                      color: '#16a34a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 26 }} />
                  </Box>
                </Box>
                <Box sx={{ mt: 1.5 }}>
                  <LinearProgress
                    variant="determinate"
                    value={stats.percentage}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: '#dcfce7',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#16a34a',
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Barra de Acciones, Búsqueda y Filtros */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 3,
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
          }}
        >
          <Grid container spacing={2} alignItems="center">
            {/* Buscador */}
            <Grid size={{ xs: 12, md: 5 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Buscar tareas por nombre o descripción..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#94a3b8' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            {/* Pestañas de Filtro */}
            <Grid size={{ xs: 12, sm: 7, md: 4 }}>
              <Tabs
                value={statusFilter}
                onChange={(e, newVal) => setStatusFilter(newVal)}
                variant="fullWidth"
                sx={{
                  minHeight: 40,
                  backgroundColor: '#f1f5f9',
                  borderRadius: 2,
                  p: 0.5,
                  '& .MuiTabs-indicator': {
                    display: 'none',
                  },
                }}
              >
                <Tab
                  value="all"
                  label={`Todas (${stats.total})`}
                  sx={{
                    minHeight: 32,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.825rem',
                    borderRadius: 1.5,
                    color: '#64748b',
                    '&.Mui-selected': {
                      backgroundColor: '#ffffff',
                      color: '#0f172a',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    },
                  }}
                />
                <Tab
                  value="pending"
                  label={`Pendientes (${stats.pending})`}
                  sx={{
                    minHeight: 32,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.825rem',
                    borderRadius: 1.5,
                    color: '#64748b',
                    '&.Mui-selected': {
                      backgroundColor: '#ffffff',
                      color: '#b45309',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    },
                  }}
                />
                <Tab
                  value="completed"
                  label={`Completas (${stats.completed})`}
                  sx={{
                    minHeight: 32,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.825rem',
                    borderRadius: 1.5,
                    color: '#64748b',
                    '&.Mui-selected': {
                      backgroundColor: '#ffffff',
                      color: '#15803d',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    },
                  }}
                />
              </Tabs>
            </Grid>

            {/* Botones de acción: Refrescar y Nueva Tarea */}
            <Grid size={{ xs: 12, sm: 5, md: 3 }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Tooltip title="Actualizar lista">
                <span>
                  <IconButton
                    onClick={() => fetchTasks(true)}
                    disabled={refreshing || loading}
                    sx={{
                      borderRadius: 2,
                      border: '1px solid #e2e8f0',
                      '&:hover': { backgroundColor: '#f1f5f9' },
                    }}
                  >
                    <RefreshIcon sx={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
                  </IconButton>
                </span>
              </Tooltip>

              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleOpenCreate}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 700,
                  px: 2.5,
                  background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4338ca 0%, #3730a3 100%)',
                  },
                }}
              >
                Nueva Tarea
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Tabla de Tareas */}
        <TaskTable
          tasks={filteredTasks}
          loading={loading}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          onToggleStatus={handleToggleStatus}
          onNewTask={handleOpenCreate}
          togglingId={togglingId}
        />

        {/* Modal de Crear / Editar Tarea */}
        <TaskDialog
          open={openFormDialog}
          onClose={() => {
            if (!saving) {
              setOpenFormDialog(false);
              setEditingTask(null);
            }
          }}
          onSave={handleSaveTask}
          task={editingTask}
          saving={saving}
        />

        {/* Modal de Confirmación de Eliminación */}
        <ConfirmDialog
          open={openConfirmDialog}
          onClose={() => {
            if (!deleting) {
              setOpenConfirmDialog(false);
              setTaskToDelete(null);
            }
          }}
          onConfirm={handleConfirmDelete}
          taskName={taskToDelete?.nombre}
          loading={deleting}
        />

        {/* Alertas Snackbar de Notificación */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
            sx={{
              width: '100%',
              borderRadius: 2,
              fontWeight: 500,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default Task;