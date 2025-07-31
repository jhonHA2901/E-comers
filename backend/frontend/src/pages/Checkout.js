import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Divider,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Paper
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Payment as PaymentIcon,
  CheckCircle as CheckCircleIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import { authService } from '../services/authService';

const steps = ['Datos de Entrega', 'Confirmar Pedido', 'Pago'];

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user, updateUser } = useAuth();
  
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderId, setOrderId] = useState(null);
  
  const [formData, setFormData] = useState({
    direccion: user?.direccion || '',
    telefono: user?.telefono || '',
    notas: ''
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/carrito');
    }
  }, [cartItems, navigate]);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.direccion.trim()) {
      errors.direccion = 'La dirección es obligatoria';
    }
    
    if (!formData.telefono.trim()) {
      errors.telefono = 'El teléfono es obligatorio';
    } else if (!/^\d+$/.test(formData.telefono)) {
      errors.telefono = 'El teléfono debe contener solo números';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (!validateForm()) {
        return;
      }
    }
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleCreateOrder = async () => {
    setLoading(true);
    setError('');

    try {
      // Crear el pedido
      const orderData = {
        items: cartItems.map(item => ({
          producto_id: item.id,
          cantidad: item.quantity,
          precio_unitario: item.precio
        })),
        direccion: formData.direccion,
        telefono: formData.telefono,
        notas: formData.notas,
        total: getCartTotal()
      };

      const orderResponse = await orderService.createOrder(orderData);
      
      if (orderResponse.success) {
        setOrderId(orderResponse.data.id);
        setOrderCreated(true);
        
        // Actualizar perfil del usuario si los datos cambiaron
        if (formData.direccion !== user?.direccion || formData.telefono !== user?.telefono) {
          try {
            const profileResponse = await authService.updateProfile({
              direccion: formData.direccion,
              telefono: formData.telefono
            });
            if (profileResponse.success) {
              updateUser(profileResponse.data);
            }
          } catch (error) {
            console.error('Error al actualizar perfil:', error);
          }
        }
        
        handleNext();
      } else {
        setError(orderResponse.message || 'Error al crear el pedido');
      }
    } catch (error) {
      setError('Error de conexión al crear el pedido');
      console.error('Error al crear pedido:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!orderId) {
      setError('No se pudo crear el pedido');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const paymentResponse = await orderService.createPaymentPreference(orderId);
      
      if (paymentResponse.success) {
        // Redirigir a Mercado Pago
        window.location.href = paymentResponse.data.init_point || paymentResponse.data.sandbox_init_point;
      } else {
        setError(paymentResponse.message || 'Error al procesar el pago');
      }
    } catch (error) {
      setError('Error de conexión al procesar el pago');
      console.error('Error al procesar pago:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Datos de Entrega
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Dirección de Entrega"
                    value={formData.direccion}
                    onChange={(e) => handleInputChange('direccion', e.target.value)}
                    error={!!formErrors.direccion}
                    helperText={formErrors.direccion}
                    multiline
                    rows={3}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Teléfono"
                    value={formData.telefono}
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                    error={!!formErrors.telefono}
                    helperText={formErrors.telefono}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Notas Adicionales (opcional)"
                    value={formData.notas}
                    onChange={(e) => handleInputChange('notas', e.target.value)}
                    multiline
                    rows={2}
                    placeholder="Instrucciones especiales para la entrega..."
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );

      case 1:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Confirmar Pedido
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Productos:
                </Typography>
                {cartItems.map((item) => (
                  <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">
                      {item.nombre} x {item.quantity}
                    </Typography>
                    <Typography variant="body2">
                      ${(item.precio * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" color="primary">
                    ${getCartTotal().toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Datos de Entrega:
                </Typography>
                <Typography variant="body2">
                  <strong>Dirección:</strong> {formData.direccion}
                </Typography>
                <Typography variant="body2">
                  <strong>Teléfono:</strong> {formData.telefono}
                </Typography>
                {formData.notas && (
                  <Typography variant="body2">
                    <strong>Notas:</strong> {formData.notas}
                  </Typography>
                )}
              </Box>

              {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                  <CircularProgress />
                </Box>
              )}

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Método de Pago
              </Typography>
              
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <PaymentIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Pago Seguro con Mercado Pago
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Serás redirigido a Mercado Pago para completar tu pago de forma segura
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h5" color="primary" gutterBottom>
                    Total a Pagar: ${getCartTotal().toFixed(2)}
                  </Typography>
                </Box>

                {loading && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                    <CircularProgress />
                  </Box>
                )}

                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                <Button
                  variant="contained"
                  size="large"
                  onClick={handlePayment}
                  disabled={loading}
                  startIcon={<PaymentIcon />}
                >
                  Pagar con Mercado Pago
                </Button>
              </Box>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/carrito')}
          sx={{ mb: 2 }}
        >
          Volver al Carrito
        </Button>
        
        <Typography variant="h4" component="h1" gutterBottom>
          Checkout
        </Typography>
      </Box>

      {/* Stepper */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Step Content */}
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          {renderStepContent(activeStep)}
        </Grid>

        {/* Resumen del pedido */}
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resumen del Pedido
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                {cartItems.map((item) => (
                  <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">
                      {item.nombre} x {item.quantity}
                    </Typography>
                    <Typography variant="body2">
                      ${(item.precio * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    ${getCartTotal().toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              <Alert severity="info">
                <Typography variant="body2">
                  Envío gratuito incluido
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
        >
          Anterior
        </Button>

        <Box>
          {activeStep === 0 && (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={loading}
            >
              Continuar
            </Button>
          )}
          
          {activeStep === 1 && (
            <Button
              variant="contained"
              onClick={handleCreateOrder}
              disabled={loading}
              startIcon={<CheckCircleIcon />}
            >
              {loading ? 'Creando Pedido...' : 'Confirmar Pedido'}
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Checkout; 