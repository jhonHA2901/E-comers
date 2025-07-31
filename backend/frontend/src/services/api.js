// frontend/src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8002/api';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Importante para enviar cookies en peticiones cross-origin
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Interceptor para manejar peticiones
api.interceptors.request.use(
  async (config) => {
    // Obtener el token CSRF de la cookie si existe
    const token = document.cookie.split('; ')
      .find(row => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];
    
    if (token) {
      // Decodificar el token (Laravel codifica el token en la cookie)
      const decodedToken = decodeURIComponent(token);
      config.headers['X-XSRF-TOKEN'] = decodedToken;
    } else {
      // Si no hay token CSRF, intentar obtenerlo
      try {
        await axios.get('http://localhost:8002/sanctum/csrf-cookie', {
          withCredentials: true
        });
      } catch (error) {
        console.error('Error al obtener CSRF token:', error);
      }
    }
    
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
    } else if (error.response?.status === 419) {
      // Error de CSRF token expirado, recargar la página para obtener un nuevo token
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default api;