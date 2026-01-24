import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../context/AuthContext';
import Login from './Login';
import Registro from './Registro';

function NavbarComponent({ cantidadCarrito = 0, onIrCarrito, onIrInicio, onIrBlog, onIrNosotros, onIrContacto, onIrAdmin }) {
  const { isAuthenticated, usuario, logout } = useAuth();
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
      logout();
    }
  };

  const abrirLogin = () => {
    setMostrarRegistro(false);
    setMostrarLogin(true);
  };

  const abrirRegistro = () => {
    setMostrarLogin(false);
    setMostrarRegistro(true);
  };

  const cerrarModales = () => {
    setMostrarLogin(false);
    setMostrarRegistro(false);
  };

  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: '#ffc0cb' }}>
        <Container>
          <Navbar.Brand onClick={onIrInicio} style={{ color: '#ff69b4', fontWeight: 'bold', cursor: 'pointer' }}>
            Ballet Pas de Deux
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={onIrInicio}>Inicio</Nav.Link>
              <Nav.Link onClick={onIrBlog}>Blog</Nav.Link>
              <Nav.Link onClick={onIrNosotros}>Nosotros</Nav.Link>
              <Nav.Link onClick={onIrContacto}>Contacto</Nav.Link>
              <Nav.Link onClick={onIrCarrito}>
                Carrito <Badge bg="danger">{cantidadCarrito}</Badge>
              </Nav.Link>

              {isAuthenticated ? (
                <>
                  {usuario?.rol === 'ADMIN' && (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={onIrAdmin}
                      style={{ marginLeft: '10px' }}
                    >
                      🔧 Admin Panel
                    </Button>
                  )}
                  <Nav.Link style={{ color: '#ff1493', fontWeight: 'bold' }}>
                    👤 {usuario?.username}
                  </Nav.Link>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleLogout}
                    style={{ marginLeft: '10px' }}
                  >
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={abrirLogin}
                    style={{ marginLeft: '10px' }}
                  >
                    Iniciar Sesión
                  </Button>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={abrirRegistro}
                    style={{ marginLeft: '5px' }}
                  >
                    Registrarse
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modales */}
      {mostrarLogin && (
        <Login
          onCerrar={cerrarModales}
          onRegistro={abrirRegistro}
        />
      )}

      {mostrarRegistro && (
        <Registro
          onCerrar={cerrarModales}
          onVolverLogin={abrirLogin}
        />
      )}
    </>
  );
}

export default NavbarComponent;
