import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { articulos } from '../data/articulos';

function Blog() {
  const [articuloSeleccionado, setArticuloSeleccionado] = useState(null);

  // Si hay un artículo seleccionado, mostrar el detalle
  if (articuloSeleccionado) {
    return (
      <div>
        {/* Artículo Completo */}
        <article className="py-5">
          <Container>
            <Row className="justify-content-center">
              <Col lg={8}>
                {/* Botón volver */}
                <Button
                  variant="outline-primary"
                  className="mb-4"
                  onClick={() => setArticuloSeleccionado(null)}
                >
                  ← Volver al Blog
                </Button>

                {/* Título */}
                <h1 className="display-4 mb-3" style={{ color: '#ff69b4' }}>
                  {articuloSeleccionado.titulo}
                </h1>

                {/* Metadatos */}
                <div className="mb-4">
                  <Badge bg={articuloSeleccionado.categoriaBg}>
                    {articuloSeleccionado.categoria}
                  </Badge>
                  <span className="text-muted ms-3">{articuloSeleccionado.fecha}</span>
                  <span className="text-muted ms-3">{articuloSeleccionado.tiempoLectura}</span>
                </div>

                {/* Imagen destacada */}
                <img
                  src={articuloSeleccionado.imagen}
                  className="img-fluid rounded shadow mb-4"
                  alt={articuloSeleccionado.titulo}
                  style={{ width: '100%', height: 'auto' }}
                />

                {/* Contenido */}
                <div className="lead mb-4">
                  <p>{articuloSeleccionado.contenido.introduccion}</p>
                </div>

                {/* Secciones */}
                {articuloSeleccionado.contenido.secciones.map((seccion, index) => (
                  <div key={index}>
                    <h3 className="mt-5 mb-3" style={{ color: '#ff69b4' }}>
                      {seccion.titulo}
                    </h3>
                    <p>{seccion.contenido}</p>
                    {seccion.lista && (
                      <ul>
                        {seccion.lista.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {/* Consejo de expertas */}
                <Alert variant="info" className="mt-5">
                  <h4>💡 Consejo de Expertas</h4>
                  <p className="mb-0">{articuloSeleccionado.contenido.consejo}</p>
                </Alert>

                {/* Botones de acción */}
                <div className="d-flex gap-3 mt-4">
                  <Button
                    variant="outline-primary"
                    onClick={() => setArticuloSeleccionado(null)}
                  >
                    ← Volver al Blog
                  </Button>
                  <Button
                    variant="primary"
                    style={{ backgroundColor: '#ff69b4', borderColor: '#ff69b4' }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Ver Productos
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </article>
      </div>
    );
  }

  // Vista de lista de artículos
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
                      onClick={() => setArticuloSeleccionado(articulo)}
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
