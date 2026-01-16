import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';

function NavbarComponent({ cantidadCarrito = 0, onIrCarrito, onIrInicio }) {
  return (
    <Navbar expand="lg" style={{ backgroundColor: '#ffc0cb' }}>
      <Container>
        <Navbar.Brand onClick={onIrInicio} style={{ color: '#ff69b4', fontWeight: 'bold', cursor: 'pointer' }}>
          Tienda Ballet
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={onIrInicio}>Inicio</Nav.Link>
            <Nav.Link onClick={onIrCarrito}>
              Carrito <Badge bg="danger">{cantidadCarrito}</Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
