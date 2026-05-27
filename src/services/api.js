import axios from 'axios';

const API_BASE_URL = 'http://localhost/tienda-api'; // Cambiar según tu configuración

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para agregar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ===== CLIENTES =====
export const clientesAPI = {
  obtenerTodos: () => api.get('/clientes'),
  obtenerPorId: (id) => api.get(`/clientes/${id}`),
  crear: (datos) => api.post('/clientes', datos),
  actualizar: (id, datos) => api.put(`/clientes/${id}`, datos),
  eliminar: (id) => api.delete(`/clientes/${id}`),
  buscar: (query) => api.get('/clientes/buscar', { params: { q: query } }),
  historialCompras: (id) => api.get(`/clientes/${id}/historial`)
};

// ===== PRODUCTOS =====
export const productosAPI = {
  obtenerTodos: () => api.get('/productos'),
  obtenerPorId: (id) => api.get(`/productos/${id}`),
  crear: (datos) => api.post('/productos', datos),
  actualizar: (id, datos) => api.put(`/productos/${id}`, datos),
  eliminar: (id) => api.delete(`/productos/${id}`),
  buscar: (query) => api.get('/productos/buscar', { params: { q: query } }),
  obtenerPorCategoria: (categoria) => api.get(`/productos/categoria/${categoria}`),
  bajoStock: () => api.get('/productos/stock/bajo')
};

// ===== CATEGORÍAS =====
export const categoriasAPI = {
  obtenerTodas: () => api.get('/categorias'),
  crear: (datos) => api.post('/categorias', datos),
  actualizar: (id, datos) => api.put(`/categorias/${id}`, datos),
  eliminar: (id) => api.delete(`/categorias/${id}`)
};

// ===== PROVEEDORES =====
export const proveedoresAPI = {
  obtenerTodos: () => api.get('/proveedores'),
  obtenerPorId: (id) => api.get(`/proveedores/${id}`),
  crear: (datos) => api.post('/proveedores', datos),
  actualizar: (id, datos) => api.put(`/proveedores/${id}`, datos),
  eliminar: (id) => api.delete(`/proveedores/${id}`)
};

// ===== PEDIDOS =====
export const pedidosAPI = {
  obtenerTodos: () => api.get('/pedidos'),
  obtenerPorId: (id) => api.get(`/pedidos/${id}`),
  crear: (datos) => api.post('/pedidos', datos),
  actualizar: (id, datos) => api.put(`/pedidos/${id}`, datos),
  cambiarEstado: (id, estado) => api.patch(`/pedidos/${id}/estado`, { estado }),
  cancelar: (id) => api.patch(`/pedidos/${id}/cancelar`),
  obtenerPorCliente: (clienteId) => api.get(`/pedidos/cliente/${clienteId}`),
  obtenerPorEstado: (estado) => api.get(`/pedidos/estado/${estado}`)
};

// ===== FACTURAS =====
export const facturasAPI = {
  obtenerTodas: () => api.get('/facturas'),
  obtenerPorId: (id) => api.get(`/facturas/${id}`),
  generar: (pedidoId) => api.post(`/facturas/generar/${pedidoId}`),
  actualizar: (id, datos) => api.put(`/facturas/${id}`, datos),
  obtenerPDF: (id) => api.get(`/facturas/${id}/pdf`, { responseType: 'blob' }),
  cambiarEstadoPago: (id, estado) => api.patch(`/facturas/${id}/pago`, { estado })
};

// ===== PAGOS =====
export const pagosAPI = {
  obtenerTodos: () => api.get('/pagos'),
  registrar: (datos) => api.post('/pagos', datos),
  obtenerPorFactura: (facturaId) => api.get(`/pagos/factura/${facturaId}`)
};

// ===== INVENTARIO / MOVIMIENTOS =====
export const inventarioAPI = {
  obtenerMovimientos: () => api.get('/movimientos-inventario'),
  registrarMovimiento: (datos) => api.post('/movimientos-inventario', datos),
  obtenerMovimientosPorProducto: (productoId) => api.get(`/movimientos-inventario/producto/${productoId}`),
  obtenerResumenStock: () => api.get('/inventario/resumen'),
  ajusteStock: (productoId, cantidad, razon) => api.post(`/inventario/ajuste/${productoId}`, { cantidad, razon })
};

// ===== DEVOLUCIONES =====
export const devolucionesAPI = {
  obtenerTodas: () => api.get('/devoluciones'),
  obtenerPorId: (id) => api.get(`/devoluciones/${id}`),
  crear: (datos) => api.post('/devoluciones', datos),
  cambiarEstado: (id, estado) => api.patch(`/devoluciones/${id}/estado`, { estado })
};

// ===== REPORTES =====
export const reportesAPI = {
  ventasDiarias: (fecha) => api.get('/reportes/ventas-diarias', { params: { fecha } }),
  ventasMensuales: (mes, año) => api.get('/reportes/ventas-mensuales', { params: { mes, año } }),
  productosMasVendidos: () => api.get('/reportes/productos-mas-vendidos'),
  clientesMasCompras: () => api.get('/reportes/clientes-mas-compras'),
  ingresos: (desde, hasta) => api.get('/reportes/ingresos', { params: { desde, hasta } }),
  pendientesDeEntrega: () => api.get('/reportes/pendientes-entrega'),
  cuentasPorCobrar: () => api.get('/reportes/cuentas-cobrar')
};

// ===== AUTENTICACIÓN =====
export const authAPI = {
  login: (email, contraseña) => api.post('/auth/login', { email, contraseña }),
  logout: () => api.post('/auth/logout'),
  obtenerUsuarioActual: () => api.get('/auth/usuario-actual'),
  cambiarContraseña: (contraseñaAnterior, contraseñaNueva) => 
    api.post('/auth/cambiar-contraseña', { contraseñaAnterior, contraseñaNueva })
};

// ===== DASHBOARD =====
export const dashboardAPI = {
  obtenerEstadisticas: () => api.get('/dashboard/estadisticas'),
  obtenerKPIs: () => api.get('/dashboard/kpis'),
  obtenerGraficoVentas: (periodo) => api.get('/dashboard/grafico-ventas', { params: { periodo } })
};

export default api;
