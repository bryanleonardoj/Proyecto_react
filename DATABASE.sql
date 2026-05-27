-- ==============================
-- SISTEMA DE GESTIÓN DE TIENDA
-- Base de Datos MySQL
-- ==============================

CREATE DATABASE IF NOT EXISTS tienda_gestion;
USE tienda_gestion;

-- ==============================
-- TABLA: USUARIOS
-- ==============================
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'vendedor', 'gerente') DEFAULT 'vendedor',
    estado TINYINT DEFAULT 1,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================
-- TABLA: CLIENTES
-- ==============================
CREATE TABLE clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(150) NOT NULL,
    email VARCHAR(100),
    telefono VARCHAR(20),
    direccion VARCHAR(255),
    ciudad VARCHAR(100),
    documento_identidad VARCHAR(50) UNIQUE,
    tipo_cliente ENUM('mayorista', 'minorista', 'consumidor') DEFAULT 'consumidor',
    limites_credito DECIMAL(10, 2) DEFAULT 0,
    saldo DECIMAL(10, 2) DEFAULT 0,
    estado TINYINT DEFAULT 1,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_compra DATETIME,
    notas TEXT
);

-- ==============================
-- TABLA: PRODUCTOS/INVENTARIO
-- ==============================
CREATE TABLE productos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigo_producto VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(100),
    precio_costo DECIMAL(10, 2) NOT NULL,
    precio_venta DECIMAL(10, 2) NOT NULL,
    cantidad_stock INT DEFAULT 0,
    cantidad_minima INT DEFAULT 10,
    cantidad_maxima INT DEFAULT 100,
    unidad_medida VARCHAR(20) DEFAULT 'unidad',
    proveedor_id INT,
    estado TINYINT DEFAULT 1,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)
);

-- ==============================
-- TABLA: CATEGORÍAS
-- ==============================
CREATE TABLE categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    estado TINYINT DEFAULT 1
);

-- ==============================
-- TABLA: PROVEEDORES
-- ==============================
CREATE TABLE proveedores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(150) NOT NULL,
    email VARCHAR(100),
    telefono VARCHAR(20),
    direccion VARCHAR(255),
    ciudad VARCHAR(100),
    ruc_nit VARCHAR(50),
    contacto_principal VARCHAR(100),
    estado TINYINT DEFAULT 1,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================
-- TABLA: PEDIDOS/ORDENES
-- ==============================
CREATE TABLE pedidos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero_pedido VARCHAR(50) UNIQUE NOT NULL,
    cliente_id INT NOT NULL,
    usuario_id INT,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_entrega_estimada DATE,
    fecha_entrega_real DATE,
    estado ENUM('pendiente', 'confirmado', 'preparando', 'enviado', 'entregado', 'cancelado') DEFAULT 'pendiente',
    subtotal DECIMAL(10, 2),
    impuesto DECIMAL(10, 2),
    descuento DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2),
    metodo_pago ENUM('efectivo', 'tarjeta', 'transferencia', 'credito') DEFAULT 'efectivo',
    notas TEXT,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- ==============================
-- TABLA: DETALLES_PEDIDO
-- ==============================
CREATE TABLE detalles_pedido (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2),
    descuento_linea DECIMAL(10, 2) DEFAULT 0,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- ==============================
-- TABLA: FACTURAS
-- ==============================
CREATE TABLE facturas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero_factura VARCHAR(50) UNIQUE NOT NULL,
    pedido_id INT UNIQUE,
    cliente_id INT NOT NULL,
    fecha_emision DATE NOT NULL,
    fecha_vencimiento DATE,
    subtotal DECIMAL(10, 2),
    impuesto DECIMAL(10, 2),
    descuento DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2),
    estado_pago ENUM('pagada', 'pendiente', 'parcial', 'vencida') DEFAULT 'pendiente',
    notas TEXT,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- ==============================
-- TABLA: MOVIMIENTOS_INVENTARIO
-- ==============================
CREATE TABLE movimientos_inventario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    producto_id INT NOT NULL,
    tipo_movimiento ENUM('entrada', 'salida', 'ajuste', 'devolucion') NOT NULL,
    cantidad INT NOT NULL,
    razon VARCHAR(255),
    usuario_id INT,
    referencia_pedido INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (referencia_pedido) REFERENCES pedidos(id)
);

