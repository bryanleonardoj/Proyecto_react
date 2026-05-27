# 🚀 GUÍA DE INSTALACIÓN Y CONFIGURACIÓN

## Requisitos Previos

✅ Node.js 16+ instalado
✅ npm o yarn instalado
✅ XAMPP instalado (incluye Apache y MySQL)
✅ Visual Studio Code (recomendado)

---

## 📦 Instalación Step-by-Step

### Paso 1: Descargar Dependencias

```bash
# Navega a la carpeta del proyecto
cd "C:\Users\bryan\OneDrive\Escritorio\Front-end\Proyecto_react"

# Instala las dependencias de npm
npm install
```

**Esto instalará:**
- React 19.2.6
- React Router DOM
- Axios
- Recharts
- Date-fns
- Y más...

---

### Paso 2: Configurar Base de Datos MySQL

#### Opción A: Usar phpMyAdmin (Más fácil)

1. **Inicia XAMPP**
   - Abre `C:\xampp\xampp-control-exe`
   - Click en "Start" para Apache
   - Click en "Start" para MySQL

2. **Abre phpMyAdmin**
   - Dirígete a http://localhost/phpmyadmin
   - Selecciona la pestaña "SQL"

3. **Importa la base de datos**
   - Copia TODO el contenido de `DATABASE.sql`
   - Pégalo en la consola SQL
   - Click en "Ejecutar" (Ctrl + Enter)

4. **Verifica la creación**
   - En el panel izquierdo debería aparecer "tienda_gestion"
   - Expande y mira las tablas

#### Opción B: Usar Terminal MySQL (Más rápido)

```bash
# Abre terminal PowerShell como Administrador

# Navega a la carpeta de MySQL en XAMPP
cd "C:\xampp\mysql\bin"

# Conecta a MySQL
mysql -u root -p

# Se pedirá contraseña, presiona Enter si no la tienes

# Ejecuta el script (opción 1)
source C:/Users/bryan/OneDrive/Escritorio/Front-end/Proyecto_react/DATABASE.sql;

# O (opción 2) copia el contenido de DATABASE.sql y pégalo directo

# Verifica que se creó
SHOW DATABASES;
USE tienda_gestion;
SHOW TABLES;

# Salir
EXIT;
```

---

### Paso 3: Configurar Variables de Entorno

1. **Copia el archivo de ejemplo**
   ```bash
   copy .env.example .env.local
   ```

2. **Edita `.env.local` con tus valores**
   ```
   VITE_API_URL=http://localhost:3000/api
   VITE_MONEDA=USD
   ```

---

### Paso 4: Crear el Servidor Backend (Node.js)

#### Opción A: Node.js con Express (RECOMENDADO)

1. **Crea carpeta para el backend**
   ```bash
   mkdir tienda-api
   cd tienda-api
   npm init -y
   ```

2. **Instala dependencias**
   ```bash
   npm install express cors mysql2/promise dotenv body-parser
   npm install --save-dev nodemon
   ```

3. **Crea archivo `server.js`**
   ```javascript
   const express = require('express');
   const cors = require('cors');
   const mysql = require('mysql2/promise');
   require('dotenv').config();

   const app = express();
   app.use(cors());
   app.use(express.json());

   // Pool de conexiones
   const pool = mysql.createPool({
     host: 'localhost',
     user: 'root',
     password: '', // Tu contraseña
     database: 'tienda_gestion',
     waitForConnections: true,
     connectionLimit: 10
   });

   // Ejemplo: GET /api/clientes
   app.get('/api/clientes', async (req, res) => {
     try {
       const conn = await pool.getConnection();
       const [rows] = await conn.query('SELECT * FROM clientes');
       res.json(rows);
     } catch (err) {
       res.status(500).json({ error: err.message });
     }
   });

   app.listen(3000, () => {
     console.log('✅ Servidor en http://localhost:3000');
   });
   ```

4. **En `package.json`, edita scripts**
   ```json
   "scripts": {
     "start": "node server.js",
     "dev": "nodemon server.js"
   }
   ```

5. **Inicia el servidor**
   ```bash
   npm run dev
   ```

#### Opción B: PHP con XAMPP

1. **Crea carpeta en XAMPP**
   ```
   C:\xampp\htdocs\tienda-api
   ```

