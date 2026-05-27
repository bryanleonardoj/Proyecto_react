import { createContext, useContext, useState, useCallback } from 'react';

const TiendaContext = createContext();

export const TiendaProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [facturas, setFacturas] = useState([]);
  const [inventario, setInventario] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Funciones de Clientes
  const agregarCliente = useCallback((cliente) => {
    setClientes(prev => [...prev, { ...cliente, id: Date.now() }]);
  }, []);

  const actualizarCliente = useCallback((id, clienteActualizado) => {
    setClientes(prev => prev.map(c => c.id === id ? { ...c, ...clienteActualizado } : c));
  }, []);

  const eliminarCliente = useCallback((id) => {
    setClientes(prev => prev.filter(c => c.id !== id));
  }, []);

  // Funciones de Productos
  const agregarProducto = useCallback((producto) => {
    setProductos(prev => [...prev, { ...producto, id: Date.now() }]);
  }, []);

  const actualizarProducto = useCallback((id, productoActualizado) => {
    setProductos(prev => prev.map(p => p.id === id ? { ...p, ...productoActualizado } : p));
  }, []);

  const eliminarProducto = useCallback((id) => {
    setProductos(prev => prev.filter(p => p.id !== id));
  }, []);

  // Funciones de Pedidos
  const crearPedido = useCallback((pedido) => {
    const nuevoPedido = {
      ...pedido,
      id: Date.now(),
      numeroPedido: `PED-${Date.now()}`,
      fecha: new Date(),
      estado: 'pendiente'
    };
    setPedidos(prev => [...prev, nuevoPedido]);
    return nuevoPedido;
  }, []);

  const actualizarPedido = useCallback((id, pedidoActualizado) => {
    setPedidos(prev => prev.map(p => p.id === id ? { ...p, ...pedidoActualizado } : p));
  }, []);

  const cancelarPedido = useCallback((id) => {
    actualizarPedido(id, { estado: 'cancelado' });
  }, [actualizarPedido]);

  // Funciones de Facturas
  const generarFactura = useCallback((pedidoId) => {
    const pedido = pedidos.find(p => p.id === pedidoId);
    if (pedido) {
      const facturaData = {
        ...pedido,
        id: Date.now(),
        numeroFactura: `FAC-${Date.now()}`,
        estadoPago: 'pendiente'
      };
      setFacturas(prev => [...prev, facturaData]);
      return facturaData;
    }
  }, [pedidos]);

  // Funciones de Inventario
  const actualizarStock = useCallback((productoId, cantidad) => {
    setProductos(prev => prev.map(p => 
      p.id === productoId ? { ...p, stock: (p.stock || 0) + cantidad } : p
    ));
  }, []);

  // Login
  const login = useCallback((usuarioData) => {
    setUsuario(usuarioData);
    localStorage.setItem('usuario', JSON.stringify(usuarioData));
  }, []);

  const logout = useCallback(() => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  }, []);

  const value = {
    // Estado
    usuario,
    clientes,
    productos,
    pedidos,
    facturas,
    inventario,
    loading,
    error,

    // Clientes
    agregarCliente,
    actualizarCliente,
    eliminarCliente,

    // Productos
    agregarProducto,
    actualizarProducto,
    eliminarProducto,

    // Pedidos
    crearPedido,
    actualizarPedido,
    cancelarPedido,

    // Facturas
    generarFactura,

    // Inventario
    actualizarStock,

    // Autenticación
    login,
    logout,

    // Utilidades
    setLoading,
    setError
  };

  return (
    <TiendaContext.Provider value={value}>
      {children}
    </TiendaContext.Provider>
  );
};

export const useTienda = () => {
  const context = useContext(TiendaContext);
  if (!context) {
    throw new Error('useTienda debe usarse dentro de TiendaProvider');
  }
  return context;
};
