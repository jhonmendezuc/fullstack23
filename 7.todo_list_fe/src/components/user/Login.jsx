import React, { useState } from 'react';
import userService from "../../services/UserService.js"
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Container
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
function Login() {
 const [formData, setFormData] = useState({
    correo: '',
    contra: ''
  });

 
  const [errors, setErrors] = useState({});

  // Manejar el cambio en los inputs
  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    })); 
    
  };

 
  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    userService.login(formData.correo, formData.contra);
    

  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card sx={{ width: '100%', boxShadow: 3, borderRadius: 2 }}>
          <CardContent sx={{ p: 4 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 3
              }}
            >
              <Box
                sx={{
                  m: 1,
                  bgcolor: 'primary.main',
                  color: 'white',
                  borderRadius: '50%',
                  p: 1.5,
                  display: 'flex'
                }}
              >
                <LockOutlinedIcon />
              </Box>
              <Typography onClick={handleSubmit} component="h3" variant="h5" fontWeight="bold">
                Iniciar Sesión
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="correo"
                label="Correo Electrónico"
                name="correo" 
                autoComplete="email"
                autoFocus
                value={formData.correo}
                onChange={handleChange}
                error={Boolean(errors.correo)}
                helperText={errors.correo}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="contra"
                label="Contraseña"
                 
                id="contra"
                autoComplete="current-password"
                value={formData.contra}
                onChange={handleChange}
                error={Boolean(errors.contra)}
                helperText={errors.contra}
                
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2, py: 1.2, fontWeight: 'bold' }}
              >
                Ingresar
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Login
