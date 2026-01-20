// Funciones para manejar el carrito con LocalStorage

export const obtenerCarrito = () => {
  const carrito = localStorage.getItem('carrito');
  return carrito ? JSON.parse(carrito) : [];
};

export const guardarCarrito = (carrito) => {
  localStorage.setItem('carrito', JSON.stringify(carrito));
};

export const agregarAlCarrito = (producto) => {
  const carrito = obtenerCarrito();
  const productoExistente = carrito.find(item => item.id === producto.id);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito(carrito);
  return carrito;
};

export const eliminarDelCarrito = (idProducto) => {
  const carrito = obtenerCarrito();
  const nuevoCarrito = carrito.filter(item => item.id !== idProducto);
  guardarCarrito(nuevoCarrito);
  return nuevoCarrito;
};

export const actualizarCantidad = (idProducto, cantidad) => {
  const carrito = obtenerCarrito();
  const producto = carrito.find(item => item.id === idProducto);

  if (producto) {
    producto.cantidad = cantidad;
    if (producto.cantidad <= 0) {
      return eliminarDelCarrito(idProducto);
    }
  }

  guardarCarrito(carrito);
  return carrito;
};

export const calcularTotal = (carrito) => {
  return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
};

export const vaciarCarrito = () => {
  localStorage.removeItem('carrito');
  return [];
};

export const obtenerCantidadTotal = (carrito) => {
  return carrito.reduce((total, item) => total + item.cantidad, 0);
};
