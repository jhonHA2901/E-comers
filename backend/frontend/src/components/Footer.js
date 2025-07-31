import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Divider,
  IconButton,
  Grid
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import logo from '../assets/logo.jpg';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#8B4513',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo y descripción */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <img
                src={logo}
                alt="Crepes & Coffee"
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  marginRight: 12,
                  border: '2px solid rgba(255,255,255,0.3)',
                }}
              />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Crepes & Coffee
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
              Los mejores crepes artesanales y café de especialidad. 
              Sabor auténtico en cada bocado, preparado con ingredientes 
              frescos y de la más alta calidad.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                  },
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                  },
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                  },
                }}
              >
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Enlaces rápidos */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Enlaces Rápidos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                href="/"
                color="inherit"
                sx={{
                  textDecoration: 'none',
                  opacity: 0.9,
                  '&:hover': { opacity: 1 },
                }}
              >
                Inicio
              </Link>
              <Link
                href="/products"
                color="inherit"
                sx={{
                  textDecoration: 'none',
                  opacity: 0.9,
                  '&:hover': { opacity: 1 },
                }}
              >
                Productos
              </Link>
              <Link
                href="/about"
                color="inherit"
                sx={{
                  textDecoration: 'none',
                  opacity: 0.9,
                  '&:hover': { opacity: 1 },
                }}
              >
                Nosotros
              </Link>
              <Link
                href="/contact"
                color="inherit"
                sx={{
                  textDecoration: 'none',
                  opacity: 0.9,
                  '&:hover': { opacity: 1 },
                }}
              >
                Contacto
              </Link>
            </Box>
          </Grid>

          {/* Información de contacto */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Contacto
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationIcon sx={{ fontSize: 20, opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Av. Principal 123, Ciudad
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ fontSize: 20, opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  +1 234 567 8900
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ fontSize: 20, opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  info@crepescoffee.com
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Horarios */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Horarios
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Lunes - Viernes
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  7:00 AM - 10:00 PM
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Sábados
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  8:00 AM - 11:00 PM
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Domingos
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  8:00 AM - 9:00 PM
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />

        {/* Copyright */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} Crepes & Coffee. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 