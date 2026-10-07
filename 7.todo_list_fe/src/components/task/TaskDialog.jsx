import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Box,
  Typography,
  CircularProgress,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddTaskIcon from '@mui/icons-material/AddTask';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

/**
 * Modal (Dialog) con formulario para Crear y Editar tareas
 */
function TaskDialog({ open, onClose, onSave, task = null, saving = false }) {
  const isEditing = Boolean(task && task.id);

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    estado: false,
  });

  const [errors, setErrors] = useState({
    nombre: '',
  });

  // Sincronizar los datos del formulario al abrir el modal o cambiar de tarea
  useEffect(() => {
    if (task) {
      setFormData({
        nombre: task.nombre || '',
        descripcion: task.descripcion || '',
        estado: Boolean(task.estado),
      });
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        estado: false,
      });
    }
    setErrors({ nombre: '' });
  }, [task, open]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'nombre' && value.trim()) {
      setErrors((prev) => ({ ...prev, nombre: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      setErrors({ nombre: 'El nombre de la tarea es obligatorio' });
      return;
    }

    onSave({
      ...(task || {}),
      nombre: formData.nombre.trim(),
      descripcion: formData.descripcion.trim(),
      estado: formData.estado,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={saving ? undefined : onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              backgroundColor: isEditing ? '#e0e7ff' : '#dcfce7',
              color: isEditing ? '#4f46e5' : '#16a34a',
              borderRadius: 2,
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isEditing ? <EditNoteIcon /> : <AddTaskIcon />}
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {isEditing ? 'Editar Tarea' : 'Nueva Tarea'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {isEditing
                ? 'Modifica los datos de la tarea seleccionada'
                : 'Completa los campos para registrar una nueva tarea'}
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          disabled={saving}
          size="small"
          sx={{ color: 'text.secondary' }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <DialogContent dividers sx={{ py: 2.5 }}>
          <TextField
            autoFocus
            margin="normal"
            id="nombre"
            name="nombre"
            label="Nombre de la tarea"
            type="text"
            fullWidth
            required
            variant="outlined"
            placeholder="Ej. Revisar informe mensual"
            value={formData.nombre}
            onChange={handleChange}
            error={Boolean(errors.nombre)}
            helperText={errors.nombre}
            disabled={saving}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="normal"
            id="descripcion"
            name="descripcion"
            label="Descripción (Opcional)"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="Añade detalles o notas adicionales..."
            value={formData.descripcion}
            onChange={handleChange}
            disabled={saving}
            sx={{ mb: 2 }}
          />

          <Box
            sx={{
              mt: 1,
              p: 2,
              borderRadius: 2,
              backgroundColor: formData.estado ? '#f0fdf4' : '#f9fafb',
              border: '1px solid',
              borderColor: formData.estado ? '#bbf7d0' : '#e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.2s ease',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {formData.estado ? (
                <CheckCircleOutlineIcon sx={{ color: '#16a34a' }} />
              ) : (
                <RadioButtonUncheckedIcon sx={{ color: '#9ca3af' }} />
              )}
              <Box>
                <Typography variant="subtitle2" fontWeight="600" color="#111827">
                  Estado de la Tarea
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formData.estado
                    ? 'Completada: la tarea ya fue realizada'
                    : 'Pendiente: la tarea está en progreso o por iniciar'}
                </Typography>
              </Box>
            </Box>

            <FormControlLabel
              control={
                <Switch
                  checked={formData.estado}
                  onChange={handleChange}
                  name="estado"
                  color="success"
                  disabled={saving}
                />
              }
              label={formData.estado ? 'Completada' : 'Pendiente'}
              labelPlacement="start"
              sx={{ m: 0, fontWeight: 500 }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button
            onClick={onClose}
            disabled={saving}
            variant="outlined"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              color: 'text.secondary',
              borderColor: '#e5e7eb',
              '&:hover': {
                borderColor: '#d1d5db',
                backgroundColor: '#f9fafb',
              },
            }}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={saving}
            startIcon={
              saving ? <CircularProgress size={18} color="inherit" /> : null
            }
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
            }}
          >
            {saving
              ? 'Guardando...'
              : isEditing
              ? 'Actualizar Tarea'
              : 'Crear Tarea'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default TaskDialog;
