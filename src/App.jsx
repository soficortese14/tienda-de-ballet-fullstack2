import { useState, useEffect } from 'react';
import NavbarComponent from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Carrito from './components/Carrito';
import Blog from './components/Blog';
import Nosotros from './components/Nosotros';
import { obtenerCarrito, obtenerCantidadTotal } from './utils/carritoUtils';
import './estilos.css';

function App() {
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const [vistaActual, setVistaActual] = useState('home'); // 'home', 'carrito', 'blog', 'nosotros'

  // Cargar cantidad del carrito al iniciar
  useEffect(() => {
    const carrito = obtenerCarrito();
    const cantidad = obtenerCantidadTotal(carrito);
    setCantidadCarrito(cantidad);
  }, []);

  const actualizarCantidadCarrito = (nuevaCantidad) => {
    setCantidadCarrito(nuevaCantidad);
  };

  const irACarrito = () => {
    setVistaActual('carrito');
  };

  const volverInicio = () => {
    setVistaActual('home');
  };

  const irABlog = () => {
    setVistaActual('blog');
  };

  const irANosotros = () => {
    setVistaActual('nosotros');
  };

  return (
    <div className="App">
      <NavbarComponent
        cantidadCarrito={cantidadCarrito}
        onIrCarrito={irACarrito}
        onIrInicio={volverInicio}
        onIrBlog={irABlog}
        onIrNosotros={irANosotros}
      />

      {vistaActual === 'home' && (
        <Home onActualizarCarrito={actualizarCantidadCarrito} />
      )}

      {vistaActual === 'carrito' && (
        <Carrito
          onActualizarCarrito={actualizarCantidadCarrito}
          onVolverInicio={volverInicio}
        />
      )}

      {vistaActual === 'blog' && (
        <Blog />
      )}

      {vistaActual === 'nosotros' && (
        <Nosotros />
      )}

      <Footer />
    </div>
  );
}

export default App;
