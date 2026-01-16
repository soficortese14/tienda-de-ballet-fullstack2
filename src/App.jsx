import { useState, useEffect } from 'react';
import NavbarComponent from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Carrito from './components/Carrito';
import { obtenerCarrito, obtenerCantidadTotal } from './utils/carritoUtils';
import './estilos.css';

function App() {
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const [vistaActual, setVistaActual] = useState('home'); // 'home' o 'carrito'

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

  return (
    <div className="App">
      <NavbarComponent
        cantidadCarrito={cantidadCarrito}
        onIrCarrito={irACarrito}
        onIrInicio={volverInicio}
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

      <Footer />
    </div>
  );
}

export default App;
