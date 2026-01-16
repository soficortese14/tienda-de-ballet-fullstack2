import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import {
  obtenerCarrito,
  eliminarDelCarrito,
  actualizarCantidad,
  calcularTotal,
  vaciarCarrito,
  obtenerCantidadTotal
} from '../utils/carritoUtils';

function Carrito({ onActualizarCarrito, onVolverInicio }) {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    cargarCarrito();
  }, []);

  const cargarCarrito = () => {
    const carritoActual = obtenerCarrito();
    setCarrito(carritoActual);
    setTotal(calcularTotal(carritoActual));
  };

  const handleEliminar = (idProducto) => {
    eliminarDelCarrito(idProducto);
    cargarCarrito();
    const nuevoCarrito = obtenerCarrito();
    onActualizarCarrito(obtenerCantidadTotal(nuevoCarrito));
  };

  const handleCambiarCantidad = (idProducto, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    actualizarCantidad(idProducto, nuevaCantidad);
    cargarCarrito();
    const nuevoCarrito = obtenerCarrito();
    onActualizarCarrito(obtenerCantidadTotal(nuevoCarrito));
  };

  const handleVaciarCarrito = () => {
    if (window.confirm('¿Estás segura de vaciar el carrito?')) {
      vaciarCarrito();
      cargarCarrito();
      onActualizarCarrito(0);
    }
  };

  const handleProcederPago = () => {
    alert(`¡Pago simulado exitosamente!\n\nTotal pagado: $${total.toLocaleString('es-CL')}\n\nGracias por tu compra en Tienda Ballet.`);
    vaciarCarrito();
    cargarCarrito();
    onActualizarCarrito(0);
  };

  if (carrito.length === 0) {
    return (
      <div className="py-5 d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 150px)', width: '100%', margin: 0, padding: '3rem' }}>
        <Alert variant="info" className="text-center" style={{ padding: '3rem', width: '100%' }}>
          <h4 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Tu carrito está vacío</h4>
          <p style={{ fontSize: '1.3rem', marginBottom: '2rem' }}>Agrega productos desde la tienda</p>
          <Button
            variant="primary"
            onClick={onVolverInicio}
            style={{ backgroundColor: '#ff69b4', borderColor: '#ff69b4', padding: '1rem 3rem', fontSize: '1.2rem' }}
          >
            Ir a la Tienda
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="py-5" style={{ minHeight: 'calc(100vh - 150px)', width: '100%', margin: 0, padding: '3rem' }}>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 style={{ color: '#ff69b4', fontSize: '2.5rem' }}>Mi Carrito</h2>
        <div>
          <Button
            variant="outline-secondary"
            onClick={onVolverInicio}
            className="me-2"
          >
            ← Seguir Comprando
          </Button>
          <Button
            variant="danger"
            onClick={handleVaciarCarrito}
          >
            Vaciar Carrito
          </Button>
        </div>
      </div>

      <Table striped bordered hover responsive style={{ fontSize: '1.1rem' }}>
        <thead style={{ backgroundColor: '#ffc0cb' }}>
          <tr>
            <th style={{ padding: '1rem' }}>Producto</th>
            <th style={{ padding: '1rem' }}>Precio</th>
            <th style={{ padding: '1rem' }}>Cantidad</th>
            <th style={{ padding: '1rem' }}>Subtotal</th>
            <th style={{ padding: '1rem' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((item) => (
            <tr key={item.id}>
              <td style={{ padding: '1.2rem' }}>
                <div className="d-flex align-items-center">
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '15px' }}
                  />
                  <strong style={{ fontSize: '1.1rem' }}>{item.nombre}</strong>
                </div>
              </td>
              <td style={{ padding: '1.2rem', verticalAlign: 'middle' }}>${item.precio.toLocaleString('es-CL')}</td>
              <td style={{ padding: '1.2rem', verticalAlign: 'middle' }}>
                <div className="d-flex align-items-center justify-content-center">
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleCambiarCantidad(item.id, item.cantidad - 1)}
                    style={{ padding: '0.5rem 1rem', fontSize: '1.2rem' }}
                  >
                    -
                  </Button>
                  <span className="mx-4" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{item.cantidad}</span>
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleCambiarCantidad(item.id, item.cantidad + 1)}
                    style={{ padding: '0.5rem 1rem', fontSize: '1.2rem' }}
                  >
                    +
                  </Button>
                </div>
              </td>
              <td style={{ padding: '1.2rem', verticalAlign: 'middle' }}>
                <strong style={{ fontSize: '1.2rem' }}>${(item.precio * item.cantidad).toLocaleString('es-CL')}</strong>
              </td>
              <td style={{ padding: '1.2rem', verticalAlign: 'middle' }}>
                <Button
                  variant="danger"
                  onClick={() => handleEliminar(item.id)}
                  style={{ padding: '0.6rem 1.2rem' }}
                >
                  🗑️ Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="text-end mt-5">
        <h3 style={{ color: '#ff69b4', fontSize: '2rem', marginBottom: '2rem' }}>
          Total: ${total.toLocaleString('es-CL')}
        </h3>
        <Button
          variant="success"
          size="lg"
          className="mt-3"
          onClick={handleProcederPago}
          style={{ padding: '1rem 3rem', fontSize: '1.3rem' }}
        >
          Proceder al Pago
        </Button>
      </div>
    </div>
  );
}

export default Carrito;
