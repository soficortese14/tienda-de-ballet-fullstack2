import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import ProductoCard from './ProductoCard';
import { useAuth } from '../context/AuthContext';
import { getProductos, agregarAlCarrito as agregarAlCarritoAPI, getCarrito } from '../services/api';

function Home({ onActualizarCarrito }) {
  const { isAuthenticated, usuario } = useAuth();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [productoAgregado, setProductoAgregado] = useState('');
  const [mensajeAlerta, setMensajeAlerta] = useState('');

  // Cargar productos desde la API
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const data = await getProductos();
      setProductos(data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError('No se pudieron cargar los productos. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleAgregarCarrito = async (producto) => {
    // Verificar si el usuario está autenticado
    if (!isAuthenticated) {
      setMensajeAlerta('Debes iniciar sesión para agregar productos al carrito');
      setMostrarAlerta(true);
      setTimeout(() => setMostrarAlerta(false), 4000);
      return;
    }

    try {
      // Agregar producto al carrito en el backend
      await agregarAlCarritoAPI(usuario.id, producto.id, 1);

      // Actualizar contador del carrito
      const carritoActualizado = await getCarrito(usuario.id);
      onActualizarCarrito(carritoActualizado.cantidadItems);

      // Mostrar alerta de éxito
      setMensajeAlerta(`${producto.nombre} agregado al carrito`);
      setMostrarAlerta(true);
      setTimeout(() => setMostrarAlerta(false), 3000);
    } catch (err) {
      console.error('Error al agregar al carrito:', err);
      setMensajeAlerta('Error al agregar el producto. Por favor intenta de nuevo.');
      setMostrarAlerta(true);
      setTimeout(() => setMostrarAlerta(false), 4000);
    }
  };

  return (
    <Container fluid="lg" className="my-5" style={{ maxWidth: '1400px' }}>
      {mostrarAlerta && (
        <Alert
          variant={mensajeAlerta.includes('Error') || mensajeAlerta.includes('Debes') ? 'warning' : 'success'}
          className="text-center"
        >
          {mensajeAlerta}
        </Alert>
      )}

      <div className="text-center mb-5">
        <h1 style={{ color: '#ff69b4' }}>Productos de Ballet</h1>
        <p className="text-muted">Encuentra todo lo que necesitas para tu danza</p>
      </div>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Cargando productos...</p>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
          <div className="mt-2">
            <button className="btn btn-primary" onClick={cargarProductos}>
              Reintentar
            </button>
          </div>
        </Alert>
      )}

      {!loading && !error && (
        <Row xs={1} md={2} lg={3} className="g-4">
          {productos.map((producto) => (
            <Col key={producto.id}>
              <ProductoCard
                producto={producto}
                onAgregarCarrito={handleAgregarCarrito}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Home;
