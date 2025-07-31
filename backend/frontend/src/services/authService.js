import api from './api';

export const authService = {
  // Registrar usuario
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Error en registro:', error);
      if (error.response?.data) {
        throw error.response.data;
      }
      throw error;
    }
  },

  // Iniciar sesión
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Error en login:', error);
      if (error.response?.data) {
        throw error.response.data;
      }
      throw error;
    }
  },

  // Cerrar sesión
  async logout() {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  },

  // Obtener información del usuario actual
  async me() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw error;
    }
  },

  // Obtener perfil del usuario
  async getProfile() {
    try {
      const response = await api.get('/profile');
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw error;
    }
  },

  // Actualizar perfil del usuario
  async updateProfile(profileData) {
    try {
      const response = await api.put('/profile', profileData);
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw error;
    }
  },

  // Cambiar contraseña
  async changePassword(passwordData) {
    try {
      const response = await api.put('/profile/password', passwordData);
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw error;
    }
  },
  
  // Verificar si el usuario está autenticado
  async isAuthenticated() {
    try {
      const response = await this.me();
      return response.success && response.data;
    } catch (error) {
      return false;
    }
  }
};