2. **Crea archivo `C:\xampp\htdocs\tienda-api\index.php`**
   ```php
   <?php
   header('Access-Control-Allow-Origin: *');
   header('Content-Type: application/json');
   header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

   $servername = "localhost";
   $username = "root";
   $password = "";
   $dbname = "tienda_gestion";

   $conn = new mysqli($servername, $username, $password, $dbname);

   if ($conn->connect_error) {
     die(json_encode(['error' => 'Conexión fallida: ' . $conn->connect_error]));
   }

   // GET /tienda-api/clientes
   if ($_SERVER['REQUEST_METHOD'] === 'GET') {
     $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
     
     if (strpos($path, '/tienda-api/clientes') !== false) {
       $result = $conn->query("SELECT * FROM clientes");
       $clientes = [];
       while ($row = $result->fetch_assoc()) {
         $clientes[] = $row;
       }
       echo json_encode($clientes);
     }
   }

   $conn->close();
   ?>
   ```

3. **Actualiza `.env.local`**
   ```
   VITE_API_URL=http://localhost/tienda-api
   ```

---

### Paso 5: Ejecutar la Aplicación React

```bash
# Desde la carpeta del proyecto
cd "C:\Users\bryan\OneDrive\Escritorio\Front-end\Proyecto_react"

# Inicia servidor de desarrollo
npm run dev
```

**Salida esperada:**
```
VITE v8.0.12  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

Abre en tu navegador: **http://localhost:5173**

---

## 🔐 Login Inicial

Usa estas credenciales de prueba:

| Email | Contraseña |
|-------|-----------|
| admin@tienda.com | admin123 |
| vendedor1@tienda.com | vendedor123 |
| gerente@tienda.com | gerente123 |

---

## 🚀 Usar la Aplicación

### Dashboard
- Ver KPIs y estadísticas
- Ver últimos pedidos
- Accesos rápidos

### Próximas funcionalidades a implementar:
- ✅ Dashboard
- ⏳ Gestión de Clientes
- ⏳ Gestión de Productos
- ⏳ Sistema de Pedidos
- ⏳ Facturación
- ⏳ Reportes

---

## 🧩 Estructura del Proyecto

```
Proyecto_react/
├── src/
│   ├── components/      # Componentes reutilizables
│   ├── pages/          # Páginas principales
│   ├── context/        # Estado global (Context API)
│   ├── services/       # Llamadas a API
│   ├── utils/          # Funciones auxiliares
│   ├── styles/         # Archivos CSS
│   ├── config/         # Configuración
│   ├── assets/         # Imágenes
│   ├── App.jsx
│   └── main.jsx
├── DATABASE.sql        # Script de BD
├── .env.example        # Variables de entorno
├── vite.config.js
├── package.json
└── README.md
```

---

## 🐛 Solución de Problemas

### Error: "npm command not found"
```bash
# Reinicia PowerShell/Terminal
# O instala Node.js nuevamente
```

### Error: "CORS error" desde API
```bash
# Asegúrate que tu API tiene CORS habilitado
# En Express:
app.use(cors());
```

### Puerto 5173 ya está en uso
```bash
# Usa otro puerto
npm run dev -- --port 3000
```

### MySQL no se conecta
```bash
# 1. Verifica que MySQL esté corriendo en XAMPP
# 2. Verifica credenciales en .env
# 3. Verifica que la BD existe
SHOW DATABASES;
```

### Base de datos vacía
```bash
# Ejecuta nuevamente DATABASE.sql
# O desde MySQL:
USE tienda_gestion;
SHOW TABLES;
```

---

## 📝 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Preview de build
npm run preview

# Lint
npm run lint

# Instalar nuevas dependencias
npm install nombre-paquete

# Desinstalar dependencia
npm uninstall nombre-paquete
```

---

## 📞 Próximos Pasos

1. **Explorar el Dashboard**
   - Entender la estructura
   - Familiarizarse con la UI

2. **Crear módulo de Clientes**
   - Seguir la guía en `GUIA_DESARROLLO.md`
   - Implementar CRUD completo

3. **Crear módulo de Productos**
   - Agregar categorías
   - Gestionar proveedores

4. **Sistema de Pedidos**
   - Carrito de compras
   - Cambios de estado

5. **Facturación y Reportes**
   - Generar PDFs
   - Gráficos con Recharts

---

## 📚 Recursos Útiles

- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **React Router**: https://reactrouter.com
- **Axios**: https://axios-http.com
- **MySQL Docs**: https://dev.mysql.com/doc

---

## ✅ Checklist Final

- [ ] Node.js instalado
- [ ] XAMPP instalado y MySQL corriendo
- [ ] BD tienda_gestion creada
- [ ] Dependencias npm instaladas
- [ ] .env.local configurado
- [ ] Servidor backend corriendo (puerto 3000 o /tienda-api)
- [ ] Aplicación React corriendo (puerto 5173)
- [ ] Login funciona con credenciales de prueba
- [ ] Dashboard visible

---

¡🎉 **¡Felicidades! Tu sistema está listo para desarrollar!** 🎉

Cualquier duda, revisa la documentación o GUIA_DESARROLLO.md
