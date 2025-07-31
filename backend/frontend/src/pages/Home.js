import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  CardActionArea,
  CardActions,
  Rating,
  useTheme,
  useMediaQuery,
  IconButton,
  CircularProgress,
  Alert,
  Paper,
  InputBase,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Tabs,
  Tab,
  Badge,
} from '@mui/material';
import { Grid } from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Star as StarIcon,
  LocalShipping as ShippingIcon,
  Coffee as CoffeeIcon,
  Cake as CakeIcon,
  Restaurant as RestaurantIcon,
  EmojiFoodBeverage as BeverageIcon,
  LocalCafe as LocalCafeIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { productService } from '../services/productService';

// Importar imágenes desde la carpeta pública
const heroImage = '/assets/hero-bg.jpg';
const menuImage1 = '/assets/menu-item-1.jpg';
const menuImage2 = '/assets/menu-item-2.jpg';
const menuImage3 = '/assets/menu-item-3.jpg';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      // Asegurarse de que los parámetros se pasen correctamente
      const response = await productService.getProducts({
        page: 1,
        per_page: 6
      });
      
      // Verificar si la respuesta es exitosa
      if (response.success !== false) {
        // Si response.data existe, usarlo; si no, usar response directamente
        const products = response.data || response || [];
        setFeaturedProducts(Array.isArray(products) ? products : []);
      } else {
        setError(response.message || 'Error al cargar los productos');
        setFeaturedProducts([]);
      }
    } catch (error) {
      console.error('Error al cargar productos destacados:', error);
      setError('Error al cargar los productos. Por favor, intente nuevamente.');
      setFeaturedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  // Categorías destacadas
  const categories = [
    {
      id: 1,
      name: 'Cafés',
      icon: <LocalCafeIcon sx={{ fontSize: 40 }} />,
      image: menuImage1,
      link: '/products?category=cafe',
    },
    {
      id: 2,
      name: 'Desayunos',
      icon: <RestaurantIcon sx={{ fontSize: 40 }} />,
      image: menuImage2,
      link: '/products?category=desayuno',
    },
    {
      id: 3,
      name: 'Bebidas',
      icon: <BeverageIcon sx={{ fontSize: 40 }} />,
      image: menuImage3,
      link: '/products?category=bebida',
    },
  ];

  // Platillos destacados del menú
  const featuredMenuItems = [
    {
      id: 1,
      name: 'Crepe de Nutella con Frutas',
      description: 'Delicioso crepe relleno de nutella casera y frutas frescas de temporada',
      price: 45.00,
      image: menuImage1,
      category: 'Postres',
    },
    {
      id: 2,
      name: 'Café de Especialidad',
      description: 'Café de grano 100% arábica, tostado artesanalmente',
      price: 35.00,
      image: menuImage2,
      category: 'Bebidas',
    },
    {
      id: 3,
      name: 'Desayuno Continental',
      description: 'Pan recién horneado, fruta fresca, jugo natural y café de la casa',
      price: 85.00,
      image: menuImage3,
      category: 'Desayunos',
    },
  ];

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: 'white',
          py: { xs: 12, md: 16 },
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box sx={{ 
                textAlign: { xs: 'center', md: 'left' },
                maxWidth: 600,
                mx: { xs: 'auto', md: 0 },
              }}>
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                    lineHeight: 1.2,
                  }}
                >
                  Disfruta de los mejores crepes y café en la ciudad
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 4, 
                    opacity: 0.9,
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    maxWidth: '90%',
                    mx: { xs: 'auto', md: 0 },
                  }}
                >
                  Descubre nuestra selección de crepes artesanales y café de especialidad preparados con ingredientes frescos y de la más alta calidad.
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', md: 'flex-start' } 
                }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/products')}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      backgroundColor: theme.palette.primary.main,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                  >
                    Ver Menú Completo
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => {
                      const element = document.getElementById('menu');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 500,
                      borderColor: 'white',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        borderColor: 'white',
                      },
                    }}
                  >
                    Ver Especialidades
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  src="/assets/logo.jpg"
                  alt="Crepes & Coffee Logo"
                  style={{
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    border: '8px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Categorías destacadas */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 600, 
              mb: 2,
              color: theme.palette.text.primary,
              position: 'relative',
              display: 'inline-block',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 3,
                backgroundColor: theme.palette.primary.main,
                borderRadius: 3,
              },
            }}
          >
            Nuestras Categorías
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Explora nuestra selección de categorías y descubre una variedad de sabores y experiencias únicas.
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <Card
                component={RouterLink}
                to={category.link}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.12)',
                  },
                }}
              >
                <CardActionArea>
                  <Box 
                    sx={{ 
                      height: 200,
                      backgroundImage: `url(${category.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7))',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 3,
                        color: 'white',
                        textAlign: 'left',
                      }}
                    >
                      <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {category.name}
                      </Typography>
                      <Box sx={{ 
                        display: 'inline-flex', 
                        alignItems: 'center',
                        fontSize: '0.875rem',
                        color: 'rgba(255,255,255,0.9)',
                        '&:hover': {
                          color: 'white',
                        },
                      }}>
                        Ver más <ArrowForwardIcon sx={{ fontSize: '1rem', ml: 0.5 }} />
                      </Box>
                    </Box>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Menu destacado */}
      <Box id="menu" sx={{ py: 8, backgroundColor: theme.palette.background.paper }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                fontWeight: 600, 
                mb: 2,
                color: theme.palette.text.primary,
                position: 'relative',
                display: 'inline-block',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 60,
                  height: 3,
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 3,
                },
              }}
            >
              Nuestras Especialidades
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Descubre nuestras creaciones más populares, preparadas con ingredientes frescos y mucho amor.
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {featuredMenuItems.map((item) => (
              <Grid item xs={12} md={4} key={item.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <Box 
                    sx={{ 
                      height: 200,
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Chip 
                        label={item.category} 
                        size="small" 
                        sx={{ 
                          backgroundColor: theme.palette.primary.light,
                          color: theme.palette.primary.dark,
                          fontWeight: 500,
                        }} 
                      />
                      <Rating
                        name="read-only"
                        value={5}
                        readOnly
                        size="small"
                        sx={{ color: theme.palette.primary.main }}
                      />
                    </Box>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 1,
                        color: theme.palette.text.primary,
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        mb: 2,
                        minHeight: 40,
                      }}
                    >
                      {item.description}
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 'auto',
                      pt: 1,
                    }}>
                      <Typography 
                        variant="h6" 
                        component="span"
                        sx={{ 
                          color: theme.palette.primary.main,
                          fontWeight: 700,
                        }}
                      >
                        ${item.price.toFixed(2)}
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleAddToCart(item)}
                        startIcon={<ShoppingCartIcon />}
                        sx={{
                          textTransform: 'none',
                          borderRadius: 2,
                          px: 2,
                          py: 0.75,
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          backgroundColor: theme.palette.primary.main,
                          '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                          },
                        }}
                      >
                        Añadir al carrito
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/products')}
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                },
              }}
            >
              Ver Menú Completo
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Featured Products Section */}
      <Box sx={{ backgroundColor: '#FAFAFA', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{ mb: 6, fontWeight: 600 }}
          >
            Productos Destacados
          </Typography>
          
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          )}
          
          {error && (
            <Alert severity="error" sx={{ mb: 4 }}>
              {error}
            </Alert>
          )}
          
          {!loading && !error && (
            <>
              <Grid container spacing={4}>
                {Array.isArray(featuredProducts) && featuredProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 32px rgba(139, 69, 19, 0.15)',
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={product.imagen || 'https://via.placeholder.com/300x200?text=Producto'}
                        alt={product.nombre}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
                          {product.nombre}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                          {product.descripcion}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Rating value={4.5} readOnly size="small" />
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            (4.5)
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h6" color="primary" fontWeight={600}>
                            ${product.precio}
                          </Typography>
                          {product.categoria && (
                            <Chip
                              label={product.categoria.nombre}
                              size="small"
                              sx={{
                                backgroundColor: '#8B4513',
                                color: 'white',
                                fontWeight: 500,
                              }}
                            />
                          )}
                        </Box>
                        <Button
                          variant="contained"
                          fullWidth
                          startIcon={<ShoppingCartIcon />}
                          onClick={() => handleAddToCart(product)}
                          sx={{
                            backgroundColor: '#8B4513',
                            '&:hover': {
                              backgroundColor: '#654321',
                            },
                          }}
                        >
                          Agregar al Carrito
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ textAlign: 'center', mt: 6 }}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/products')}
                  sx={{
                    borderColor: '#8B4513',
                    color: '#8B4513',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: 'rgba(139, 69, 19, 0.1)',
                    },
                  }}
                >
                  Ver Todos los Productos
                </Button>
              </Box>
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 