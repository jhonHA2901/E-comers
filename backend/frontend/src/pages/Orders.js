import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Chip,
  Alert,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Receipt as ReceiptIcon,
  LocalShipping as ShippingIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Payment as PaymentIcon
} from '@mui/icons-material';
import { orderService } from '../services/orderService';

const getStatusColor = (status) => {
  switch (status) {
    case 'pendiente':
      return 'warning';
    case 'pagado':
      return 'info';
    case 'preparando':
      return 'primary';
    case 'entregado':
      return 'success';
    case 'cancelado':
      return 'error';
    default:
      return 'default';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'pendiente':
      return <ScheduleIcon />;
    case 'pagado':
      return <PaymentIcon />;
    case 'preparando':
      return <ShippingIcon />;
    case 'entregado':
      return <CheckCircleIcon />;
    default:
      return <ReceiptIcon />;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getOrders();
      if (response.success) {
        setOrders(response.data);
      } else {
        setError('Error al cargar los pedidos');
      }
    } catch (error) {
      setError('Error de conexión');
      console.error('Error al cargar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = (orderId) => {
    // Aquí podrías navegar a una página de detalle del pedido
    console.log('Ver pedido:', orderId);
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mis Pedidos
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Historial de todos tus pedidos
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {orders.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <ReceiptIcon sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No tienes pedidos aún
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Realiza tu primer pedido y aparecerá aquí
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/productos')}
            >
              Ver Productos
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} key={order.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Pedido #{order.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(order.created_at)}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Chip
                        icon={getStatusIcon(order.estado)}
                        label={order.estado.toUpperCase()}
                        color={getStatusColor(order.estado)}
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="h6" color="primary">
                        ${order.total}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle1">
                        Ver Detalles ({order.detalles?.length || 0} productos)
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        {order.detalles?.map((detalle) => (
                          <Grid item xs={12} key={detalle.id}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Box>
                                <Typography variant="body1">
                                  {detalle.producto?.nombre}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Cantidad: {detalle.cantidad}
                                </Typography>
                              </Box>
                              <Typography variant="body1">
                                ${detalle.precio_unitario}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Dirección:</strong> {order.direccion}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Teléfono:</strong> {order.telefono}
                    </Typography>
                    {order.notas && (
                      <Typography variant="body2" color="text.secondary">
                        <strong>Notas:</strong> {order.notas}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => handleViewOrder(order.id)}
                    >
                      Ver Detalles Completos
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Orders; 