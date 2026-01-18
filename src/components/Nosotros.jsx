import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function Nosotros() {
  return (
    <div>
      {/* Encabezado */}
      <section className="bg-light py-5">
        <Container className="text-center">
          <h1 className="display-4" style={{ color: '#ff69b4' }}>Sobre Ballet Pas de Deux</h1>
          <p className="lead text-muted">Gran pasión por el ballet desde 2018</p>
        </Container>
      </section>

      {/* Nuestra Historia */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4">
              <img
                src="/imagenes/principal.jpg"
                className="img-fluid rounded shadow"
                alt="Ballet Pas de Deux"
                style={{ width: '100%', height: 'auto' }}
              />
            </Col>
            <Col md={6} className="mb-4">
              <h2 style={{ color: '#ff69b4' }} className="mb-4">Nuestra Historia</h2>
              <p>
                <strong>Ballet Pas de Deux</strong> nació en el 2018 con un sueño: crear un espacio donde
                bailarines de todos los niveles pudieran encontrar productos de calidad con el respaldo
                de quienes realmente entienden sus necesidades.
              </p>
              <p>
                Fundada por ex bailarinas profesionales, nuestra tienda combina años de experiencia en
                escenarios con el conocimiento técnico necesario para asesorar a cada cliente de forma
                personalizada y con comprensión.
              </p>
              <p>
                Desde nuestros inicios en Viña del Mar, hemos crecido hasta convertirnos en una referencia
                para la comunidad del ballet en Chile, siempre manteniendo nuestros valores de calidad,
                cercanía y profesionalismo.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Misión y Valores */}
      <section className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-5" style={{ color: '#ff69b4' }}>Nuestra Misión y Valores</h2>
          <Row>
            <Col md={4} className="mb-4 text-center">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <div style={{ fontSize: '50px', color: '#ff69b4' }}>🎯</div>
                  <h4 style={{ color: '#ff69b4' }} className="mt-3">Misión</h4>
                  <p>
                    Proporcionar productos de ballet de alta calidad y una asesoría experta para que cada
                    bailarina logre alcanzar su máximo potencial artístico.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4 text-center">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <div style={{ fontSize: '50px', color: '#ff69b4' }}>⭐</div>
                  <h4 style={{ color: '#ff69b4' }} className="mt-3">Calidad</h4>
                  <p>
                    Trabajamos solo con las mejores marcas internacionales. Cada producto es
                    seleccionado cuidadosamente para garantizar durabilidad y rendimiento.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4 text-center">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <div style={{ fontSize: '50px', color: '#ff69b4' }}>❤️</div>
                  <h4 style={{ color: '#ff69b4' }} className="mt-3">Pasión</h4>
                  <p>
                    El ballet no es solo nuestro negocio, es nuestra pasión. Entendemos tus necesidades
                    porque hemos estado en tu lugar, sobre el escenario y en el estudio.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Por qué elegirnos */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5" style={{ color: '#ff69b4' }}>¿Por Qué Elegirnos?</h2>
          <Row>
            <Col md={6} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 style={{ color: '#ff69b4' }}>✨ Experiencia Profesional</h5>
                  <p>
                    Nuestro equipo está formado por bailarinas y profesores con años de experiencia
                    que pueden asesorarte personalmente en cada compra.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 style={{ color: '#ff69b4' }}>🌟 Productos Certificados</h5>
                  <p>
                    Trabajamos directamente con fabricantes reconocidos internacionalmente para
                    garantizar la autenticidad y calidad de cada artículo.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 style={{ color: '#ff69b4' }}>💝 Atención Personalizada</h5>
                  <p>
                    Cada bailarina es única. Por eso ofrecemos asesoría individual para encontrar
                    exactamente lo que necesitas según tu nivel y estilo.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 style={{ color: '#ff69b4' }}>🚀 Envíos a Todo Chile</h5>
                  <p>
                    Llegamos a todo el país con envíos rápidos y seguros. Porque sabemos que cuando
                    necesitas tus zapatillas, las necesitas ya.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Nosotros;
