import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import PrivateRoute from './components/PrivateRoute';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

// Tema personalizado basado en la imagen del menú
const theme = createTheme({
  palette: {
    primary: {
      main: '#5D4037', // Marrón oscuro del menú
      light: '#8D6E63',
      dark: '#3E2723',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#D7CCC8', // Beige claro del menú
      light: '#EFEBE9',
      dark: '#BCAAA4',
      contrastText: '#3E2723',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFF8F0', // Fondo beige muy claro
    },
    text: {
      primary: '#3E2723', // Marrón oscuro para texto
      secondary: '#5D4037',
    },
  },
  typography: {
    fontFamily: '"Playfair Display", "Roboto", serif',
    h1: {
      fontWeight: 700,
      color: '#3E2723',
      fontFamily: '"Playfair Display", serif',
    },
    h2: {
      fontWeight: 600,
      color: '#3E2723',
      fontFamily: '"Playfair Display", serif',
    },
    h3: {
      fontWeight: 600,
      color: '#5D4037',
      fontFamily: '"Playfair Display", serif',
    },
    h4: {
      fontWeight: 500,
      color: '#5D4037',
      fontFamily: '"Playfair Display", serif',
    },
    h5: {
      fontWeight: 500,
      color: '#5D4037',
      fontFamily: '"Roboto", sans-serif',
    },
    h6: {
      fontWeight: 500,
      color: '#5D4037',
      fontFamily: '"Roboto", sans-serif',
    },
    body1: {
      fontFamily: '"Roboto", sans-serif',
      color: '#3E2723',
    },
    button: {
      textTransform: 'none',
      fontFamily: '"Roboto", sans-serif',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 500,
          padding: '8px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
        contained: {
          backgroundColor: '#5D4037',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#3E2723',
          },
        },
        outlined: {
          borderColor: '#5D4037',
          color: '#5D4037',
          '&:hover': {
            backgroundColor: 'rgba(93, 64, 55, 0.05)',
            borderColor: '#3E2723',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          border: '1px solid #E0D6CE',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#5D4037',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <CartProvider>
            <Router>
              <div style={{ 
                minHeight: '100vh', 
                display: 'flex', 
                flexDirection: 'column',
                backgroundColor: '#FFF8F0',
                backgroundImage: 'linear-gradient(to bottom, #FFF8F0 0%, #FFFFFF 100%)',
                fontFamily: '"Roboto", sans-serif',
              }}>
                <Navbar />
                <main style={{ 
                  flex: 1, 
                  padding: '20px 0',
                  maxWidth: '1200px',
                  width: '100%',
                  margin: '0 auto',
                  padding: '20px 16px',
                }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/checkout" element={
                      <PrivateRoute>
                        <Checkout />
                      </PrivateRoute>
                    } />
                    <Route path="/orders" element={
                      <PrivateRoute>
                        <Orders />
                      </PrivateRoute>
                    } />
                    <Route path="/profile" element={
                      <PrivateRoute>
                        <Profile />
                      </PrivateRoute>
                    } />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
