/**
 * Utilidades comunes del proyecto
 */

// ===== FORMATO DE MONEDA =====
export const formatearMoneda = (valor, moneda = 'USD', locale = 'es-ES') => {
  if (valor === null || valor === undefined) return '$0.00';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: moneda,
  }).format(valor);
};

// ===== FORMATO DE FECHA =====
export const formatearFecha = (fecha, formato = 'corta') => {
  if (!fecha) return '-';
  
  const date = new Date(fecha);
  
  if (formato === 'corta') {
    return date.toLocaleDateString('es-ES');
  } else if (formato === 'larga') {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } else if (formato === 'tiempo') {
    return date.toLocaleString('es-ES');
  }
  
  return date.toLocaleDateString('es-ES');
};

// ===== VALIDACIÓN DE EMAIL =====
export const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// ===== VALIDACIÓN DE TELÉFONO =====
export const validarTelefono = (telefono) => {
  const regex = /^[\d\s\-\+\(\)]+$/;
  return regex.test(telefono) && telefono.length >= 7;
};

// ===== GENERAR ID ÚNICO =====
export const generarID = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// ===== GENERAR NÚMERO DE PEDIDO =====
export const generarNumeroPedido = () => {
  const fecha = new Date();
  const numero = Math.floor(Math.random() * 999999);
  return `PED-${fecha.getFullYear()}${String(fecha.getMonth() + 1).padStart(2, '0')}${String(numero).padStart(6, '0')}`;
};

// ===== GENERAR NÚMERO DE FACTURA =====
export const generarNumeroFactura = () => {
  const fecha = new Date();
  const numero = Math.floor(Math.random() * 999999);
  return `FAC-${fecha.getFullYear()}${String(fecha.getMonth() + 1).padStart(2, '0')}${String(numero).padStart(6, '0')}`;
};

// ===== TRUNCAR TEXTO =====
export const truncarTexto = (texto, longitud = 50) => {
  if (!texto) return '';
  return texto.length > longitud ? texto.substring(0, longitud) + '...' : texto;
};

// ===== CAPITALIZAR =====
export const capitalizar = (texto) => {
  if (!texto) return '';
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
};

// ===== SLUG (URL-FRIENDLY) =====
export const generarSlug = (texto) => {
  return texto
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// ===== CALCULAR PORCENTAJE =====
export const calcularPorcentaje = (valor, total) => {
  if (total === 0) return 0;
  return ((valor / total) * 100).toFixed(2);
};

// ===== CALCULAR DESCUENTO =====
export const calcularDescuento = (precio, porcentaje) => {
  return precio - (precio * (porcentaje / 100));
};

// ===== CALCULAR IMPUESTO =====
export const calcularImpuesto = (monto, porcentaje = 16) => {
  return monto * (porcentaje / 100);
};

// ===== TOTAL CON IMPUESTOS =====
export const calcularTotal = (subtotal, impuesto = 0, descuento = 0) => {
  return subtotal + impuesto - descuento;
};

// ===== VALIDAR STOCK =====
export const validarStock = (stock, cantidad) => {
  return stock >= cantidad;
};

// ===== ESTADO DE STOCK =====
export const obtenerEstadoStock = (stock, minimo) => {
  if (stock <= 0) return 'agotado';
  if (stock <= minimo) return 'bajo';
  return 'disponible';
};

// ===== ORDENAR ARRAY =====
export const ordenar = (array, propiedad, direccion = 'asc') => {
  return [...array].sort((a, b) => {
    const aVal = a[propiedad];
    const bVal = b[propiedad];
    
    if (aVal < bVal) return direccion === 'asc' ? -1 : 1;
    if (aVal > bVal) return direccion === 'asc' ? 1 : -1;
    return 0;
  });
};

// ===== FILTRAR ARRAY =====
export const filtrar = (array, criterio, valor) => {
  return array.filter(item => 
    String(item[criterio]).toLowerCase().includes(String(valor).toLowerCase())
  );
};

// ===== AGRUPAR ARRAY =====
export const agrupar = (array, propiedad) => {
  return array.reduce((grupos, item) => {
    const grupo = item[propiedad];
    if (!grupos[grupo]) grupos[grupo] = [];
    grupos[grupo].push(item);
    return grupos;
  }, {});
};

// ===== REMOVER DUPLICADOS =====
export const removerDuplicados = (array, propiedad) => {
  const vistos = new Set();
  return array.filter(item => {
    const valor = item[propiedad];
    if (vistos.has(valor)) return false;
    vistos.add(valor);
    return true;
  });
};

// ===== ESPERAR TIEMPO =====
export const esperar = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// ===== COPIAR AL PORTAPAPELES =====
export const copiarAlPortapapeles = async (texto) => {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch (err) {
    console.error('Error al copiar:', err);
    return false;
  }
};

// ===== DESCARGAR ARCHIVO =====
export const descargarArchivo = (contenido, nombre, tipo = 'text/plain') => {
  const blob = new Blob([contenido], { type: tipo });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = nombre;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// ===== OBTENER PARÁMETRO DE URL =====
export const obtenerParametroURL = (nombre) => {
  const params = new URLSearchParams(window.location.search);
  return params.get(nombre);
};

// ===== VALIDACIÓN DE CONTRASEÑA =====
export const validarContraseña = (contraseña) => {
  // Mínimo 8 caracteres, mayúscula, minúscula, número
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(contraseña);
};

// ===== FORTALEZA DE CONTRASEÑA =====
export const fortalezaContraseña = (contraseña) => {
  let fortaleza = 0;
  
  if (contraseña.length >= 8) fortaleza++;
  if (contraseña.length >= 12) fortaleza++;
  if (/[a-z]/.test(contraseña)) fortaleza++;
  if (/[A-Z]/.test(contraseña)) fortaleza++;
  if (/\d/.test(contraseña)) fortaleza++;
  if (/[!@#$%^&*]/.test(contraseña)) fortaleza++;
  
  if (fortaleza <= 2) return { nivel: 'débil', color: '#f44336' };
  if (fortaleza <= 4) return { nivel: 'media', color: '#ff9800' };
  return { nivel: 'fuerte', color: '#4caf50' };
};

// ===== DEBOUNCE =====
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// ===== THROTTLE =====
export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export default {
  formatearMoneda,
  formatearFecha,
  validarEmail,
  validarTelefono,
  generarID,
  generarNumeroPedido,
  generarNumeroFactura,
  truncarTexto,
  capitalizar,
  generarSlug,
  calcularPorcentaje,
  calcularDescuento,
  calcularImpuesto,
  calcularTotal,
  validarStock,
  obtenerEstadoStock,
  ordenar,
  filtrar,
  agrupar,
  removerDuplicados,
  esperar,
  copiarAlPortapapeles,
  descargarArchivo,
  obtenerParametroURL,
  validarContraseña,
  fortalezaContraseña,
  debounce,
  throttle
};
