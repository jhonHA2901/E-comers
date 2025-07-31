import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Divider,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Save as SaveIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Datos del perfil
  const [profileData, setProfileData] = useState({
    nombre: '',
    email: '',
    direccion: '',
    telefono: ''
  });

  // Datos de cambio de contraseña
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    password: '',
    password_confirmation: ''
  });

  const [profileErrors, setProfileErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  useEffect(() => {
    if (user) {
      setProfileData({
        nombre: user.nombre || '',
        email: user.email || '',
        direccion: user.direccion || '',
        telefono: user.telefono || ''
      });
    }
  }, [user]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError('');
    setSuccess('');
  };

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo
    if (profileErrors[field]) {
      setProfileErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo
    if (passwordErrors[field]) {
      setPasswordErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateProfile = () => {
    const errors = {};

    if (!profileData.nombre.trim()) {
      errors.nombre = 'El nombre es obligatorio';
    }

    if (!profileData.email.trim()) {
      errors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      errors.email = 'El email no es válido';
    }

    if (!profileData.direccion.trim()) {
      errors.direccion = 'La dirección es obligatoria';
    }

    if (!profileData.telefono.trim()) {
      errors.telefono = 'El teléfono es obligatorio';
    } else if (!/^\d+$/.test(profileData.telefono)) {
      errors.telefono = 'El teléfono debe contener solo números';
    }

    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePassword = () => {
    const errors = {};

    if (!passwordData.current_password) {
      errors.current_password = 'La contraseña actual es obligatoria';
    }

    if (!passwordData.password) {
      errors.password = 'La nueva contraseña es obligatoria';
    } else if (passwordData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!passwordData.password_confirmation) {
      errors.password_confirmation = 'Confirma tu nueva contraseña';
    } else if (passwordData.password !== passwordData.password_confirmation) {
      errors.password_confirmation = 'Las contraseñas no coinciden';
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateProfile = async () => {
    if (!validateProfile()) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await authService.updateProfile(profileData);
      
      if (response.success) {
        updateUser(response.data);
        setSuccess('Perfil actualizado exitosamente');
      } else {
        setError(response.message || 'Error al actualizar perfil');
        if (response.errors) {
          setProfileErrors(response.errors);
        }
      }
    } catch (error) {
      setError('Error de conexión al actualizar perfil');
      console.error('Error al actualizar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!validatePassword()) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await authService.changePassword(passwordData);
      
      if (response.success) {
        setSuccess('Contraseña cambiada exitosamente');
        setPasswordData({
          current_password: '',
          password: '',
          password_confirmation: ''
        });
      } else {
        setError(response.message || 'Error al cambiar contraseña');
        if (response.errors) {
          setPasswordErrors(response.errors);
        }
      }
    } catch (error) {
      setError('Error de conexión al cambiar contraseña');
      console.error('Error al cambiar contraseña:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mi Perfil
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gestiona tu información personal y configuración de cuenta
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      <Card>
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab 
                icon={<PersonIcon />} 
                label="Información Personal" 
                iconPosition="start"
              />
              <Tab 
                icon={<LockIcon />} 
                label="Cambiar Contraseña" 
                iconPosition="start"
              />
            </Tabs>
          </Box>

          {/* Tab Panel - Información Personal */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre Completo"
                  value={profileData.nombre}
                  onChange={(e) => handleProfileChange('nombre', e.target.value)}
                  error={!!profileErrors.nombre}
                  helperText={profileErrors.nombre}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  error={!!profileErrors.email}
                  helperText={profileErrors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Dirección"
                  multiline
                  rows={3}
                  value={profileData.direccion}
                  onChange={(e) => handleProfileChange('direccion', e.target.value)}
                  error={!!profileErrors.direccion}
                  helperText={profileErrors.direccion}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  value={profileData.telefono}
                  onChange={(e) => handleProfileChange('telefono', e.target.value)}
                  error={!!passwordErrors.telefono}
                  helperText={passwordErrors.telefono}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                onClick={handleUpdateProfile}
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </Box>
          </TabPanel>

          {/* Tab Panel - Cambiar Contraseña */}
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Contraseña Actual"
                  type="password"
                  value={passwordData.current_password}
                  onChange={(e) => handlePasswordChange('current_password', e.target.value)}
                  error={!!passwordErrors.current_password}
                  helperText={passwordErrors.current_password}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nueva Contraseña"
                  type="password"
                  value={passwordData.password}
                  onChange={(e) => handlePasswordChange('password', e.target.value)}
                  error={!!passwordErrors.password}
                  helperText={passwordErrors.password}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confirmar Nueva Contraseña"
                  type="password"
                  value={passwordData.password_confirmation}
                  onChange={(e) => handlePasswordChange('password_confirmation', e.target.value)}
                  error={!!passwordErrors.password_confirmation}
                  helperText={passwordErrors.password_confirmation}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={loading ? <CircularProgress size={20} /> : <LockIcon />}
                onClick={handleChangePassword}
                disabled={loading}
              >
                {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
              </Button>
            </Box>
          </TabPanel>
        </CardContent>
      </Card>

      {/* Información adicional */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Información de la Cuenta
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Rol:</strong> {user?.rol === 'admin' ? 'Administrador' : 'Cliente'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Miembro desde:</strong> {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile; 