# 📚 GUÍA DE DESARROLLO - Tienda Manager

Guía completa para implementar los módulos faltantes.

---

## 🎯 Fases de Desarrollo

### Fase 1: Backend (API REST) ✅
Crea la API en `C:\xampp\htdocs\tienda-api` o con Node.js

#### Estructura mínima (PHP):
```php
// htdocs/tienda-api/index.php
<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($method === 'GET') {
    // GET /api/clientes
    if (strpos($path, '/clientes') !== false) {
        $clientes = []; // Consultar BD
        echo json_encode($clientes);
    }
}
?>
```

**Mejora: Usa Node.js con Express**
```bash
npm install express cors mysql2/promise
```

---

### Fase 2: CRUD de Clientes 🔄

#### 1. Crear página Clientes.jsx
```jsx
// src/pages/Clientes.jsx
import { useState, useEffect } from 'react';
import { useTienda } from '../context/TiendaContext';
import { clientesAPI } from '../services/api';
import Button from '../components/Button';
import '../styles/Clientes.css';

export default function Clientes() {
  const { clientes, agregarCliente } = useTienda();
  const [busqueda, setBusqueda] = useState('');
  const [filtrado, setFiltrado] = useState([]);

  useEffect(() => {
    // Cargar clientes desde API
    clientesAPI.obtenerTodos()
      .then(res => {
        // Actualizar estado
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    setFiltrado(
      clientes.filter(c => 
        c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.email.toLowerCase().includes(busqueda.toLowerCase())
      )
    );
  }, [clientes, busqueda]);

  return (
    <div className="page">
      <div className="page-header">
        <h1>👥 Gestión de Clientes</h1>
        <Button variant="primary">Nuevo Cliente</Button>
      </div>

      {/* Buscador */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Tabla */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Ciudad</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrado.map(cliente => (
              <tr key={cliente.id}>
                <td>{cliente.nombre}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.ciudad}</td>
                <td>
                  <span className={`badge badge-${cliente.tipo_cliente}`}>
                    {cliente.tipo_cliente}
                  </span>
                </td>
                <td>
                  <Button size="sm" variant="secondary">Editar</Button>
                  <Button size="sm" variant="danger">Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

#### 2. Crear componente FormCliente
```jsx
// src/components/FormCliente.jsx
import FormInput from './FormInput';
import Button from './Button';

export default function FormCliente({ cliente, onSubmit }) {
  const [formData, setFormData] = useState(cliente || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        label="Nombre"
        name="nombre"
        value={formData.nombre || ''}
        onChange={handleChange}
        required
      />
      <FormInput
        label="Email"
        type="email"
        name="email"
        value={formData.email || ''}
        onChange={handleChange}
      />
      <FormInput
        label="Teléfono"
        name="telefono"
        value={formData.telefono || ''}
        onChange={handleChange}
      />
      {/* Más campos... */}
      <Button type="submit" variant="primary">Guardar</Button>
    </form>
  );
}
```

#### 3. Agregar rutas en App.jsx
```jsx
<Route path="/clientes" element={<Clientes />} />
<Route path="/clientes/nuevo" element={<NuevoCliente />} />
<Route path="/clientes/:id" element={<EditarCliente />} />
```

---

### Fase 3: CRUD de Productos 📦

Similar a Clientes, pero con:
- Categorías
- Proveedores
- Stock
- Alertas de bajo stock

```jsx
// src/pages/Productos.jsx
// Estructura similar a Clientes
// Campos adicionales: categoría, stock, precio, proveedor
```

---

### Fase 4: Sistema de Pedidos 🛒

**Componentes:**
1. **Nuevo Pedido**
   - Seleccionar cliente
   - Agregar productos
   - Carrito
   - Calcular total
   - Aplicar descuentos

2. **Lista de Pedidos**
   - Estados (pendiente, confirmado, etc.)
   - Búsqueda y filtros
   - Cambiar estado
   - Ver detalles

```jsx
// src/pages/NuevoPedido.jsx
import { useState } from 'react';
import { useTienda } from '../context/TiendaContext';

