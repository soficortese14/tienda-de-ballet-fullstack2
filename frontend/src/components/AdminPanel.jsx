import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useAuth } from '../context/AuthContext';
import {
  getProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  getUsuarios,
  actualizarUsuario,
  eliminarUsuario
} from '../services/api';

function AdminPanel({ onVolverInicio }) {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('productos');

  // Estados para productos
  const [productos, setProductos] = useState([]);
  const [loadingProductos, setLoadingProductos] = useState(true);
  const [showModalProducto, setShowModalProducto] = useState(false);
  const [editandoProducto, setEditandoProducto] = useState(false);
  const [productoActual, setProductoActual] = useState({
    id: null,
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: '',
    categoria: 'zapatillas'
  });

  // Estados para usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(true);
  const [showModalUsuario, setShowModalUsuario] = useState(false);
  const [editandoUsuario, setEditandoUsuario] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState({
    id: null,
    username: '',
    email: '',
    password: '',
    rol: 'USER'
  });

  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  useEffect(() => {
    cargarProductos();
    cargarUsuarios();
  }, []);

  const mostrarMensaje = (tipo, texto) => {
    setMensaje({ tipo, texto });
    setTimeout(() => setMensaje({ tipo: '', texto: '' }), 4000);
  };

  // ============================================
  // FUNCIONES DE PRODUCTOS
  // ============================================

  const cargarProductos = async () => {
    try {
      setLoadingProductos(true);
      const data = await getProductos();
      setProductos(data);
    } catch (err) {
      console.error('Error al cargar productos:', err);
      mostrarMensaje('danger', 'Error al cargar productos');
    } finally {
      setLoadingProductos(false);
    }
  };

  const abrirModalNuevoProducto = () => {
    setEditandoProducto(false);
    setProductoActual({
      id: null,
      nombre: '',
      precio: '',
      descripcion: '',
      imagen: '/imagenes/default.jpg',
      categoria: 'zapatillas'
    });
    setShowModalProducto(true);
  };

  const abrirModalEditarProducto = (producto) => {
    setEditandoProducto(true);
    setProductoActual({ ...producto });
    setShowModalProducto(true);
  };

  const cerrarModalProducto = () => {
    setShowModalProducto(false);
    setProductoActual({
      id: null,
      nombre: '',
      precio: '',
      descripcion: '',
      imagen: '',
      categoria: 'zapatillas'
    });
  };

  const handleChangeProducto = (e) => {
    const { name, value } = e.target;
    setProductoActual({
      ...productoActual,
      [name]: name === 'precio' ? parseInt(value) || '' : value
    });
  };

  const handleSubmitProducto = async (e) => {
    e.preventDefault();

    try {
      if (editandoProducto) {
        await actualizarProducto(productoActual.id, productoActual);
        mostrarMensaje('success', 'Producto actualizado exitosamente');
      } else {
        await crearProducto(productoActual);
        mostrarMensaje('success', 'Producto creado exitosamente');
      }

      await cargarProductos();
      cerrarModalProducto();
    } catch (err) {
      console.error('Error al guardar producto:', err);
      mostrarMensaje('danger', 'Error al guardar el producto');
    }
  };

  const handleEliminarProducto = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) {
      return;
    }

    try {
      await eliminarProducto(id);
      mostrarMensaje('success', 'Producto eliminado exitosamente');
      await cargarProductos();
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      mostrarMensaje('danger', 'Error al eliminar el producto');
    }
  };

  // ============================================
  // FUNCIONES DE USUARIOS
  // ============================================

  const cargarUsuarios = async () => {
    try {
      setLoadingUsuarios(true);
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
      mostrarMensaje('danger', 'Error al cargar usuarios');
    } finally {
      setLoadingUsuarios(false);
    }
  };

  const abrirModalEditarUsuario = (usuario) => {
    setEditandoUsuario(true);
    setUsuarioActual({ ...usuario, password: '' }); // No mostrar password actual
    setShowModalUsuario(true);
  };

  const cerrarModalUsuario = () => {
    setShowModalUsuario(false);
    setUsuarioActual({
      id: null,
      username: '',
      email: '',
      password: '',
      rol: 'USER'
    });
  };

  const handleChangeUsuario = (e) => {
    const { name, value } = e.target;
    setUsuarioActual({
      ...usuarioActual,
      [name]: value
    });
  };

  const handleSubmitUsuario = async (e) => {
    e.preventDefault();

    try {
      // Solo enviar password si se ingresó uno nuevo
      const dataToSend = { ...usuarioActual };
      if (!dataToSend.password || dataToSend.password.trim() === '') {
        delete dataToSend.password;
      }

      await actualizarUsuario(usuarioActual.id, dataToSend);
      mostrarMensaje('success', 'Usuario actualizado exitosamente');
      await cargarUsuarios();
      cerrarModalUsuario();
    } catch (err) {
      console.error('Error al actualizar usuario:', err);
      mostrarMensaje('danger', 'Error al actualizar el usuario');
    }
  };

  const handleEliminarUsuario = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) {
      return;
    }

    try {
      await eliminarUsuario(id);
      mostrarMensaje('success', 'Usuario eliminado exitosamente');
      await cargarUsuarios();
    } catch (err) {
      console.error('Error al eliminar usuario:', err);
      mostrarMensaje('danger', 'Error al eliminar el usuario');
    }
  };

  // Verificar si es admin
  if (!isAdmin()) {
    return (
      <Container className="my-5">
        <Alert variant="danger" className="text-center">
          <h4>Acceso Denegado</h4>
          <p>No tienes permisos de administrador</p>
          <Button variant="primary" onClick={onVolverInicio}>
            Volver al Inicio
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid="lg" className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ color: '#ff69b4' }}>🔧 Panel de Administrador</h1>
        <Button variant="outline-secondary" onClick={onVolverInicio}>
          Volver al Inicio
        </Button>
      </div>

      {mensaje.texto && (
        <Alert variant={mensaje.tipo} className="text-center">
          {mensaje.texto}
        </Alert>
      )}

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        {/* TAB DE PRODUCTOS */}
        <Tab eventKey="productos" title="📦 Productos">
          <div className="d-flex justify-content-end mb-3">
            <Button variant="success" onClick={abrirModalNuevoProducto}>
              + Nuevo Producto
            </Button>
          </div>

          {loadingProductos ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Cargando productos...</p>
            </div>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Categoría</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>{producto.nombre}</td>
                    <td>${producto.precio.toLocaleString('es-CL')}</td>
                    <td>{producto.categoria}</td>
                    <td>{producto.descripcion.substring(0, 50)}...</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => abrirModalEditarProducto(producto)}
                        style={{ marginRight: '5px' }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleEliminarProducto(producto.id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Tab>

        {/* TAB DE USUARIOS */}
        <Tab eventKey="usuarios" title="👥 Usuarios">
          <div className="mb-3">
            <p className="text-muted">
              Gestiona los usuarios del sistema. Puedes editar sus datos y cambiar roles.
            </p>
          </div>

          {loadingUsuarios ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Cargando usuarios...</p>
            </div>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>
                      {usuario.username}
                      {usuario.rol === 'ADMIN' && ' 🔧'}
                    </td>
                    <td>{usuario.email}</td>
                    <td>
                      <span className={`badge bg-${usuario.rol === 'ADMIN' ? 'danger' : 'primary'}`}>
                        {usuario.rol}
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => abrirModalEditarUsuario(usuario)}
                        style={{ marginRight: '5px' }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleEliminarUsuario(usuario.id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Tab>
      </Tabs>

      {/* MODAL PRODUCTO */}
      <Modal show={showModalProducto} onHide={cerrarModalProducto} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editandoProducto ? 'Editar Producto' : 'Nuevo Producto'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitProducto}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Producto *</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={productoActual.nombre}
                onChange={handleChangeProducto}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio *</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={productoActual.precio}
                onChange={handleChangeProducto}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción *</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                value={productoActual.descripcion}
                onChange={handleChangeProducto}
                rows={3}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control
                type="text"
                name="imagen"
                value={productoActual.imagen}
                onChange={handleChangeProducto}
                placeholder="/imagenes/producto.jpg"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categoría *</Form.Label>
              <Form.Select
                name="categoria"
                value={productoActual.categoria}
                onChange={handleChangeProducto}
                required
              >
                <option value="zapatillas">Zapatillas</option>
                <option value="ropa">Ropa</option>
                <option value="accesorios">Accesorios</option>
              </Form.Select>
            </Form.Group>

            <div className="text-end">
              <Button variant="secondary" onClick={cerrarModalProducto} style={{ marginRight: '10px' }}>
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                style={{ backgroundColor: '#ff69b4', borderColor: '#ff69b4' }}
              >
                {editandoProducto ? 'Actualizar' : 'Crear'} Producto
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* MODAL USUARIO */}
      <Modal show={showModalUsuario} onHide={cerrarModalUsuario}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitUsuario}>
            <Form.Group className="mb-3">
              <Form.Label>Username *</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={usuarioActual.username}
                onChange={handleChangeUsuario}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={usuarioActual.email}
                onChange={handleChangeUsuario}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nueva Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={usuarioActual.password}
                onChange={handleChangeUsuario}
                placeholder="Dejar en blanco para no cambiar"
              />
              <Form.Text className="text-muted">
                Solo ingresa una contraseña si deseas cambiarla
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rol *</Form.Label>
              <Form.Select
                name="rol"
                value={usuarioActual.rol}
                onChange={handleChangeUsuario}
                required
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </Form.Select>
            </Form.Group>

            <div className="text-end">
              <Button variant="secondary" onClick={cerrarModalUsuario} style={{ marginRight: '10px' }}>
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                style={{ backgroundColor: '#ff69b4', borderColor: '#ff69b4' }}
              >
                Actualizar Usuario
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default AdminPanel;
