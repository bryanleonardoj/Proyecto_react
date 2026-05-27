import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTienda } from '../context/TiendaContext';
import '../styles/Navbar.css';

export default function Navbar() {
  const { usuario, logout } = useTienda();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  if (!usuario) return null;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/dashboard" className="navbar-logo">
          <span className="logo-icon">🏪</span>
          Tienda Manager
        </Link>

        {/* Menú Principal */}
        <ul className="navbar-menu">
          <li>
            <Link 
              to="/dashboard" 
              className={`nav-link ${isActive('/dashboard')}`}
            >
              📊 Dashboard
            </Link>
          </li>

          <li className="nav-dropdown">
            <span className="nav-link">👥 Clientes</span>
            <div className="dropdown-menu">
              <Link to="/clientes">Ver Clientes</Link>
              <Link to="/clientes/nuevo">Nuevo Cliente</Link>
            </div>
          </li>

          <li className="nav-dropdown">
            <span className="nav-link">📦 Productos</span>
            <div className="dropdown-menu">
              <Link to="/productos">Ver Productos</Link>
              <Link to="/productos/nuevo">Nuevo Producto</Link>
              <Link to="/categorias">Categorías</Link>
              <Link to="/proveedores">Proveedores</Link>
            </div>
          </li>

          <li className="nav-dropdown">
            <span className="nav-link">🛒 Ventas</span>
            <div className="dropdown-menu">
              <Link to="/pedidos">Ver Pedidos</Link>
              <Link to="/pedidos/nuevo">Nuevo Pedido</Link>
              <Link to="/facturas">Facturas</Link>
            </div>
          </li>

          <li className="nav-dropdown">
            <span className="nav-link">📊 Reportes</span>
            <div className="dropdown-menu">
              <Link to="/reportes/ventas">Ventas</Link>
              <Link to="/reportes/productos">Productos</Link>
              <Link to="/reportes/clientes">Clientes</Link>
              <Link to="/reportes/inventario">Inventario</Link>
            </div>
          </li>

          <li className="nav-dropdown">
            <span className="nav-link">⚙️ Configuración</span>
            <div className="dropdown-menu">
              <Link to="/configuracion/perfil">Mi Perfil</Link>
              <Link to="/configuracion/usuarios">Usuarios</Link>
              <Link to="/configuracion">Configuración</Link>
            </div>
          </li>
        </ul>

        {/* Usuario y Logout */}
        <div className="navbar-user">
          <span className="user-name">
            👤 {usuario?.nombre || 'Usuario'}
          </span>
          <button onClick={handleLogout} className="btn-logout">
            Salir
          </button>
        </div>
      </div>
    </nav>
  );
}
