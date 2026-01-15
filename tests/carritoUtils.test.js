import { describe, it, expect, beforeEach } from 'vitest';
import {
  agregarAlCarrito,
  eliminarDelCarrito,
  actualizarCantidad,
  calcularTotal,
  obtenerCantidadTotal,
  vaciarCarrito
} from '../src/utils/carritoUtils';

// Limpiar localStorage antes de cada test
beforeEach(() => {
  localStorage.clear();
});

describe('Funciones del Carrito', () => {
  // Test 1
  it('agrega un producto nuevo al carrito', () => {
    const producto = { id: 1, nombre: 'Zapatillas', precio: 45000 };
    const carrito = agregarAlCarrito(producto);

    expect(carrito.length).toBe(1);
    expect(carrito[0].nombre).toBe('Zapatillas');
    expect(carrito[0].cantidad).toBe(1);
  });

  // Test 2
  it('incrementa cantidad si el producto ya existe', () => {
    const producto = { id: 1, nombre: 'Zapatillas', precio: 45000 };
    agregarAlCarrito(producto);
    const carrito = agregarAlCarrito(producto);

    expect(carrito.length).toBe(1);
    expect(carrito[0].cantidad).toBe(2);
  });

  // Test 3
  it('elimina un producto del carrito', () => {
    const producto1 = { id: 1, nombre: 'Zapatillas', precio: 45000 };
    const producto2 = { id: 2, nombre: 'Malla', precio: 25000 };

    agregarAlCarrito(producto1);
    agregarAlCarrito(producto2);
    const carrito = eliminarDelCarrito(1);

    expect(carrito.length).toBe(1);
    expect(carrito[0].id).toBe(2);
  });

  // Test 4
  it('calcula el total correctamente', () => {
    const producto1 = { id: 1, nombre: 'Zapatillas', precio: 45000 };
    const producto2 = { id: 2, nombre: 'Malla', precio: 25000 };

    agregarAlCarrito(producto1);
    agregarAlCarrito(producto2);

    const carrito = JSON.parse(localStorage.getItem('carrito'));
    const total = calcularTotal(carrito);

    expect(total).toBe(70000); // 45000 + 25000
  });

  // Test 5
  it('calcula el total con cantidades múltiples', () => {
    const producto = { id: 1, nombre: 'Zapatillas', precio: 45000 };

    agregarAlCarrito(producto);
    agregarAlCarrito(producto);
    agregarAlCarrito(producto);

    const carrito = JSON.parse(localStorage.getItem('carrito'));
    const total = calcularTotal(carrito);

    expect(total).toBe(135000); // 45000 * 3
  });

  // Test 6
  it('obtiene la cantidad total de productos', () => {
    const producto1 = { id: 1, nombre: 'Zapatillas', precio: 45000 };
    const producto2 = { id: 2, nombre: 'Malla', precio: 25000 };

    agregarAlCarrito(producto1);
    agregarAlCarrito(producto1);
    agregarAlCarrito(producto2);

    const carrito = JSON.parse(localStorage.getItem('carrito'));
    const cantidadTotal = obtenerCantidadTotal(carrito);

    expect(cantidadTotal).toBe(3); // 2 + 1
  });

  // Test 7
  it('actualiza la cantidad de un producto', () => {
    const producto = { id: 1, nombre: 'Zapatillas', precio: 45000 };

    agregarAlCarrito(producto);
    const carrito = actualizarCantidad(1, 5);

    expect(carrito[0].cantidad).toBe(5);
  });

  // Test 8
  it('elimina producto si cantidad es 0', () => {
    const producto = { id: 1, nombre: 'Zapatillas', precio: 45000 };

    agregarAlCarrito(producto);
    const carrito = actualizarCantidad(1, 0);

    expect(carrito.length).toBe(0);
  });

  // Test 9
  it('vacía el carrito completamente', () => {
    const producto1 = { id: 1, nombre: 'Zapatillas', precio: 45000 };
    const producto2 = { id: 2, nombre: 'Malla', precio: 25000 };

    agregarAlCarrito(producto1);
    agregarAlCarrito(producto2);
    const carrito = vaciarCarrito();

    expect(carrito.length).toBe(0);
    expect(localStorage.getItem('carrito')).toBeNull();
  });

  // Test 10
  it('retorna 0 en total con carrito vacío', () => {
    const carritoVacio = [];
    const total = calcularTotal(carritoVacio);

    expect(total).toBe(0);
  });
});
