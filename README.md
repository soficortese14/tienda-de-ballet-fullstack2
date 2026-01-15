# 🩰 Tienda Ballet React

Aplicación web de comercio electrónico especializada en productos de ballet, desarrollada con React + Vite para la Evaluación Parcial 2 de Desarrollo Fullstack II.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.2.4-purple)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-pink)
![Tests](https://img.shields.io/badge/Tests-10%2F10%20passing-success)

---

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Ejecutar tests
npm test
```

---

## ✨ Características

- ✅ **Catálogo de productos** con 7 productos de ballet
- ✅ **Sistema de carrito** con persistencia en LocalStorage
- ✅ **Contador de carrito** en tiempo real
- ✅ **Diseño responsivo** (móvil, tablet, desktop)
- ✅ **10 pruebas unitarias** con Vitest (100% pasando)
- ✅ **Componentes reutilizables** en React

---

## 🛠️ Tecnologías

- **React 19.2.0** - Framework de UI
- **Vite 7.2.4** - Build tool
- **Bootstrap 5.3.8** - Framework CSS
- **Vitest 4.0.17** - Testing
- **LocalStorage** - Persistencia

---

## 📁 Estructura

```
src/
├── components/       # Componentes React
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductoCard.jsx
│   └── Home.jsx
├── utils/           # Funciones auxiliares
│   └── carritoUtils.js
├── data/            # Datos
│   └── productos.js
└── App.jsx          # Componente principal

tests/
└── carritoUtils.test.js  # 10 pruebas unitarias
```

---

## 🧪 Testing

```bash
npm test
```

**Resultados:**
```
✓ Tests  10 passed (10)
  Duration  2.99s
```

### Pruebas Implementadas

1. Agregar producto nuevo al carrito
2. Incrementar cantidad de producto existente
3. Eliminar producto del carrito
4. Calcular total correctamente
5. Calcular total con cantidades múltiples
6. Obtener cantidad total de productos
7. Actualizar cantidad de un producto
8. Eliminar producto si cantidad es 0
9. Vaciar carrito completamente
10. Total con carrito vacío

---

## 📚 Documentación

- **DOCUMENTO_ERS.md** - Especificación de Requisitos del Software
- **DOCUMENTO_COBERTURA_TESTING.md** - Cobertura de pruebas

---

## 👩‍💻 Autora

**Sofía Cortese**
- GitHub: [@soficortese14](https://github.com/soficortese14)
- Proyecto: Evaluación Parcial 2 - Desarrollo Fullstack II
- Institución: Duoc UC

---

🩰 Hecho con 💖 para bailarinas
