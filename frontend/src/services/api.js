import axios from 'axios';

// URL base del backend
const API_URL = 'http://localhost:8080/api';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token JWT a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido - limpiar localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      // No redirigir, solo limpiar - AuthContext manejará el estado
    }
    return Promise.reject(error);
  }
);

// ============================================
// SERVICIOS DE AUTENTICACIÓN
// ============================================

/**
 * Registrar nuevo usuario
 * @param {Object} userData - {username, email, password}
 * @returns {Promise} Respuesta del servidor
 */
export const registro = async (userData) => {
  const response = await api.post('/usuarios/registro', userData);
  return response.data;
};

/**
 * Login de usuario
 * @param {string} username - Username o email
 * @param {string} password - Contraseña
 * @returns {Promise} Respuesta con token y datos del usuario
 */
export const login = async (username, password) => {
  const response = await api.post('/usuarios/login', { username, password });

  // Guardar token y usuario en localStorage
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
  }

  return response.data;
};

/**
 * Validar token JWT
 * @returns {Promise} Respuesta con validación del token
 */
export const validarToken = async () => {
  const response = await api.post('/usuarios/validar-token');
  return response.data;
};

/**
 * Logout (limpiar datos locales)
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  window.location.href = '/';
};

/**
 * Obtener usuario actual desde localStorage
 * @returns {Object|null} Datos del usuario
 */
export const getUsuarioActual = () => {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
};

// ============================================
// SERVICIOS DE PRODUCTOS
// ============================================

/**
 * Obtener todos los productos
 * @returns {Promise} Lista de productos
 */
export const getProductos = async () => {
  const response = await api.get('/productos');
  return response.data;
};

/**
 * Obtener producto por ID
 * @param {number} id - ID del producto
 * @returns {Promise} Datos del producto
 */
export const getProductoPorId = async (id) => {
  const response = await api.get(`/productos/${id}`);
  return response.data;
};

/**
 * Obtener productos por categoría
 * @param {string} categoria - Nombre de la categoría
 * @returns {Promise} Lista de productos
 */
export const getProductosPorCategoria = async (categoria) => {
  const response = await api.get(`/productos/categoria/${categoria}`);
  return response.data;
};

/**
 * Crear nuevo producto (Admin)
 * @param {Object} producto - Datos del producto
 * @returns {Promise} Producto creado
 */
export const crearProducto = async (producto) => {
  const response = await api.post('/productos', producto);
  return response.data;
};

/**
 * Actualizar producto (Admin)
 * @param {number} id - ID del producto
 * @param {Object} producto - Datos actualizados
 * @returns {Promise} Producto actualizado
 */
export const actualizarProducto = async (id, producto) => {
  const response = await api.put(`/productos/${id}`, producto);
  return response.data;
};

/**
 * Eliminar producto (Admin)
 * @param {number} id - ID del producto
 * @returns {Promise} Respuesta del servidor
 */
export const eliminarProducto = async (id) => {
  const response = await api.delete(`/productos/${id}`);
  return response.data;
};

// ============================================
// SERVICIOS DE CARRITO
// ============================================

/**
 * Obtener carrito del usuario
 * @param {number} usuarioId - ID del usuario
 * @returns {Promise} Datos del carrito con items y total
 */
export const getCarrito = async (usuarioId) => {
  const response = await api.get(`/carrito/usuario/${usuarioId}`);
  return response.data;
};

/**
 * Agregar producto al carrito
 * @param {number} usuarioId - ID del usuario
 * @param {number} productoId - ID del producto
 * @param {number} cantidad - Cantidad a agregar
 * @returns {Promise} Respuesta del servidor
 */
export const agregarAlCarrito = async (usuarioId, productoId, cantidad = 1) => {
  const response = await api.post('/carrito', {
    usuarioId,
    productoId,
    cantidad,
  });
  return response.data;
};

/**
 * Actualizar cantidad de un item del carrito
 * @param {number} itemId - ID del item en el carrito
 * @param {number} cantidad - Nueva cantidad
 * @returns {Promise} Respuesta del servidor
 */
export const actualizarCantidadCarrito = async (itemId, cantidad) => {
  const response = await api.put(`/carrito/${itemId}`, { cantidad });
  return response.data;
};

/**
 * Eliminar item del carrito
 * @param {number} itemId - ID del item en el carrito
 * @returns {Promise} Respuesta del servidor
 */
export const eliminarDelCarrito = async (itemId) => {
  const response = await api.delete(`/carrito/${itemId}`);
  return response.data;
};

/**
 * Vaciar carrito completo
 * @param {number} usuarioId - ID del usuario
 * @returns {Promise} Respuesta del servidor
 */
export const vaciarCarrito = async (usuarioId) => {
  const response = await api.delete(`/carrito/usuario/${usuarioId}`);
  return response.data;
};

// ============================================
// SERVICIOS DE USUARIOS (Admin)
// ============================================

/**
 * Obtener todos los usuarios (Admin)
 * @returns {Promise} Lista de usuarios
 */
export const getUsuarios = async () => {
  const response = await api.get('/usuarios');
  return response.data;
};

/**
 * Obtener usuario por ID (Admin)
 * @param {number} id - ID del usuario
 * @returns {Promise} Datos del usuario
 */
export const getUsuarioPorId = async (id) => {
  const response = await api.get(`/usuarios/${id}`);
  return response.data;
};

/**
 * Actualizar usuario (Admin)
 * @param {number} id - ID del usuario
 * @param {Object} usuario - Datos actualizados
 * @returns {Promise} Usuario actualizado
 */
export const actualizarUsuario = async (id, usuario) => {
  const response = await api.put(`/usuarios/${id}`, usuario);
  return response.data;
};

/**
 * Eliminar usuario (Admin)
 * @param {number} id - ID del usuario
 * @returns {Promise} Respuesta del servidor
 */
export const eliminarUsuario = async (id) => {
  const response = await api.delete(`/usuarios/${id}`);
  return response.data;
};

// Exportar instancia de axios por si se necesita para casos especiales
export default api;
