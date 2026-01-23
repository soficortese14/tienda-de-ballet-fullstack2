import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simular envío de formulario
    console.log('Formulario enviado:', formData);

    // Mostrar mensaje de éxito
    setEnviado(true);

    // Limpiar formulario
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      mensaje: ''
    });

    // Ocultar mensaje después de 5 segundos
    setTimeout(() => setEnviado(false), 5000);
  };

  return (
    <Container fluid="lg" className="my-5" style={{ maxWidth: '800px' }}>
      <div className="text-center mb-4">
        <h1 style={{ color: '#ff69b4' }}>Contáctanos</h1>
        <p className="text-muted">
          ¿Tienes alguna pregunta o consulta? Completa el formulario y te contactaremos pronto.
        </p>
      </div>

      {enviado && (
        <Alert variant="success" className="text-center">
          ¡Mensaje enviado exitosamente! Te contactaremos pronto.
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre Completo *</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="+56 9 1234 5678"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mensaje *</Form.Label>
          <Form.Control
            as="textarea"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            placeholder="Escribe tu mensaje aquí..."
            rows={5}
            required
          />
        </Form.Group>

        <div className="text-center">
          <Button
            type="submit"
            size="lg"
            style={{
              backgroundColor: '#ff69b4',
              borderColor: '#ff69b4',
              padding: '0.75rem 3rem'
            }}
          >
            Enviar Mensaje
          </Button>
        </div>
      </Form>

      <div className="mt-5 p-4" style={{ backgroundColor: '#fff0f5', borderRadius: '10px' }}>
        <h4 style={{ color: '#ff69b4', marginBottom: '1.5rem' }}>Información de Contacto</h4>
        <div className="row">
          <div className="col-md-4 mb-3">
            <h6><strong>📍 Dirección</strong></h6>
            <p>Av. Principal 1234<br/>Santiago, Chile</p>
          </div>
          <div className="col-md-4 mb-3">
            <h6><strong>📞 Teléfono</strong></h6>
            <p>+56 9 1234 5678</p>
          </div>
          <div className="col-md-4 mb-3">
            <h6><strong>✉️ Email</strong></h6>
            <p>contacto@ballettienda.cl</p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Contacto;
