import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Link,
  Divider,
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.jpg';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Primero obtenemos una cookie CSRF
      await fetch('http://localhost:8002/sanctum/csrf-cookie', {
        credentials: 'include'
      });
      
      // Luego intentamos iniciar sesión
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/', { replace: true });
      } else {
        setError(result.message || 'Credenciales inválidas');
      }
    } catch (err) {
      console.error('Error en login:', err);
      if (err.response?.status === 419) {
        setError('Error de autenticación CSRF. Intenta nuevamente.');
      } else if (err.response?.status === 401) {
        setError('Credenciales incorrectas');
      } else {
        setError('Error de conexión con el servidor');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)',
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            padding: 4,
            borderRadius: 3,
            backgroundColor: '#FFFFFF',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}
        >
          {/* Logo y título */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <img
              src={logo}
              alt="Crepes & Coffee"
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                marginBottom: 16,
                border: '3px solid #8B4513',
              }}
            />
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                color: '#8B4513',
                mb: 1,
              }}
            >
              Iniciar Sesión
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Accede a tu cuenta para continuar
            </Typography>
          </Box>

          {/* Formulario */}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* Campo Email */}
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              margin="normal"
              InputProps={{
                startAdornment: <EmailIcon sx={{ mr: 1, color: '#8B4513' }} />,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#E0E0E0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#8B4513',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8B4513',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#8B4513',
                },
              }}
            />

            {/* Campo Contraseña */}
            <TextField
              fullWidth
              label="Contraseña"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              required
              margin="normal"
              InputProps={{
                startAdornment: <LockIcon sx={{ mr: 1, color: '#8B4513' }} />,
                endAdornment: (
                  <Button
                    onClick={handleTogglePasswordVisibility}
                    sx={{
                      minWidth: 'auto',
                      p: 0.5,
                      color: '#8B4513',
                      '&:hover': {
                        backgroundColor: 'rgba(139, 69, 19, 0.1)',
                      },
                    }}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </Button>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#E0E0E0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#8B4513',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8B4513',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#8B4513',
                },
              }}
            />

            {/* Botón de inicio de sesión */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                backgroundColor: '#8B4513',
                fontWeight: 600,
                fontSize: '1.1rem',
                '&:hover': {
                  backgroundColor: '#654321',
                },
                '&:disabled': {
                  backgroundColor: '#CCCCCC',
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Iniciar Sesión'
              )}
            </Button>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                o
              </Typography>
            </Divider>

            {/* Enlace de registro */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                ¿No tienes una cuenta?{' '}
                <Link
                  component={RouterLink}
                  to="/register"
                  sx={{
                    color: '#8B4513',
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Regístrate aquí
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;