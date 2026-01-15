import { useState, useEffect } from 'react';
import NavbarComponent from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import { obtenerCarrito, obtenerCantidadTotal } from './utils/carritoUtils';
import './estilos.css';

function App() {
  const [cantidadCarrito, setCantidadCarrito] = useState(0);

  // Cargar cantidad del carrito al iniciar
  useEffect(() => {
    const carrito = obtenerCarrito();
    const cantidad = obtenerCantidadTotal(carrito);
    setCantidadCarrito(cantidad);
  }, []);

  const actualizarCantidadCarrito = (nuevaCantidad) => {
    setCantidadCarrito(nuevaCantidad);
  };

  return (
    <div className="App">
      <NavbarComponent cantidadCarrito={cantidadCarrito} />
      <Home onActualizarCarrito={actualizarCantidadCarrito} />
      <Footer />
    </div>
  );
}

export default App;
