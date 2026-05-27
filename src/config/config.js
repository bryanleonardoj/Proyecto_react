/**
 * Configuración Global de la Aplicación
 * Tienda Manager
 */

// ===== VARIABLES DE ENTORNO =====
export const CONFIG = {
  // API
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  API_TIMEOUT: 30000,

  // Aplicación
  APP_NAME: 'Tienda Manager',
  APP_VERSION: '1.0.0',
  APP_ENVIRONMENT: import.meta.env.MODE, // 'development' o 'production'

  // Moneda
  MONEDA: 'USD',
  LOCALE: 'es-ES',

  // Impuestos
  IMPUESTO_DEFECTO: 16, // 16% IVA

  // Límites
  ITEMS_POR_PAGINA: 10,
  CARACTERES_MIN_BUSQUEDA: 2,
  MAX_RESULTADOS_BUSQUEDA: 50,

  // Roles
  ROLES: {
    ADMIN: 'admin',
    GERENTE: 'gerente',
    VENDEDOR: 'vendedor'
  },

  // Permisos por rol
  PERMISOS: {
    admin: [
      'ver_dashboard',
      'gestionar_usuarios',
      'gestionar_configuracion',
      'ver_reportes',
      'gestionar_clientes',
      'gestionar_productos',
      'gestionar_pedidos'
    ],
    gerente: [
      'ver_dashboard',
      'ver_reportes',
      'gestionar_clientes',
      'gestionar_productos',
      'gestionar_pedidos',
      'gestionar_pagos'
    ],
    vendedor: [
      'ver_dashboard',
      'gestionar_clientes',
      'ver_productos',
      'gestionar_pedidos',
      'gestionar_pagos'
    ]
  },

  // Estados de pedido
  ESTADOS_PEDIDO: [
    { valor: 'pendiente', etiqueta: 'Pendiente', color: '#ff9800' },
    { valor: 'confirmado', etiqueta: 'Confirmado', color: '#2196f3' },
    { valor: 'preparando', etiqueta: 'Preparando', color: '#9c27b0' },
    { valor: 'enviado', etiqueta: 'Enviado', color: '#673ab7' },
    { valor: 'entregado', etiqueta: 'Entregado', color: '#4caf50' },
    { valor: 'cancelado', etiqueta: 'Cancelado', color: '#f44336' }
  ],

  // Métodos de pago
  METODOS_PAGO: [
    { valor: 'efectivo', etiqueta: 'Efectivo' },
    { valor: 'tarjeta', etiqueta: 'Tarjeta de Crédito' },
    { valor: 'transferencia', etiqueta: 'Transferencia Bancaria' },
    { valor: 'cheque', etiqueta: 'Cheque' },
    { valor: 'credito', etiqueta: 'Crédito' }
  ],

  // Tipos de cliente
  TIPOS_CLIENTE: [
    { valor: 'consumidor', etiqueta: 'Consumidor Final' },
    { valor: 'minorista', etiqueta: 'Minorista' },
    { valor: 'mayorista', etiqueta: 'Mayorista' }
  ],

  // Unidades de medida
  UNIDADES_MEDIDA: [
    'unidad',
    'kg',
    'litro',
    'metro',
    'caja',
    'docena',
    'gramo',
    'mililitro'
  ],

  // Validaciones
  VALIDACIONES: {
    NOMBRE_MIN: 3,
    NOMBRE_MAX: 100,
    EMAIL_MAX: 100,
    TELEFONO_MIN: 7,
    CONTRASEÑA_MIN: 8,
    DESCRIPCION_MAX: 500
  },

  // Duración de notificaciones (ms)
  NOTIFICACION_DURACION: 3000,

  // Debounce de búsqueda (ms)
  DEBOUNCE_BUSQUEDA: 300,

  // Almacenamiento local
  STORAGE_KEYS: {
    USUARIO: 'tienda_usuario',
    TOKEN: 'tienda_token',
    CARRITO: 'tienda_carrito',
    PREFERENCIAS: 'tienda_preferencias'
  },

  // Colores del tema
  COLORES: {
    PRIMARY: '#667eea',
    SECONDARY: '#764ba2',
    SUCCESS: '#4caf50',
    DANGER: '#f44336',
    WARNING: '#ff9800',
    INFO: '#2196f3',
    LIGHT: '#f5f7fa',
    DARK: '#333333',
    BORDER: '#e0e0e0'
  },

  // Mensajes
  MENSAJES: {
    CARGANDO: '⏳ Cargando...',
    SIN_DATOS: '📭 No hay datos disponibles',
    ERROR_CONEXION: '❌ Error de conexión. Intenta de nuevo.',
    OPERACION_EXITOSA: '✅ Operación completada',
    OPERACION_ERROR: '❌ Error en la operación',
    GUARDAR_EXITOSO: '✅ Guardado correctamente',
    ELIMINAR_EXITOSO: '✅ Eliminado correctamente',
    ELIMINAR_CONFIRMAR: '¿Estás seguro? No podrás deshacer esta acción.',
    CAMPO_REQUERIDO: 'Este campo es requerido',
    EMAIL_INVALIDO: 'Email inválido',
    CONTRASEÑA_CORTA: 'La contraseña debe tener mínimo 8 caracteres'
  }
};

// ===== FUNCIONES DE CONFIGURACIÓN =====

/**
 * Obtener etiqueta de estado
 */
export const obtenerEtiquetaEstado = (estado) => {
  const item = CONFIG.ESTADOS_PEDIDO.find(e => e.valor === estado);
  return item?.etiqueta || estado;
};

/**
 * Obtener color de estado
 */
export const obtenerColorEstado = (estado) => {
  const item = CONFIG.ESTADOS_PEDIDO.find(e => e.valor === estado);
  return item?.color || '#999';
};

/**
 * Verificar si usuario tiene permiso
 */
export const tienePermiso = (rol, permiso) => {
  return CONFIG.PERMISOS[rol]?.includes(permiso) || false;
};

/**
 * Obtener lista de permisos del rol
 */
export const obtenerPermisos = (rol) => {
  return CONFIG.PERMISOS[rol] || [];
};

/**
 * Cambiar configuración en tiempo de ejecución
 */
export const actualizarConfig = (nuevaConfig) => {
  Object.assign(CONFIG, nuevaConfig);
};

/**
 * Obtener valor de configuración
 */
export const obtenerConfig = (ruta) => {
  const partes = ruta.split('.');
  let valor = CONFIG;
  
  for (const parte of partes) {
    valor = valor[parte];
    if (valor === undefined) return null;
  }
  
  return valor;
};

export default CONFIG;
