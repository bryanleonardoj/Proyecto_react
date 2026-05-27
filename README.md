# 🏪 Tienda Manager - Sistema de Gestión de Tienda

**Sistema profesional de gestión de tienda/negocio** construido con React, Vite, MySQL y Apache/XAMPP.

![Estado](https://img.shields.io/badge/estado-desarrollo-yellow)
![React](https://img.shields.io/badge/React-19.2.6-blue)
![Vite](https://img.shields.io/badge/Vite-8.0.12-success)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)

---

## 📋 Características Principales

### ✅ Módulos Implementados
- **Dashboard** - Panel de control con KPIs y estadísticas
- **Autenticación** - Sistema de login con roles (Admin, Vendedor, Gerente)
- **Navegación** - Menú responsive con dropdowns

### 🚀 Módulos por Implementar
- **Gestión de Clientes** - Registro, edición, historial de compras
- **Gestión de Productos** - Catálogo, categorías, proveedores
- **Sistema de Pedidos** - Crear, editar, seguimiento
- **Gestión de Inventario** - Stock, movimientos, alertas
- **Facturación** - Generar facturas, PDF
- **Reportes** - Ventas, productos, clientes, inventario
- **Gestión de Pagos** - Registro, seguimiento de cuentas
- **Devoluciones** - Gestión de cambios y devoluciones

---

## 🛠️ Stack Tecnológico

```
Frontend:
  - React 19.2.6
  - React Router DOM 6.20.0
  - Axios 1.6.2 (para llamadas API)
  - Recharts 2.10.3 (gráficos)
  - Date-fns 2.30.0 (manejo de fechas)
  - Vite 8.0.12 (bundler)

Backend:
  - Apache (XAMPP)
  - PHP / Node.js (para APIs)
  - MySQL 8.0

Estilos:
  - CSS3 vanilla
  - Variables CSS
  - Responsive Design
  - Tema Light/Dark
```

---

## 📦 Estructura del Proyecto

```
proyecto_react/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   └── Navbar.jsx
│   ├── pages/              # Páginas/Rutas principales
│   │   ├── Login.jsx
│   │   └── Dashboard.jsx
│   ├── context/            # Context API para estado global
│   │   └── TiendaContext.jsx
│   ├── services/           # Servicios de API
│   │   └── api.js
│   ├── styles/             # Archivos CSS
│   │   ├── Navbar.css
│   │   ├── Login.css
│   │   └── Dashboard.css
│   ├── utils/              # Utilidades
│   ├── assets/             # Imágenes, íconos
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Punto de entrada
│   └── index.css           # Estilos globales
├── public/                 # Archivos estáticos
├── DATABASE.sql            # Script para crear BD
├── vite.config.js
├── package.json
└── README.md
```

---

## 🚀 Instalación y Configuración

### Paso 1: Clonar/Preparar el Proyecto
```bash
cd c:\Users\bryan\OneDrive\Escritorio\Front-end\Proyecto_react
```

### Paso 2: Instalar Dependencias
```bash
npm install
```

### Paso 3: Crear la Base de Datos MySQL

1. Abre **XAMPP Control Panel**
2. Inicia **Apache** y **MySQL**
3. Abre **phpMyAdmin** (http://localhost/phpmyadmin)
4. Copia el contenido de `DATABASE.sql` en la consola de SQL
5. Ejecuta el script

**O desde terminal MySQL:**
```bash
mysql -u root -p < DATABASE.sql
```

### Paso 4: Configurar API Backend

El proyecto espera una API en `http://localhost/tienda-api`

**Opción A: Crear carpeta PHP en XAMPP**
```
C:\xampp\htdocs\tienda-api\
```

Crea archivos PHP para las rutas (próximos pasos)

**Opción B: Usar Node.js/Express** (recomendado)
```bash
npm install express cors mysql2/promise
```

### Paso 5: Ejecutar Aplicación

#### Desarrollo
```bash
npm run dev
```

#### Build Producción
```bash
npm run build
```

#### Preview
```bash
npm run preview
```

---

## 🔐 Usuarios de Prueba

| Email | Contraseña | Rol |
|-------|-----------|-----|
| admin@tienda.com | admin123 | Admin |
| vendedor1@tienda.com | vendedor123 | Vendedor |
| gerente@tienda.com | gerente123 | Gerente |

---

## 📊 Base de Datos

### Tablas Principales

**Usuarios**
- Autenticación y gestión de roles

**Clientes**
- Información de clientes
- Historial de compras
- Límites de crédito

**Productos**
- Catálogo de productos
- Precio costo/venta
- Stock y alertas

**Pedidos**
- Registro de órdenes
- Estados de pedido
- Detalles de línea

**Facturas**
- Facturación
- Estado de pago
- Historial

**Inventario**
- Movimientos de stock
- Entradas/salidas
- Ajustes

**Pagos**
- Registro de pagos
- Métodos de pago
- Reconciliación

Para más detalles, ver `DATABASE.sql`

---

## 🎯 Roadmap

### Fase 1 (Actual) ✅
- [x] Estructura base con React Router
- [x] Sistema de autenticación
- [x] Dashboard con KPIs
- [x] Diseño base de componentes
- [x] Base de datos completa

### Fase 2 (Próxima) 🚀
- [ ] CRUD de Clientes
- [ ] CRUD de Productos
- [ ] Carrito de compras
- [ ] Sistema de pedidos

### Fase 3 📊
- [ ] Facturación automática
- [ ] Reportes avanzados
- [ ] Gráficos y análisis
- [ ] Exportar a PDF/Excel

### Fase 4 🔧
- [ ] Gestión de usuarios
- [ ] Configuración avanzada
- [ ] Notificaciones
- [ ] Logs y auditoría

---

## 📝 Guía de Desarrollo

### Crear una Nueva Página

1. Crea archivo en `src/pages/MiPagina.jsx`
2. Importa en `App.jsx`
3. Agrega ruta en Router

```jsx
// src/pages/Clientes.jsx
import { useTienda } from '../context/TiendaContext';

export default function Clientes() {
  const { clientes } = useTienda();
  
  return (
    <div className="page">
      {/* Tu contenido */}
    </div>
  );
}
```

### Usar el Context Global

```jsx
import { useTienda } from '../context/TiendaContext';

export default function MiComponente() {
  const { clientes, agregarCliente } = useTienda();
  
  const handleAgregar = (cliente) => {
    agregarCliente(cliente);
  };
  
  return <div>{/* JSX */}</div>;
}
```

### Llamar API

```jsx
import { clientesAPI } from '../services/api';

useEffect(() => {
  clientesAPI.obtenerTodos()
    .then(res => setClientes(res.data))
    .catch(err => console.error(err));
}, []);
```

---

## 🐛 Troubleshooting

### Error: "Cannot find module 'react-router-dom'"
```bash
npm install react-router-dom
```

### Error: "CORS error" desde API
Verifica que tu backend tenga CORS habilitado:
```javascript
// En tu servidor Node/PHP
app.use(cors());
```

### Puerto 5173 en uso
```bash
npm run dev -- --port 3000
```

---

## 📞 Soporte API

### Endpoints Principales

**Clientes**
- `GET /api/clientes` - Obtener todos
- `POST /api/clientes` - Crear
- `PUT /api/clientes/:id` - Actualizar
- `DELETE /api/clientes/:id` - Eliminar

**Productos**
- `GET /api/productos` - Obtener todos
- `POST /api/productos` - Crear
- `PUT /api/productos/:id` - Actualizar

**Pedidos**
- `GET /api/pedidos` - Obtener todos
- `POST /api/pedidos` - Crear
- `PATCH /api/pedidos/:id/estado` - Cambiar estado

Ver `src/services/api.js` para todos los endpoints.

---

## 🎨 Personalización

### Cambiar Colores de Tema

Edita `src/index.css` en la sección `:root`:

```css
:root {
  --accent: #667eea;        /* Color principal */
  --accent-bg: rgba(...);   /* Fondo del acento */
}
```

### Agregar Íconos

Usa emojis o Font Awesome:

```bash
npm install react-icons
```

```jsx
import { FiUsers } from 'react-icons/fi';

<FiUsers size={24} />
```

---

## 📄 Licencia

Este proyecto es de código abierto. Úsalo libremente.

---

## 👨‍💻 Autor

Desarrollado con ❤️ para gestión de tiendas.

---

## 📞 Contacto y Soporte

Para dudas o sugerencias sobre el proyecto, contacta al desarrollador.

**¡Éxito con tu aplicación!** 🚀

