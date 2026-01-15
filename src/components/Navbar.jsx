import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';

function NavbarComponent({ cantidadCarrito = 0 }) {
  return (
    <Navbar expand="lg" style={{ backgroundColor: '#ffc0cb' }}>
      <Container>
        <Navbar.Brand href="#home" style={{ color: '#ff69b4', fontWeight: 'bold' }}>
          🩰 Tienda Ballet
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Inicio</Nav.Link>
            <Nav.Link href="#productos">Productos</Nav.Link>
            <Nav.Link href="#nosotros">Nosotros</Nav.Link>
            <Nav.Link href="#blogs">Blog</Nav.Link>
            <Nav.Link href="#carrito">
              🛒 Carrito <Badge bg="danger">{cantidadCarrito}</Badge>
            </Nav.Link>
            <Nav.Link href="#login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
