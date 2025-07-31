// frontend/src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await authService.me();
        if (response.success) {
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error al verificar sesión:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });
      if (response.success) {
        const userData = response.data.user;
        setUser(userData);
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Error en login:', error);
      if (error.response?.data?.message) {
        return { success: false, message: error.response.data.message };
      }
      return { success: false, message: 'Error de conexión' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      if (response.success) {
        const userData = response.data.user;
        setUser(userData);
        return { success: true };
      } else {
        return { 
          success: false, 
          message: response.message, 
          errors: response.errors 
        };
      }
    } catch (error) {
      console.error('Error en registro:', error);
      if (error.response?.status === 419) {
        return { 
          success: false, 
          message: 'Error de autenticación CSRF. Intenta nuevamente.' 
        };
      }
      if (error.response?.status === 422) {
        return { 
          success: false, 
          message: 'Datos de entrada inválidos', 
          errors: error.response.data.errors 
        };
      }
      if (error.response?.data?.message) {
        return { 
          success: false, 
          message: error.response.data.message, 
          errors: error.response.data.errors 
        };
      }
      return { 
        success: false, 
        message: 'Error de conexión con el servidor' 
      };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      setUser(null);
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};