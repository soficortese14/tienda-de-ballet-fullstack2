import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useAuth } from '../context/AuthContext';
import {
  getCarrito,
  actualizarCantidadCarrito,
  eliminarDelCarrito,
  vaciarCarrito
} from '../services/api';

function Carrito({ onActualizarCarrito, onVolverInicio }) {
  const { isAuthenticated, usuario } = useAuth();
  const [carrito, setCarrito] = useState({ items: [], total: 0, cantidadItems: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated && usuario) {
      cargarCarrito();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, usuario]);

  const cargarCarrito = async () => {
    try {
      setLoading(true);
      const data = await getCarrito(usuario.id);
      setCarrito(data);
      onActualizarCarrito(data.cantidadItems);
      setError(null);
    } catch (err) {
      console.error('Error al cargar carrito:', err);
      setError('Error al cargar el carrito');
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (itemId) => {
    try {
      await eliminarDelCarrito(itemId);
      await cargarCarrito();
    } catch (err) {
      console.error('Error al eliminar item:', err);
      alert('Error al eliminar el producto');
    }
  };

  const handleCambiarCantidad = async (itemId, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;

    try {
      await actualizarCantidadCarrito(itemId, nuevaCantidad);
      await cargarCarrito();
    } catch (err) {
      console.error('Error al actualizar cantidad:', err);
      alert('Error al actualizar la cantidad');
    }
  };

  const handleVaciarCarrito = async () => {
    if (window.confirm('¿Estás segura de vaciar el carrito?')) {
      try {
        await vaciarCarrito(usuario.id);
        await cargarCarrito();
      } catch (err) {
        console.error('Error al vaciar carrito:', err);
        alert('Error al vaciar el carrito');
      }
    }
  };

  const handleProcederPago = async () => {
    alert(`¡Pago simulado exitosamente!\n\nTotal pagado: $${carrito.total.toLocaleString('es-CL')}\n\nGracias por tu compra en Tienda Ballet.`);
    await handleVaciarCarrito();
  };

  // Si no está autenticado, mostrar mensaje
  if (!isAuthenticated) {
    return (
      <div className="py-5 d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 150px)', width: '100%', margin: 0, padding: '3rem' }}>
        <Alert variant="warning" className="text-center" style={{ padding: '3rem', width: '100%' }}>
          <h4 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
            Debes iniciar sesión para ver tu carrito
          </h4>
          <p style={{ fontSize: '1.3rem', marginBottom: '2rem' }}>
            Inicia sesión o regístrate para guardar tus productos
          </p>
          <Button
            variant="primary"
            onClick={onVolverInicio}
            style={{ backgroundColor: '#ff69b4', borderColor: '#ff69b4', padding: '1rem 3rem', fontSize: '1.2rem' }}
          >
            Volver al Inicio
          </Button>
        </Alert>
      </div>
    );
  }

  // Mientras carga
  if (loading) {
    return (
      <div className="py-5 d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 150px)' }}>
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Cargando carrito...</p>
        </div>
      </div>
    );
  }

  // Si hay error
  if (error) {
    return (
      <div className="py-5 d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 150px)' }}>
        <Alert variant="danger" className="text-center">
          {error}
          <div className="mt-2">
            <Button variant="primary" onClick={cargarCarrito}>
              Reintentar
            </Button>
          </div>
        </Alert>
      </div>
    );
  }

  // Si el carrito está vacío
  if (carrito.items.length === 0) {
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
            variant="outline-danger"
            onClick={handleVaciarCarrito}
            style={{ marginRight: '1rem', padding: '0.8rem 2rem', fontSize: '1.1rem' }}
          >
            Vaciar Carrito
          </Button>
          <Button
            variant="outline-secondary"
            onClick={onVolverInicio}
            style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}
          >
            Seguir Comprando
          </Button>
        </div>
      </div>

      <Table striped bordered hover responsive style={{ fontSize: '1.2rem' }}>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carrito.items.map((item) => (
            <tr key={item.id}>
              <td>{item.producto.nombre}</td>
              <td>${item.producto.precio.toLocaleString('es-CL')}</td>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleCambiarCantidad(item.id, item.cantidad - 1)}
                    disabled={item.cantidad <= 1}
                  >
                    -
                  </Button>
                  <span style={{ minWidth: '40px', textAlign: 'center' }}>{item.cantidad}</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleCambiarCantidad(item.id, item.cantidad + 1)}
                  >
                    +
                  </Button>
                </div>
              </td>
              <td>${(item.producto.precio * item.cantidad).toLocaleString('es-CL')}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleEliminar(item.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end mt-4">
        <div style={{ backgroundColor: '#f8f9fa', padding: '2rem 3rem', borderRadius: '8px' }}>
          <h3 style={{ color: '#ff69b4', fontSize: '2rem', marginBottom: '1rem' }}>
            Total: ${carrito.total.toLocaleString('es-CL')}
          </h3>
          <Button
            variant="primary"
            size="lg"
            onClick={handleProcederPago}
            style={{ backgroundColor: '#ff69b4', borderColor: '#ff69b4', padding: '1rem 3rem', fontSize: '1.3rem' }}
          >
            Proceder al Pago
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Carrito;
