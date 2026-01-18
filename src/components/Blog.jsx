import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { articulos } from '../data/articulos';

function Blog() {
  return (
    <div>
      {/* Encabezado del Blog */}
      <section className="bg-light py-5">
        <Container className="text-center">
          <h1 className="display-4" style={{ color: '#ff69b4' }}>Blog Ballet Pas de Deux</h1>
          <p className="lead text-muted">Consejos, guías y noticias del mundo del ballet</p>
        </Container>
      </section>

      {/* Listado de Artículos */}
      <section className="py-5">
        <Container>
          <Row>
            {articulos.map((articulo) => (
              <Col key={articulo.id} md={6} className="mb-4">
                <Card className="h-100 shadow">
                  <Card.Img
                    variant="top"
                    src={articulo.imagen}
                    alt={articulo.titulo}
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Badge bg={articulo.categoriaBg} className="mb-2">
                      {articulo.categoria}
                    </Badge>
                    <Card.Title style={{ color: '#ff69b4' }}>
                      {articulo.titulo}
                    </Card.Title>
                    <Card.Text className="text-muted">
                      {articulo.resumen}
                    </Card.Text>
                    <p className="text-muted">
                      <small>{articulo.fecha} | {articulo.tiempoLectura}</small>
                    </p>
                    <Button
                      variant="primary"
                      style={{ backgroundColor: '#ff69b4', borderColor: '#ff69b4' }}
                      onClick={() => alert(`Función de lectura completa próximamente.\n\nArtículo: ${articulo.titulo}`)}
                    >
                      Leer Más
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Blog;
