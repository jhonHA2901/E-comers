import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  TextField,
  Alert,
  CircularProgress,
  Divider,
  Rating,
  Paper
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  ArrowBack as ArrowBackIcon,
  LocalShipping as DeliveryIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await productService.getProduct(id);
      if (response.success) {
        setProduct(response.data);
      } else {
        setError('Producto no encontrado');
      }
    } catch (error) {
      setError('Error al cargar el producto');
      console.error('Error al cargar producto:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = async () => {
    if (!product || product.stock <= 0) return;

    setAddingToCart(true);
    try {
      addToCart(product, quantity);
      // Mostrar mensaje de éxito (podrías usar un snackbar aquí)
      alert('Producto agregado al carrito');
    } catch (error) {
      setError('Error al agregar al carrito');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
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

  if (error || !product) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ mt: 3 }}>
          {error || 'Producto no encontrado'}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{ mt: 2 }}
        >
          Volver
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* Breadcrumb */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{ mb: 2 }}
        >
          Volver
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* Imagen del producto */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={product.imagen || '/placeholder-product.jpg'}
              alt={product.nombre}
              sx={{ objectFit: 'cover' }}
            />
          </Card>
        </Grid>

        {/* Información del producto */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.nombre}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={4.5} readOnly precision={0.5} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                (4.5/5)
              </Typography>
            </Box>

            <Chip
              label={product.categoria?.nombre || 'Sin categoría'}
              color="secondary"
              sx={{ mb: 2 }}
            />

            <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
              ${product.precio}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {product.descripcion}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Stock disponible: {product.stock} unidades
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Cantidad y agregar al carrito */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Cantidad
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <TextField
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                inputProps={{ min: 1, max: product.stock }}
                sx={{ width: 100 }}
                size="small"
              />
              <Typography variant="body2" color="text.secondary">
                Máximo: {product.stock}
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="large"
              startIcon={<CartIcon />}
              onClick={handleAddToCart}
              disabled={product.stock <= 0 || addingToCart}
              fullWidth
              sx={{ mb: 2 }}
            >
              {addingToCart ? (
                <CircularProgress size={20} color="inherit" />
              ) : product.stock > 0 ? (
                'Agregar al Carrito'
              ) : (
                'Sin Stock'
              )}
            </Button>

            {product.stock <= 0 && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                Este producto no está disponible actualmente
              </Alert>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Información adicional */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Información del Producto
            </Typography>
            
            <Paper sx={{ p: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <DeliveryIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body2">
                  Entrega en 30 minutos
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <StarIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body2">
                  Ingredientes frescos
                </Typography>
              </Box>
            </Paper>

            <Typography variant="body2" color="text.secondary">
              * Los precios pueden variar según la disponibilidad de ingredientes
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Productos relacionados (opcional) */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Productos Relacionados
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Próximamente: Productos similares de la misma categoría
        </Typography>
      </Box>
    </Container>
  );
};

export default ProductDetail; 