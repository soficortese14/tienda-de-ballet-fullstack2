import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import ProductoCard from './ProductoCard';
import { productos } from '../data/productos';
import { agregarAlCarrito, obtenerCarrito, obtenerCantidadTotal } from '../utils/carritoUtils';

function Home({ onActualizarCarrito }) {
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [productoAgregado, setProductoAgregado] = useState('');

  const handleAgregarCarrito = (producto) => {
    const nuevoCarrito = agregarAlCarrito(producto);
    const cantidadTotal = obtenerCantidadTotal(nuevoCarrito);
    onActualizarCarrito(cantidadTotal);

    // Mostrar alerta
    setProductoAgregado(producto.nombre);
    setMostrarAlerta(true);

    // Ocultar alerta después de 3 segundos
    setTimeout(() => setMostrarAlerta(false), 3000);
  };

  return (
    <Container fluid="lg" className="my-5" style={{ maxWidth: '1400px' }}>
      {mostrarAlerta && (
        <Alert variant="success" className="text-center">
          {productoAgregado} agregado al carrito
        </Alert>
      )}

      <div className="text-center mb-5">
        <h1 style={{ color: '#ff69b4' }}>Productos de Ballet</h1>
        <p className="text-muted">Encuentra todo lo que necesitas para tu danza</p>
      </div>

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
    </Container>
  );
}

export default Home;
