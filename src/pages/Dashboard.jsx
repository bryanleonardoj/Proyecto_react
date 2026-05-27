import { useTienda } from '../context/TiendaContext';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const { usuario, pedidos, clientes, productos, facturas } = useTienda();

  // Calcular KPIs
  const totalVentas = facturas.reduce((sum, f) => sum + (f.total || 0), 0);
  const totalPedidos = pedidos.length;
  const pedidosPendientes = pedidos.filter(p => p.estado === 'pendiente').length;
  const productosStock = productos.filter(p => (p.stock || 0) > 0).length;

  // Estadísticas por estado de pedidos
  const estadoPedidos = {
    pendiente: pedidos.filter(p => p.estado === 'pendiente').length,
    confirmado: pedidos.filter(p => p.estado === 'confirmado').length,
    enviado: pedidos.filter(p => p.estado === 'enviado').length,
    entregado: pedidos.filter(p => p.estado === 'entregado').length,
  };

  return (
    <div className="dashboard">
      {/* Encabezado */}
      <header className="dashboard-header">
        <div>
          <h1>📊 Dashboard</h1>
          <p>Bienvenido, {usuario?.nombre || 'Usuario'}</p>
        </div>
        <div className="header-date">
          {new Date().toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </header>

      {/* KPIs - Cards principales */}
      <section className="kpis">
        <div className="kpi-card kpi-ventas">
          <div className="kpi-icon">💰</div>
          <div className="kpi-content">
            <h3>Ventas Totales</h3>
            <p className="kpi-value">${totalVentas.toFixed(2)}</p>
            <span className="kpi-label">En facturas</span>
          </div>
        </div>

        <div className="kpi-card kpi-pedidos">
          <div className="kpi-icon">🛒</div>
          <div className="kpi-content">
            <h3>Pedidos</h3>
            <p className="kpi-value">{totalPedidos}</p>
            <span className="kpi-label">{pedidosPendientes} pendientes</span>
          </div>
        </div>

        <div className="kpi-card kpi-clientes">
          <div className="kpi-icon">👥</div>
          <div className="kpi-content">
            <h3>Clientes</h3>
            <p className="kpi-value">{clientes.length}</p>
            <span className="kpi-label">Registrados</span>
          </div>
        </div>

        <div className="kpi-card kpi-productos">
          <div className="kpi-icon">📦</div>
          <div className="kpi-content">
            <h3>Productos</h3>
            <p className="kpi-value">{productosStock}/{productos.length}</p>
            <span className="kpi-label">Con stock disponible</span>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <div className="dashboard-content">
        {/* Columna izquierda */}
        <div className="left-column">
          {/* Estado de Pedidos */}
          <div className="card">
            <div className="card-header">
              <h2>📋 Estado de Pedidos</h2>
            </div>
            <div className="card-body">
              <div className="estado-chart">
                <div className="estado-item">
                  <span className="estado-label">Pendientes</span>
                  <div className="estado-bar">
                    <div 
                      className="estado-fill pending" 
                      style={{width: `${(estadoPedidos.pendiente / totalPedidos) * 100 || 0}%`}}
                    >
                      {estadoPedidos.pendiente}
                    </div>
                  </div>
                </div>
                <div className="estado-item">
                  <span className="estado-label">Confirmados</span>
                  <div className="estado-bar">
                    <div 
                      className="estado-fill confirmed" 
                      style={{width: `${(estadoPedidos.confirmado / totalPedidos) * 100 || 0}%`}}
                    >
                      {estadoPedidos.confirmado}
                    </div>
                  </div>
                </div>
                <div className="estado-item">
                  <span className="estado-label">Enviados</span>
                  <div className="estado-bar">
                    <div 
                      className="estado-fill shipped" 
                      style={{width: `${(estadoPedidos.enviado / totalPedidos) * 100 || 0}%`}}
                    >
                      {estadoPedidos.enviado}
                    </div>
                  </div>
                </div>
                <div className="estado-item">
                  <span className="estado-label">Entregados</span>
                  <div className="estado-bar">
                    <div 
                      className="estado-fill delivered" 
                      style={{width: `${(estadoPedidos.entregado / totalPedidos) * 100 || 0}%`}}
                    >
                      {estadoPedidos.entregado}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Últimos Pedidos */}
          <div className="card">
            <div className="card-header">
              <h2>🆕 Últimos Pedidos</h2>
            </div>
            <div className="card-body">
              {pedidos.length === 0 ? (
                <p className="empty-state">No hay pedidos registrados</p>
              ) : (
                <div className="table-responsive">
                  <table className="mini-table">
                    <thead>
                      <tr>
                        <th>Número</th>
                        <th>Cliente</th>
                        <th>Total</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pedidos.slice(0, 5).map((pedido) => (
                        <tr key={pedido.id}>
                          <td className="font-mono">{pedido.numeroPedido}</td>
                          <td>{pedido.clienteNombre}</td>
                          <td className="text-right">${pedido.total?.toFixed(2) || '0.00'}</td>
                          <td>
                            <span className={`badge badge-${pedido.estado}`}>
                              {pedido.estado}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="right-column">
          {/* Accesos Rápidos */}
          <div className="card">
            <div className="card-header">
              <h2>⚡ Accesos Rápidos</h2>
            </div>
            <div className="card-body">
              <div className="quick-actions">
                <a href="/pedidos/nuevo" className="quick-action-btn nuevo-pedido">
                  <span className="action-icon">➕</span>
                  <span>Nuevo Pedido</span>
                </a>
                <a href="/clientes/nuevo" className="quick-action-btn nuevo-cliente">
                  <span className="action-icon">👤</span>
                  <span>Nuevo Cliente</span>
                </a>
                <a href="/productos/nuevo" className="quick-action-btn nuevo-producto">
                  <span className="action-icon">📦</span>
                  <span>Nuevo Producto</span>
                </a>
                <a href="/reportes/ventas" className="quick-action-btn reportes">
                  <span className="action-icon">📊</span>
                  <span>Reportes</span>
                </a>
              </div>
            </div>
          </div>

          {/* Actividad Reciente */}
          <div className="card">
            <div className="card-header">
              <h2>🔔 Alertas</h2>
            </div>
            <div className="card-body">
              <div className="alerts-list">
                {pedidosPendientes > 0 && (
                  <div className="alert-item alert-warning">
                    <span className="alert-icon">⚠️</span>
                    <span>{pedidosPendientes} pedidos pendientes</span>
                  </div>
                )}
                {productos.filter(p => (p.stock || 0) < 10).length > 0 && (
                  <div className="alert-item alert-info">
                    <span className="alert-icon">📦</span>
                    <span>{productos.filter(p => (p.stock || 0) < 10).length} productos con stock bajo</span>
                  </div>
                )}
                {facturas.filter(f => f.estadoPago === 'pendiente').length > 0 && (
                  <div className="alert-item alert-danger">
                    <span className="alert-icon">💳</span>
                    <span>{facturas.filter(f => f.estadoPago === 'pendiente').length} facturas pendientes de pago</span>
                  </div>
                )}
                {pedidosPendientes === 0 && 
                 productos.filter(p => (p.stock || 0) < 10).length === 0 &&
                 facturas.filter(f => f.estadoPago === 'pendiente').length === 0 && (
                  <div className="alert-item alert-success">
                    <span className="alert-icon">✅</span>
                    <span>¡Todo está bajo control!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
