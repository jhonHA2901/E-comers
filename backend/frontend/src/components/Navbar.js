import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Divider,
  Container,
  useTheme,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  ExitToApp as LogoutIcon,
  AccountCircle as AccountIcon,
  Receipt as OrdersIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

// Importar el logo desde la carpeta pública
const logoUrl = '/assets/logo.jpg';

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const handleOrders = () => {
    handleMenuClose();
    navigate('/orders');
  };

  const navItems = [
    { text: 'Inicio', path: '/' },
    { text: 'Menú', path: '/products' },
    { text: 'Nosotros', path: '/about' },
    { text: 'Contacto', path: '/contact' },
  ];

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        backgroundColor: 'white',
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo y título - Versión escritorio */}
          <Box 
            component={RouterLink} 
            to="/" 
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              alignItems: 'center', 
              textDecoration: 'none',
              mr: 4
            }}
          >
            <img 
              src={logoUrl} 
              alt="Crepes & Coffee" 
              style={{ 
                height: 60, 
                width: 'auto', 
                marginRight: 12,
              }} 
            />
          </Box>

          {/* Logo y título - Versión móvil */}
          <Box 
            component={RouterLink} 
            to="/" 
            sx={{ 
              display: { xs: 'flex', md: 'none' }, 
              alignItems: 'center', 
              textDecoration: 'none',
              flexGrow: 1
            }}
          >
            <img 
              src={logoUrl} 
              alt="Crepes & Coffee" 
              style={{ 
                height: 50, 
                width: 'auto',
                maxWidth: '100%'
              }} 
            />
          </Box>

          {/* Menú de navegación - Versión escritorio */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={RouterLink}
                to={item.path}
                sx={{
                  color: theme.palette.text.primary,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Acciones de usuario - Versión escritorio */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            {isAuthenticated ? (
              <>
                <IconButton 
                  onClick={() => navigate('/cart')}
                  sx={{ 
                    color: theme.palette.text.primary,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <Badge 
                    badgeContent={getCartItemsCount()} 
                    color="primary"
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>

                <Button
                  onClick={handleMenuOpen}
                  endIcon={<PersonIcon />}
                  sx={{
                    color: theme.palette.text.primary,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  {user?.nombre || 'Mi cuenta'}
                </Button>

                <Menu
                  id="user-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    elevation: 3,
                    sx: {
                      mt: 1.5,
                      minWidth: 200,
                      borderRadius: 1,
                      overflow: 'visible',
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={handleProfile} sx={{ py: 1.5 }}>
                    <AccountIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} />
                    <Typography variant="body2">Mi Perfil</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleOrders} sx={{ py: 1.5 }}>
                    <OrdersIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} />
                    <Typography variant="body2">Mis Pedidos</Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
                    <LogoutIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="error">Cerrar Sesión</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button 
                  variant="outlined"
                  onClick={() => navigate('/login')}
                  sx={{
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    '&:hover': {
                      borderColor: theme.palette.primary.dark,
                      backgroundColor: 'rgba(93, 64, 55, 0.04)',
                    },
                  }}
                >
                  Iniciar Sesión
                </Button>
                <Button 
                  variant="contained"
                  onClick={() => navigate('/register')}
                  sx={{ 
                    backgroundColor: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  Registrarse
                </Button>
              </>
            )}
          </Box>

          {/* Menú de navegación - Versión móvil */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={toggleMobileMenu}
              color="inherit"
              sx={{ color: theme.palette.text.primary }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Menú desplegable móvil */}
        {mobileMenuOpen && (
          <Box sx={{ display: { xs: 'block', md: 'none' }, pb: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={RouterLink}
                to={item.path}
                fullWidth
                sx={{
                  justifyContent: 'flex-start',
                  color: theme.palette.text.primary,
                  textTransform: 'none',
                  fontSize: '1rem',
                  py: 1.5,
                  px: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
                onClick={toggleMobileMenu}
              >
                {item.text}
              </Button>
            ))}
            
            {isAuthenticated ? (
              <>
                <Divider sx={{ my: 1 }} />
                <Button
                  fullWidth
                  startIcon={<AccountIcon />}
                  onClick={() => {
                    handleProfile();
                    toggleMobileMenu();
                  }}
                  sx={{
                    justifyContent: 'flex-start',
                    color: theme.palette.text.primary,
                    textTransform: 'none',
                    fontSize: '1rem',
                    py: 1.5,
                    px: 2,
                  }}
                >
                  Mi Perfil
                </Button>
                <Button
                  fullWidth
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => {
                    navigate('/cart');
                    toggleMobileMenu();
                  }}
                  sx={{
                    justifyContent: 'flex-start',
                    color: theme.palette.text.primary,
                    textTransform: 'none',
                    fontSize: '1rem',
                    py: 1.5,
                    px: 2,
                  }}
                >
                  Carrito
                  {getCartItemsCount() > 0 && (
                    <Badge 
                      badgeContent={getCartItemsCount()} 
                      color="primary"
                      sx={{ ml: 1 }}
                    />
                  )}
                </Button>
                <Button
                  fullWidth
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  sx={{
                    justifyContent: 'flex-start',
                    color: theme.palette.error.main,
                    textTransform: 'none',
                    fontSize: '1rem',
                    py: 1.5,
                    px: 2,
                  }}
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate('/login');
                  toggleMobileMenu();
                }}
                sx={{ mt: 1 }}
              >
                Iniciar Sesión
              </Button>
            )}
          </Box>
        )}
      </Container>
    </AppBar>
  );
};

export default Navbar;