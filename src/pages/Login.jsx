import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTienda } from '../context/TiendaContext';
import '../styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useTienda();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Datos de prueba - en producción conectar con API real
      const usuarios = [
        { id: 1, nombre: 'Admin Principal', email: 'admin@tienda.com', contraseña: 'admin123', rol: 'admin' },
        { id: 2, nombre: 'Vendedor 1', email: 'vendedor1@tienda.com', contraseña: 'vendedor123', rol: 'vendedor' },
        { id: 3, nombre: 'Gerente', email: 'gerente@tienda.com', contraseña: 'gerente123', rol: 'gerente' }
      ];

      const usuario = usuarios.find(u => u.email === email && u.contraseña === contraseña);
      
      if (usuario) {
        login(usuario);
        navigate('/dashboard');
      } else {
        setError('Email o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error al iniciar sesión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <span className="login-icon">🏪</span>
          <h1>Tienda Manager</h1>
          <p>Gestión de Negocio</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="alert alert-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">📧 Email</label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contraseña">🔐 Contraseña</label>
            <input
              id="contraseña"
              type="password"
              placeholder="••••••••"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-login"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="login-demo">
          <p><strong>👤 Usuarios de prueba:</strong></p>
          <ul>
            <li><code>admin@tienda.com</code> / <code>admin123</code></li>
            <li><code>vendedor1@tienda.com</code> / <code>vendedor123</code></li>
            <li><code>gerente@tienda.com</code> / <code>gerente123</code></li>
          </ul>
        </div>

        <footer className="login-footer">
          <p>© 2024 Tienda Manager. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
}
