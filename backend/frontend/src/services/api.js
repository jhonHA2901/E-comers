// frontend/src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Cambiado a HTTP

// Crear instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Importante para enviar cookies
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Interceptor para manejar peticiones
api.interceptors.request.use(
  (config) => {
    // No se necesita token CSRF para autenticación basada en sesión
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Redirigir a login si no está autenticado
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;