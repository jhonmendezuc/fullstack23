import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * Diálogo de confirmación antes de eliminar una tarea
 */
function ConfirmDialog({ open, onClose, onConfirm, taskName, loading = false }) {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
          boxShadow: '0 20px 40px rgba(0,0,0,0.12)'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1, pt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <WarningAmberRoundedIcon sx={{ fontSize: 28 }} />
          </Box>
          <Typography variant="h6" component="span" fontWeight="bold">
            ¿Eliminar tarea?
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ py: 1.5 }}>
        <DialogContentText sx={{ color: 'text.secondary', fontSize: '0.95rem' }}>
          ¿Estás seguro de que deseas eliminar permanentemente la tarea{' '}
          <strong style={{ color: '#111827' }}>
            "{taskName || 'seleccionada'}"
          </strong>
          ? Esta acción no se puede deshacer.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, pt: 1, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          disabled={loading}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            color: 'text.secondary',
            borderColor: '#e5e7eb',
            '&:hover': {
              borderColor: '#d1d5db',
              backgroundColor: '#f9fafb'
            }
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <DeleteIcon />}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
            backgroundColor: '#ef4444',
            '&:hover': {
              backgroundColor: '#dc2626'
            }
          }}
        >
          {loading ? 'Eliminando...' : 'Eliminar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
