import api from './api';

export const orderService = {
  // Obtener pedidos del usuario
  async getOrders() {
    try {
      const response = await api.get('/pedidos');
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  // Obtener un pedido específico
  async getOrder(id) {
    try {
      const response = await api.get(`/pedidos/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  // Crear un nuevo pedido
  async createOrder(orderData) {
    try {
      const response = await api.post('/pedidos', orderData);
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  // Crear preferencia de pago
  async createPaymentPreference(pedidoId) {
    try {
      const response = await api.post('/pagos/preference', { pedido_id: pedidoId });
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  // Obtener estado del pago
  async getPaymentStatus(pedidoId) {
    try {
      const response = await api.get(`/pagos/status/${pedidoId}`);
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  }
}; 