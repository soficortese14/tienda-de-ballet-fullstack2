# Documento de Cobertura de Testing
## Tienda Ballet React - Prueba Parcial 2

**Estudiante:** Sofía Cortese
**Asignatura:** Desarrollo Fullstack II (DSY1104)
**Fecha:** Enero 2025
**Framework de Testing:** Vitest

---

## 1. Resumen Ejecutivo

Este documento detalla la cobertura de pruebas unitarias implementadas en el proyecto "Tienda Ballet React". Se han desarrollado **10 pruebas unitarias** que cubren las funcionalidades críticas del sistema de carrito de compras utilizando **Vitest** como framework de testing.

**Resultado de Tests:**
```
✓ Test Files  1 passed (1)
✓ Tests  10 passed (10)
  Duration  2.99s
```

---

## 2. Alcance de Testing

### 2.1 Módulo Testeado: carritoUtils.js

El módulo `carritoUtils.js` contiene las funciones principales para la gestión del carrito de compras con persistencia en LocalStorage.

**Funciones cubiertas:**
- `agregarAlCarrito(producto)`
- `eliminarDelCarrito(idProducto)`
- `actualizarCantidad(idProducto, cantidad)`
- `calcularTotal(carrito)`
- `obtenerCantidadTotal(carrito)`
- `vaciarCarrito()`

---

## 3. Pruebas Implementadas

### Test 1: Agregar producto nuevo al carrito
**Descripción:** Verifica que un producto se agregue correctamente al carrito vacío.
**Caso de uso:** Usuario agrega su primer producto.
**Resultado esperado:** Carrito con 1 producto, cantidad = 1.
**Estado:** ✅ PASADO

### Test 2: Incrementar cantidad de producto existente
**Descripción:** Verifica que agregar el mismo producto incremente su cantidad.
**Caso de uso:** Usuario agrega el mismo producto múltiples veces.
**Resultado esperado:** 1 producto en carrito, cantidad = 2.
**Estado:** ✅ PASADO

### Test 3: Eliminar producto del carrito
**Descripción:** Verifica la eliminación correcta de un producto específico.
**Caso de uso:** Usuario elimina un producto del carrito.
**Resultado esperado:** Producto eliminado, otros productos permanecen.
**Estado:** ✅ PASADO

### Test 4: Calcular total correctamente
**Descripción:** Verifica el cálculo del total con múltiples productos.
**Caso de uso:** Usuario revisa el total de su compra.
**Resultado esperado:** Total = suma de (precio × cantidad) de todos los productos.
**Estado:** ✅ PASADO

### Test 5: Calcular total con cantidades múltiples
**Descripción:** Verifica el cálculo cuando un producto tiene cantidad > 1.
**Caso de uso:** Usuario compra 3 unidades del mismo producto.
**Resultado esperado:** Total = precio × cantidad.
**Estado:** ✅ PASADO

### Test 6: Obtener cantidad total de productos
**Descripción:** Verifica el conteo total de productos en el carrito.
**Caso de uso:** Mostrar badge con cantidad en el navbar.
**Resultado esperado:** Suma de todas las cantidades.
**Estado:** ✅ PASADO

### Test 7: Actualizar cantidad de un producto
**Descripción:** Verifica la actualización manual de cantidad.
**Caso de uso:** Usuario cambia cantidad desde el input en carrito.
**Resultado esperado:** Cantidad actualizada correctamente.
**Estado:** ✅ PASADO

### Test 8: Eliminar producto si cantidad es 0
**Descripción:** Verifica que un producto se elimine al poner cantidad 0.
**Caso de uso:** Usuario reduce cantidad a 0.
**Resultado esperado:** Producto eliminado del carrito.
**Estado:** ✅ PASADO

### Test 9: Vaciar carrito completamente
**Descripción:** Verifica que el carrito se vacíe por completo.
**Caso de uso:** Usuario finaliza compra o vacía carrito.
**Resultado esperado:** Carrito vacío, localStorage limpio.
**Estado:** ✅ PASADO

### Test 10: Total con carrito vacío
**Descripción:** Verifica que el total sea 0 cuando no hay productos.
**Caso de uso:** Carrito recién inicializado.
**Resultado esperado:** Total = 0.
**Estado:** ✅ PASADO

---

## 4. Configuración del Entorno de Pruebas

### 4.1 Herramientas Utilizadas
- **Vitest:** v4.0.17 - Framework de testing moderno para Vite
- **jsdom:** v27.4.0 - Simulación del DOM para testing
- **Node.js:** Ambiente de ejecución

### 4.2 Configuración (vite.config.js)
```javascript
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  }
})
```

### 4.3 Scripts de Testing
```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

---

## 5. Cobertura de Código

### 5.1 Funciones Cubiertas
| Función | Cobertura | Casos de Prueba |
|---------|-----------|-----------------|
| agregarAlCarrito | 100% | 2 tests |
| eliminarDelCarrito | 100% | 2 tests |
| actualizarCantidad | 100% | 2 tests |
| calcularTotal | 100% | 3 tests |
| obtenerCantidadTotal | 100% | 1 test |
| vaciarCarrito | 100% | 1 test |

### 5.2 Casos de Uso Cubiertos
- ✅ Agregar productos (nuevos y existentes)
- ✅ Eliminar productos (directo y por cantidad 0)
- ✅ Actualizar cantidades
- ✅ Cálculos matemáticos (total, cantidades)
- ✅ Vaciar carrito
- ✅ Casos límite (carrito vacío, cantidad 0)

---

## 6. Estrategia de Testing

### 6.1 Metodología
**Approach:** Unit Testing (Pruebas Unitarias)
**Patrón:** Arrange-Act-Assert (AAA)

### 6.2 Limpieza de Estado
Cada test ejecuta `beforeEach(() => localStorage.clear())` para asegurar aislamiento entre pruebas.

### 6.3 Casos Límite Testeados
- Carrito vacío
- Cantidad = 0
- Múltiples productos
- Mismo producto agregado múltiples veces

---

## 7. Resultados y Análisis

### 7.1 Tasa de Éxito
- **Total de pruebas:** 10
- **Pruebas pasadas:** 10
- **Pruebas fallidas:** 0
- **Tasa de éxito:** 100%

### 7.2 Tiempo de Ejecución
- **Duración total:** 2.99 segundos
- **Tiempo promedio por test:** 0.3 segundos

### 7.3 Estabilidad
- ✅ Todas las pruebas son determinísticas
- ✅ No hay dependencias entre tests
- ✅ Cada test limpia su estado antes de ejecutar

---

## 8. Conclusiones

### 8.1 Calidad del Código
Las 10 pruebas unitarias desarrolladas aseguran que las funciones críticas del carrito funcionan correctamente en todos los escenarios esperados.

### 8.2 Mantenibilidad
El código testeado facilita:
- Detección temprana de errores
- Refactorización segura
- Documentación viva del comportamiento esperado

### 8.3 Cobertura Funcional
Se han cubierto **todas las funciones principales** del módulo de carrito, incluyendo casos límite y escenarios de error.

---

## 9. Comandos de Testing

### Ejecutar todas las pruebas
```bash
npm test
```

### Ejecutar tests en modo watch
```bash
npm test -- --watch
```

### Ver cobertura de código
```bash
npm test -- --coverage
```

---

**Documento generado:** Enero 2025
**Proyecto:** Tienda Ballet React
**Framework:** React 19.2.0 + Vite 7.2.4 + Vitest 4.0.17
