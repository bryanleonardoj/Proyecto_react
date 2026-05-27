import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTienda } from './context/TiendaContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const { usuario } = useTienda();

  return (
    <Router>
      {usuario && <Navbar />}
      <Routes>
        <Route 
          path="/login" 
          element={!usuario ? <Login /> : <Navigate to="/dashboard" />} 
        />
        <Route 
          path="/dashboard" 
          element={usuario ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/" 
          element={usuario ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
        />
        {/* Rutas futuras */}
        <Route path="/clientes" element={usuario ? <div className="page">👥 Clientes (Por implementar)</div> : <Navigate to="/login" />} />
        <Route path="/clientes/nuevo" element={usuario ? <div className="page">➕ Nuevo Cliente (Por implementar)</div> : <Navigate to="/login" />} />
        <Route path="/productos" element={usuario ? <div className="page">📦 Productos (Por implementar)</div> : <Navigate to="/login" />} />
        <Route path="/productos/nuevo" element={usuario ? <div className="page">➕ Nuevo Producto (Por implementar)</div> : <Navigate to="/login" />} />
        <Route path="/categorias" element={usuario ? <div className="page">📁 Categorías (Por implementar)</div> : <Navigate to="/login" />} />
        <Route path="/proveedores" element={usuario ? <div className="page">🏭 Proveedores (Por implementar)</div> : <Navigate to="/login" />} />
        <Route path="/pedidos" element={usuario ? <div className="page">🛒 Pedidos (Por implementar)</div> : <Navigate to="/login" />} />
        <Route path="/pedidos/nuevo" element={usuario ? <div className="page">➕ Nuevo Pedido (Por implementar)</div> : <Navigate to="/login" />} />
        <Route path="/facturas" element={usuario ? <div className="page">💼 Facturas (Por implementar)</div> : <Navigate to="/login" />} />
        <Route path="/reportes/ventas" element={usuario ? <div className="page">📊 Reportes de Ventas (Por implementar)</div> : <Navigate to="/login" />} />
        <Route path="/reportes/productos" element={usuario ? <div className="page">📊 Reportes de Productos (Por implementar)</div> : <Navigate to="/login" />} />
        <Route path="/reportes/clientes" element={usuario ? <div className="page">📊 Reportes de Clientes (Por implementar)</div> : <Navigate to="/login" />} />
        <Route path="/reportes/inventario" element={usuario ? <div className="page">📊 Reportes de Inventario (Por implementar)</div> : <Navigate to="/login" />} />
        <Route path="/configuracion" element={usuario ? <div className="page">⚙️ Configuración (Por implementar)</div> : <Navigate to="/login" />} />
        <Route path="/configuracion/perfil" element={usuario ? <div className="page">👤 Mi Perfil (Por implementar)</div> : <Navigate to="/login" />} />
        <Route path="/configuracion/usuarios" element={usuario ? <div className="page">👥 Usuarios (Por implementar)</div> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
