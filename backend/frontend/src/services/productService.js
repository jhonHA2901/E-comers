import api from './api';

export const productService = {
  // Obtener todos los productos
  async getProducts(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      if (filters.categoria_id) params.append('categoria_id', filters.categoria_id);
      if (filters.precio_min) params.append('precio_min', filters.precio_min);
      if (filters.precio_max) params.append('precio_max', filters.precio_max);
      if (filters.page) params.append('page', filters.page);
      if (filters.search) params.append('search', filters.search);

      const response = await api.get(`/productos?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error al cargar productos:', error);
      if (error.response?.status === 401) {
        // Redirigir a login si no está autenticado
        window.location.href = '/login';
        return { success: false, message: 'No autorizado. Redirigiendo...' };
      }
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al cargar los productos',
        error: error.response?.data || error.message
      };
    }
  },

  // Obtener un producto específico
  async getProduct(id) {
    try {
      const response = await api.get(`/productos/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  // Obtener todas las categorías
  async getCategories() {
    try {
      const response = await api.get('/categorias');
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  // Obtener una categoría específica
  async getCategory(id) {
    try {
      const response = await api.get(`/categorias/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  // Crear producto (solo admin)
  async createProduct(productData) {
    try {
      const response = await api.post('/productos', productData);
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  // Actualizar producto (solo admin)
  async updateProduct(id, productData) {
    try {
      const response = await api.put(`/productos/${id}`, productData);
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  // Eliminar producto (solo admin)
  async deleteProduct(id) {
    try {
      const response = await api.delete(`/productos/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  // Crear categoría (solo admin)
  async createCategory(categoryData) {
    try {
      const response = await api.post('/categorias', categoryData);
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  // Actualizar categoría (solo admin)
  async updateCategory(id, categoryData) {
    try {
      const response = await api.put(`/categorias/${id}`, categoryData);
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  // Eliminar categoría (solo admin)
  async deleteCategory(id) {
    try {
      const response = await api.delete(`/categorias/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  }
}; 