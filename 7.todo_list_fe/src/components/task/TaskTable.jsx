import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Box,
  Typography,
  CircularProgress,
  Switch,
  Button
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';

/**
 * Tabla responsiva para listar tareas con Material UI
 */
function TaskTable({
  tasks = [],
  loading = false,
  onEdit,
  onDelete,
  onToggleStatus,
  onNewTask,
  togglingId = null,
}) {
  if (loading) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          borderRadius: 3,
          border: '1px solid #e5e7eb',
          backgroundColor: '#ffffff',
          minHeight: 280,
        }}
      >
        <CircularProgress size={44} thickness={4} color="primary" />
        <Typography variant="body1" color="text.secondary" fontWeight="500">
          Cargando tareas del servidor...
        </Typography>
      </Paper>
    );
  }

  if (tasks.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          borderRadius: 3,
          border: '1px dashed #d1d5db',
          backgroundColor: '#fafafa',
          minHeight: 280,
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            backgroundColor: '#e0e7ff',
            color: '#4f46e5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <AssignmentLateOutlinedIcon sx={{ fontSize: 32 }} />
        </Box>
        <Typography variant="h6" fontWeight="bold" color="#111827">
          No hay tareas para mostrar
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: 360, mb: 3, mt: 0.5 }}
        >
          Comienza creando tu primera tarea para organizar tus actividades diarias.
        </Typography>
        {onNewTask && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<PlaylistAddIcon />}
            onClick={onNewTask}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)',
            }}
          >
            Crear primera tarea
          </Button>
        )}
      </Paper>
    );
  }

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 3,
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="tabla de tareas">
        <TableHead sx={{ backgroundColor: '#f9fafb' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', color: '#4b5563', py: 2, width: '5%' }}>
              #
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#4b5563', py: 2, width: '30%' }}>
              Tarea
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#4b5563', py: 2, width: '35%' }}>
              Descripción
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#4b5563', py: 2, width: '18%' }}>
              Estado
            </TableCell>
            <TableCell
              align="right"
              sx={{ fontWeight: 'bold', color: '#4b5563', py: 2, width: '12%' }}
            >
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tasks.map((task, index) => {
            const isCompleted = Boolean(task.estado);
            const isToggling = togglingId === task.id;

            return (
              <TableRow
                key={task.id || index}
                hover
                sx={{
                  transition: 'background-color 0.15s ease',
                  '&:last-child td, &:last-child th': { border: 0 },
                  backgroundColor: isCompleted ? '#fcfdfd' : '#ffffff',
                }}
              >
                {/* Índice */}
                <TableCell component="th" scope="row" sx={{ color: '#9ca3af', fontWeight: 600 }}>
                  {index + 1}
                </TableCell>

                {/* Nombre de la tarea */}
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="600"
                    sx={{
                      color: isCompleted ? '#6b7280' : '#111827',
                      textDecoration: isCompleted ? 'line-through' : 'none',
                    }}
                  >
                    {task.nombre}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#9ca3af', fontFamily: 'monospace' }}>
                    ID: {task.id ? task.id.substring(0, 8) + '...' : 'N/A'}
                  </Typography>
                </TableCell>

                {/* Descripción */}
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      color: isCompleted ? '#9ca3af' : '#4b5563',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      textDecoration: isCompleted ? 'line-through' : 'none',
                    }}
                  >
                    {task.descripcion || (
                      <em style={{ color: '#9ca3af', fontStyle: 'italic' }}>
                        Sin descripción
                      </em>
                    )} 
                  </Typography>
                </TableCell>

                {/* Estado (Chip y Switch rápido) */}
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Tooltip title={isCompleted ? 'Click para marcar como pendiente' : 'Click para marcar como completada'}>
                      <Chip
                        icon={
                          isCompleted ? (
                            <CheckCircleRoundedIcon fontSize="small" />
                          ) : (
                            <AccessTimeRoundedIcon fontSize="small" />
                          )
                        }
                        label={isCompleted ? 'Completada' : 'Pendiente'}
                        color={isCompleted ? 'success' : 'warning'}
                        size="small"
                        onClick={() => onToggleStatus && onToggleStatus(task)}
                        variant={isCompleted ? 'filled' : 'outlined'}
                        sx={{
                          fontWeight: 600,
                          cursor: 'pointer',
                          px: 0.5,
                          borderRadius: 2,
                          transition: 'transform 0.1s ease',
                          '&:hover': {
                            transform: 'scale(1.04)',
                          },
                        }}
                      />
                    </Tooltip>

                    {/* Switch interactivo */}
                    <Tooltip title={isCompleted ? 'Marcar pendiente' : 'Marcar completada'}>
                      <span>
                        {isToggling ? (
                          <CircularProgress size={16} sx={{ ml: 0.5 }} />
                        ) : (
                          <Switch
                            size="small"
                            checked={isCompleted}
                            color="success"
                            onChange={() => onToggleStatus && onToggleStatus(task)}
                            inputProps={{ 'aria-label': `Cambiar estado de ${task.nombre}` }}
                          />
                        )}
                      </span>
                    </Tooltip>
                  </Box>
                </TableCell>

                {/* Acciones */}
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                    <Tooltip title="Editar tarea">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => onEdit(task)}
                        sx={{
                          borderRadius: 1.5,
                          '&:hover': {
                            backgroundColor: '#e0e7ff',
                          },
                        }}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Eliminar tarea">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDelete(task)}
                        sx={{
                          borderRadius: 1.5,
                          '&:hover': {
                            backgroundColor: '#fee2e2',
                          },
                        }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TaskTable;
