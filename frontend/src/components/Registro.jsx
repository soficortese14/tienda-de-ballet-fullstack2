import { useState } from 'react';
import { registro as registroAPI } from '../services/api';

function Registro({ onCerrar, onVolverLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validaciones
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (formData.password.length < 5) {
      setError('La contraseña debe tener al menos 5 caracteres');
      setLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Por favor ingresa un email válido');
      setLoading(false);
      return;
    }

    try {
      const result = await registroAPI({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // Registro exitoso
      alert(`¡Registro exitoso! Ahora puedes iniciar sesión con el usuario: ${formData.username}`);
      if (onVolverLogin) {
        onVolverLogin();
      } else if (onCerrar) {
        onCerrar();
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Error al registrarse';
      setError(errorMsg);
      console.error('Error en registro:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registro-overlay">
      <div className="registro-modal">
        <button className="btn-cerrar" onClick={onCerrar}>
          ✕
        </button>

        <h2>Crear Cuenta</h2>

        <form onSubmit={handleSubmit} className="registro-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Elige un nombre de usuario"
              disabled={loading}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mínimo 5 caracteres"
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repite tu contraseña"
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="btn-registro" disabled={loading}>
            {loading ? 'Registrando...' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="registro-footer">
          <p>
            ¿Ya tienes cuenta?{' '}
            <button className="btn-link" onClick={onVolverLogin}>
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>

      <style>{`
        .registro-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .registro-modal {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          max-width: 450px;
          width: 90%;
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
        }

        .btn-cerrar {
          position: absolute;
          top: 10px;
          right: 10px;
          background: transparent;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #666;
        }

        .btn-cerrar:hover {
          color: #000;
        }

        .registro-modal h2 {
          margin-bottom: 1.5rem;
          color: #333;
          text-align: center;
        }

        .registro-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          margin-bottom: 0.5rem;
          color: #555;
          font-weight: 500;
        }

        .form-group input {
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
        }

        .form-group input:focus {
          outline: none;
          border-color: #ff69b4;
        }

        .form-group input:disabled {
          background: #f5f5f5;
          cursor: not-allowed;
        }

        .error-message {
          padding: 0.75rem;
          background: #fee;
          color: #c00;
          border-radius: 5px;
          margin-bottom: 1rem;
          text-align: center;
        }

        .btn-registro {
          padding: 0.75rem;
          background: #ff69b4;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 1rem;
        }

        .btn-registro:hover:not(:disabled) {
          background: #ff1493;
        }

        .btn-registro:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .registro-footer {
          margin-top: 1.5rem;
          text-align: center;
        }

        .btn-link {
          background: none;
          border: none;
          color: #ff69b4;
          cursor: pointer;
          font-weight: 600;
          text-decoration: underline;
        }

        .btn-link:hover {
          color: #ff1493;
        }
      `}</style>
    </div>
  );
}

export default Registro;
