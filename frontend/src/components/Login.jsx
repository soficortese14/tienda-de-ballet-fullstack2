import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Login({ onCerrar, onRegistro }) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(''); // Limpiar error al escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.username || !formData.password) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

    try {
      const result = await login(formData.username, formData.password);

      if (result.success) {
        // Login exitoso
        alert(`¡Bienvenido ${result.data.usuario.username}!`);
        if (onCerrar) onCerrar();
      } else {
        setError(result.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error('Error en login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-modal">
        <button className="btn-cerrar" onClick={onCerrar}>
          ✕
        </button>

        <h2>Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">Usuario o Email</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Ingresa tu usuario o email"
              disabled={loading}
              autoComplete="username"
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
              placeholder="Ingresa tu contraseña"
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            ¿No tienes cuenta?{' '}
            <button className="btn-link" onClick={onRegistro}>
              Regístrate aquí
            </button>
          </p>
        </div>

        <div className="login-demo">
          <p><strong>Usuarios de prueba:</strong></p>
          <p>👤 Usuario: sofia / Contraseña: 12345</p>
          <p>🔧 Admin: admin / Contraseña: admin123</p>
        </div>
      </div>

      <style>{`
        .login-overlay {
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

        .login-modal {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          max-width: 400px;
          width: 90%;
          position: relative;
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

        .login-modal h2 {
          margin-bottom: 1.5rem;
          color: #333;
          text-align: center;
        }

        .login-form {
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

        .btn-login {
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

        .btn-login:hover:not(:disabled) {
          background: #ff1493;
        }

        .btn-login:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .login-footer {
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

        .login-demo {
          margin-top: 1.5rem;
          padding: 1rem;
          background: #f8f8f8;
          border-radius: 5px;
          font-size: 0.85rem;
          text-align: center;
        }

        .login-demo p {
          margin: 0.25rem 0;
        }
      `}</style>
    </div>
  );
}

export default Login;