export default function NuevoPedido() {
  const { crearPedido } = useTienda();
  const [clienteId, setClienteId] = useState('');
  const [carrito, setCarrito] = useState([]);
  const [descuento, setDescuento] = useState(0);

  const agregarProducto = (producto, cantidad) => {
    setCarrito(prev => [...prev, { ...producto, cantidad }]);
  };

  const calcularTotal = () => {
    const subtotal = carrito.reduce((sum, item) => 
      sum + (item.precio_venta * item.cantidad), 0
    );
    return subtotal - (subtotal * (descuento / 100));
  };

  const confirmarPedido = () => {
    const pedido = {
      clienteId,
      items: carrito,
      total: calcularTotal(),
      descuento
    };
    crearPedido(pedido);
  };

  return (
    <div className="page">
      {/* Formulario */}
    </div>
  );
}
```

---

### Fase 5: Facturación 💼

```jsx
// src/pages/Facturas.jsx
// Generar facturas desde pedidos
// Cambiar estado de pago
// Descargar PDF

import { facturasAPI } from '../services/api';
import { generarNumeroFactura } from '../utils/helpers';
```

---

### Fase 6: Reportes 📊

```jsx
// src/pages/Reportes.jsx
import { LineChart, BarChart, PieChart } from 'recharts';
import { reportesAPI } from '../services/api';

// Gráficos de ventas
// Productos más vendidos
// Clientes más frecuentes
// Análisis de inventario
```

---

## 🔧 Implementar una Nueva Página

### 1. Crear archivos
```
src/pages/MiPagina.jsx
src/styles/MiPagina.css
src/components/MiComponente.jsx
```

### 2. Estructura base
```jsx
import { useState, useEffect } from 'react';
import { useTienda } from '../context/TiendaContext';
import '../styles/MiPagina.css';

export default function MiPagina() {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { error } = useTienda();

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      // Cargar desde API
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="page">
      {/* Contenido */}
    </div>
  );
}
```

### 3. Agregar ruta en App.jsx
```jsx
<Route path="/mi-pagina" element={<MiPagina />} />
```

### 4. Agregar enlace en Navbar.jsx
```jsx
<li>
  <Link to="/mi-pagina">Mi Página</Link>
</li>
```

---

## 📡 API - Estructura de Respuestas

### Exitosa
```json
{
  "success": true,
  "data": { /* datos */ },
  "message": "Operación completada"
}
```

### Error
```json
{
  "success": false,
  "error": "Mensaje de error",
  "code": 400
}
```

---

## 🧪 Testing

Instala testing library:
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

```javascript
// src/components/Button.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    await userEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

---

## 🚀 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Arrastra la carpeta 'dist' a Netlify
```

### Apache/XAMPP
```
Copia la carpeta dist/ a C:\xampp\htdocs\tienda
```

---

## 📝 Checklist para Nueva Funcionalidad

- [ ] Crear componente/página
- [ ] Crear archivo CSS
- [ ] Conectar con contexto (useTienda)
- [ ] Llamar API si es necesario
- [ ] Agregar validaciones
- [ ] Agregar manejo de errores
- [ ] Probar en diferentes pantallas
- [ ] Documentar en README
- [ ] Agregar a Navbar si es página principal

---

## 🎨 Estándares de Código

### Naming Conventions
```javascript
// Componentes: PascalCase
function MiComponente() {}

// Variables/funciones: camelCase
const miVariable = 'valor';
const miFunc = () => {};

// Constantes: UPPER_SNAKE_CASE
const MI_CONSTANTE = 'valor';

// Clases CSS: kebab-case
.mi-clase { }
```

### Comentarios
```javascript
// Comentario simple
/* Comentario
   multilinea */

// ===== SECCIÓN IMPORTANTE =====
```

### Imports
```javascript
// Agrupar por tipo: React, librerías, locales
import React, { useState } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import './Styles.css';
```

---

## 🐛 Debugging

### Console
```javascript
console.log('valor:', valor);
console.table(array);
console.error('error:', error);
console.time('timer');
// ... código
console.timeEnd('timer');
```

### React DevTools
- Instala extensión en Chrome
- Inspecciona componentes
- Mira props y state

### Network
- F12 → Network
- Ver llamadas API
- Verificar respuestas

---

## 💡 Tips Útiles

1. **Usar Fragment** para no agregar divs extras
```jsx
<>
  <Header />
  <Content />
</>
```

2. **Usar optional chaining**
```jsx
cliente?.nombre  // evita error si cliente es null
```

3. **Usar nullish coalescing**
```jsx
valor ?? 'default'  // si valor es null/undefined
```

4. **Usar async/await**
```jsx
const datos = await api.obtener();
```

5. **Usar destructuring**
```jsx
const { nombre, email } = cliente;
```

---

¡Éxito con el desarrollo! 🚀