-- ==============================
-- TABLA: PAGOS
-- ==============================
CREATE TABLE pagos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    factura_id INT NOT NULL,
    cliente_id INT NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    fecha_pago DATE NOT NULL,
    metodo_pago ENUM('efectivo', 'tarjeta', 'transferencia', 'cheque') NOT NULL,
    numero_referencia VARCHAR(100),
    usuario_id INT,
    notas TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (factura_id) REFERENCES facturas(id),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- ==============================
-- TABLA: DEVOLUCIONES
-- ==============================
CREATE TABLE devoluciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero_devolucion VARCHAR(50) UNIQUE NOT NULL,
    pedido_id INT,
    cliente_id INT NOT NULL,
    fecha_devolucion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    motivo VARCHAR(255),
    estado ENUM('pendiente', 'aprobada', 'rechazada') DEFAULT 'pendiente',
    monto_credito DECIMAL(10, 2),
    notas TEXT,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- ==============================
-- TABLA: DETALLES_DEVOLUCIONES
-- ==============================
CREATE TABLE detalles_devoluciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    devolucion_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    razon VARCHAR(255),
    FOREIGN KEY (devolucion_id) REFERENCES devoluciones(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- ==============================
-- TABLA: ACTIVOS (Caja, Bancos, etc)
-- ==============================
CREATE TABLE cajas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    saldo_inicial DECIMAL(10, 2) DEFAULT 0,
    saldo_actual DECIMAL(10, 2) DEFAULT 0,
    estado TINYINT DEFAULT 1,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================
-- ÍNDICES PARA MEJOR RENDIMIENTO
-- ==============================
CREATE INDEX idx_cliente_email ON clientes(email);
CREATE INDEX idx_producto_categoria ON productos(categoria);
CREATE INDEX idx_producto_codigo ON productos(codigo_producto);
CREATE INDEX idx_pedido_cliente ON pedidos(cliente_id);
CREATE INDEX idx_pedido_estado ON pedidos(estado);
CREATE INDEX idx_pedido_fecha ON pedidos(fecha_pedido);
CREATE INDEX idx_factura_cliente ON facturas(cliente_id);
CREATE INDEX idx_factura_estado_pago ON facturas(estado_pago);
CREATE INDEX idx_pago_factura ON pagos(factura_id);
CREATE INDEX idx_pago_fecha ON pagos(fecha_pago);
CREATE INDEX idx_movimiento_producto ON movimientos_inventario(producto_id);
CREATE INDEX idx_movimiento_fecha ON movimientos_inventario(fecha);

-- ==============================
-- INSERCIONES DE PRUEBA
-- ==============================

INSERT INTO usuarios (nombre, email, contraseña, rol) VALUES 
('Admin Principal', 'admin@tienda.com', 'admin123', 'admin'),
('Vendedor 1', 'vendedor1@tienda.com', 'vendedor123', 'vendedor'),
('Gerente', 'gerente@tienda.com', 'gerente123', 'gerente');

INSERT INTO categorias (nombre, descripcion) VALUES 
('Electrónica', 'Productos electrónicos'),
('Ropa', 'Prendas de vestir'),
('Alimentos', 'Productos alimenticios'),
('Accesorios', 'Accesorios diversos'),
('Libros', 'Libros y material de lectura');

INSERT INTO proveedores (nombre, email, telefono, contacto_principal) VALUES 
('Proveedor A', 'proveedor_a@mail.com', '+1234567890', 'Juan Pérez'),
('Proveedor B', 'proveedor_b@mail.com', '+0987654321', 'María García'),
('Proveedor C', 'proveedor_c@mail.com', '+5555555555', 'Carlos López');

INSERT INTO clientes (nombre, email, telefono, direccion, tipo_cliente) VALUES 
('Cliente Test 1', 'cliente1@mail.com', '+1111111111', 'Calle 1 #123', 'consumidor'),
('Cliente Test 2', 'cliente2@mail.com', '+2222222222', 'Avenida 2 #456', 'mayorista'),
('Cliente Test 3', 'cliente3@mail.com', '+3333333333', 'Carrera 3 #789', 'minorista');

INSERT INTO cajas (nombre, saldo_inicial, saldo_actual) VALUES 
('Caja Principal', 1000, 1000),
('Caja Secundaria', 500, 500);
