# ⚡ INICIO RÁPIDO - 5 MINUTOS

## 🎯 Objetivo
Tener la aplicación corriendo en tu navegador en menos de 5 minutos.

---

## 🔥 3 Pasos Esenciales

### 1️⃣ INSTALAR DEPENDENCIAS (2 min)

```bash
cd "C:\Users\bryan\OneDrive\Escritorio\Front-end\Proyecto_react"
npm install
```

### 2️⃣ CREAR BASE DE DATOS (1 min)

**Opción A: Fácil (phpMyAdmin)**
```
1. Abre http://localhost/phpmyadmin
2. Pestaña SQL
3. Copia el contenido de DATABASE.sql
4. Pega en la consola
5. Ejecuta (Ctrl+Enter)
```

**Opción B: Rápido (Terminal)**
```bash
cd "C:\xampp\mysql\bin"
mysql -u root -p < "C:\Users\bryan\OneDrive\Escritorio\Front-end\Proyecto_react\DATABASE.sql"
```

### 3️⃣ INICIAR APLICACIÓN (1 min)

```bash
npm run dev
```

Abre en navegador: **http://localhost:5173**

---

## 🔓 Login Inmediato

```
📧 Email: admin@tienda.com
🔑 Contraseña: admin123
```

¡Y listo! ✅

---

## 📋 Qué Verás

✅ Dashboard con KPIs
✅ Última pandilla de pedidos
✅ Alertas del sistema
✅ Navegación funcional

---

## 🚨 Si Algo Falla

### "npm: comando no encontrado"
→ Reinicia PowerShell o reinstala Node.js

### "No se conecta a BD"
→ Verifica MySQL esté corriendo en XAMPP

### "CORS error"
→ Verifica que el backend esté en puerto 3000 o configurado

---

## 📚 Siguiente Paso

Lee: **[SETUP.md](SETUP.md)** para configuración completa
Lee: **[GUIA_DESARROLLO.md](GUIA_DESARROLLO.md)** para implementar nuevas funciones

---

## 🎓 Estructura Rápida

```
src/
├── pages/          → Páginas principales
├── components/     → Componentes reutilizables
├── context/        → Estado global
├── services/       → Llamadas a API
└── styles/         → CSS
```

---

## 💡 Tips

1. **Recarga en vivo:** Los cambios en React se ven al guardar
2. **Devtools:** F12 en navegador para debuggear
3. **Extensión React:** Instala React DevTools en Chrome

---

¡**A programar!** 🚀
