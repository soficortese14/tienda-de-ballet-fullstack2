//Sistema de autenticación global con JWT (JSON Web Token)
//explicacion: este archivo implementa Context API de React para que cualquer
//componente pueda acceder a la info del usuario autenticado sin pasar props  
//manualmente por toda la jerarquia de componentes
import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginAPI, logout as logoutAPI, getUsuarioActual } from '../services/api';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

// Provider del contexto
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verificar si hay un usuario autenticado al cargar
  useEffect(() => {
    const usuarioGuardado = getUsuarioActual();
    if (usuarioGuardado) {
      setUsuario(usuarioGuardado);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Función de login
  const login = async (username, password) => {
    try {
      const response = await loginAPI(username, password);

      if (response.usuario) {
        setUsuario(response.usuario);
        setIsAuthenticated(true);
        return { success: true, data: response };
      }

      return { success: false, error: 'Error al iniciar sesión' };
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Error al iniciar sesión'
      };
    }
  };

  // Función de logout
  const logout = () => {
    logoutAPI();
    setUsuario(null);
    setIsAuthenticated(false);
  };

  // Verificar si el usuario es admin
  const isAdmin = () => {
    return usuario?.rol === 'ADMIN';
  };

  const value = {
    usuario,
    isAuthenticated,
    loading,
    login,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
