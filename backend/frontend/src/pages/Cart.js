import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  IconButton,
  TextField,
  Divider,
  Alert,
  Paper,
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as CartIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    clearCart 
  } = useCart();

  const [updatingItem, setUpdatingItem] = useState(null);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleContinueShopping = () => {
    navigate('/productos');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      clearCart();
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <CartIcon sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Tu carrito está vacío
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Agrega algunos productos deliciosos para comenzar
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleContinueShopping}
            startIcon={<ArrowBackIcon />}
          >
            Continuar Comprando
          </Button>
        </Box>
      </Container>
    );
  }

  const subtotal = getCartTotal();
  const shipping = 0; // Envío gratuito
  const total = subtotal + shipping;

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Carrito de Compras
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {cartItems.length} producto{cartItems.length !== 1 ? 's' : ''} en tu carrito
        </Typography>
      </Box>

              <Grid container spacing={4}>
          {/* Lista de productos */}
          <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                  Productos ({cartItems.length})
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={handleClearCart}
                >
                  Vaciar Carrito
                </Button>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {cartItems.map((item) => (
                <Box key={item.id}>
                                     <Grid container spacing={2} alignItems="center">
                     {/* Imagen */}
                     <Grid item xs={3} sm={2}>
                      <CardMedia
                        component="img"
                        height="80"
                        image={item.imagen || '/placeholder-product.jpg'}
                        alt={item.nombre}
                        sx={{ borderRadius: 1, objectFit: 'cover' }}
                      />
                    </Grid>

                                         {/* Información del producto */}
                     <Grid item xs={6} sm={4}>
                      <Typography variant="h6" gutterBottom>
                        {item.nombre}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${item.precio} c/u
                      </Typography>
                    </Grid>

                                         {/* Cantidad */}
                     <Grid item xs={6} sm={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={updatingItem === item.id}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <TextField
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (value > 0) {
                              handleQuantityChange(item.id, value);
                            }
                          }}
                          inputProps={{ min: 1 }}
                          size="small"
                          sx={{ width: 60 }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={updatingItem === item.id}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Grid>

                                         {/* Precio total */}
                     <Grid item xs={6} sm={2}>
                      <Typography variant="h6" color="primary">
                        ${(item.precio * item.quantity).toFixed(2)}
                      </Typography>
                    </Grid>

                                         {/* Eliminar */}
                     <Grid item xs={6} sm={1}>
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveItem(item.id)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

                 {/* Resumen del pedido */}
         <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resumen del Pedido
              </Typography>

              <Box sx={{ my: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Subtotal:</Typography>
                  <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Envío:</Typography>
                  <Typography variant="body2" color="success.main">
                    Gratis
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    ${total.toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body2">
                  Envío gratuito en pedidos superiores a $10
                </Typography>
              </Alert>

              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleCheckout}
                sx={{ mb: 2 }}
              >
                Proceder al Checkout
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={handleContinueShopping}
                startIcon={<ArrowBackIcon />}
              >
                Continuar Comprando
              </Button>
            </CardContent>
          </Card>

          {/* Información adicional */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Información de Entrega
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                • Entrega en 30 minutos o menos
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                • Envío gratuito en toda la ciudad
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Pago seguro con Mercado Pago
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart; 