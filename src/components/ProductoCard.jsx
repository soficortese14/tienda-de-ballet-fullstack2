import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ProductoCard({ producto, onAgregarCarrito }) {
  const { id, nombre, precio, imagen, descripcion } = producto;

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={imagen}
        alt={nombre}
        style={{ height: '250px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title style={{ color: '#ff69b4' }}>{nombre}</Card.Title>
        <Card.Text className="text-muted">
          {descripcion}
        </Card.Text>
        <div className="mt-auto">
          <h5 className="text-success mb-3">${precio.toLocaleString('es-CL')}</h5>
          <Button
            variant="primary"
            className="w-100"
            style={{ backgroundColor: '#ff69b4', borderColor: '#ff69b4' }}
            onClick={() => onAgregarCarrito(producto)}
          >
            Agregar al Carrito 🛒
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductoCard;
