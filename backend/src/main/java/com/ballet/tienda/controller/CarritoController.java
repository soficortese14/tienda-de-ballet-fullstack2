package com.ballet.tienda.controller;

import com.ballet.tienda.entity.CarritoItem;
import com.ballet.tienda.entity.Producto;
import com.ballet.tienda.entity.Usuario;
import com.ballet.tienda.repository.CarritoItemRepository;
import com.ballet.tienda.repository.ProductoRepository;
import com.ballet.tienda.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/carrito")
@CrossOrigin(origins = "*")
public class CarritoController {

    @Autowired
    private CarritoItemRepository carritoItemRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProductoRepository productoRepository;

    // GET - Obtener carrito de un usuario
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> obtenerCarritoPorUsuario(@PathVariable Long usuarioId) {
        Map<String, Object> response = new HashMap<>();

        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);
        if (usuarioOpt.isEmpty()) {
            response.put("error", "Usuario no encontrado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        List<CarritoItem> items = carritoItemRepository.findByUsuarioId(usuarioId);

        // Calcular total
        int total = items.stream()
                .mapToInt(item -> item.getProducto().getPrecio() * item.getCantidad())
                .sum();

        response.put("items", items);
        response.put("total", total);
        response.put("cantidadItems", items.size());

        return ResponseEntity.ok(response);
    }

    // POST - Agregar item al carrito
    @PostMapping
    public ResponseEntity<?> agregarItem(@RequestBody Map<String, Long> request) {
        Map<String, Object> response = new HashMap<>();

        Long usuarioId = request.get("usuarioId");
        Long productoId = request.get("productoId");
        Long cantidadLong = request.getOrDefault("cantidad", 1L);
        Integer cantidad = cantidadLong.intValue();

        if (usuarioId == null || productoId == null) {
            response.put("error", "usuarioId y productoId son obligatorios");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        // Verificar que el usuario existe
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);
        if (usuarioOpt.isEmpty()) {
            response.put("error", "Usuario no encontrado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        // Verificar que el producto existe
        Optional<Producto> productoOpt = productoRepository.findById(productoId);
        if (productoOpt.isEmpty()) {
            response.put("error", "Producto no encontrado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        Usuario usuario = usuarioOpt.get();
        Producto producto = productoOpt.get();

        // Verificar si el producto ya está en el carrito
        List<CarritoItem> itemsExistentes = carritoItemRepository.findByUsuarioId(usuarioId);
        Optional<CarritoItem> itemExistente = itemsExistentes.stream()
                .filter(item -> item.getProducto().getId().equals(productoId))
                .findFirst();

        CarritoItem carritoItem;

        if (itemExistente.isPresent()) {
            // Si ya existe, incrementar cantidad
            carritoItem = itemExistente.get();
            carritoItem.setCantidad(carritoItem.getCantidad() + cantidad);
            carritoItemRepository.save(carritoItem);
            response.put("mensaje", "Cantidad actualizada en el carrito");
        } else {
            // Si no existe, crear nuevo item
            carritoItem = new CarritoItem(usuario, producto, cantidad);
            carritoItemRepository.save(carritoItem);
            response.put("mensaje", "Producto agregado al carrito");
        }

        response.put("item", carritoItem);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // PUT - Actualizar cantidad de un item
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarCantidad(@PathVariable Long id, @RequestBody Map<String, Integer> request) {
        Map<String, Object> response = new HashMap<>();

        Integer nuevaCantidad = request.get("cantidad");

        if (nuevaCantidad == null || nuevaCantidad < 1) {
            response.put("error", "La cantidad debe ser al menos 1");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        return carritoItemRepository.findById(id)
                .map(item -> {
                    item.setCantidad(nuevaCantidad);
                    CarritoItem itemActualizado = carritoItemRepository.save(item);

                    response.put("mensaje", "Cantidad actualizada");
                    response.put("item", itemActualizado);

                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    response.put("error", "Item no encontrado en el carrito");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                });
    }

    // DELETE - Eliminar un item del carrito
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarItem(@PathVariable Long id) {
        Map<String, String> response = new HashMap<>();

        if (carritoItemRepository.existsById(id)) {
            carritoItemRepository.deleteById(id);
            response.put("mensaje", "Item eliminado del carrito");
            return ResponseEntity.ok(response);
        }

        response.put("error", "Item no encontrado en el carrito");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    // DELETE - Vaciar carrito completo de un usuario
    @DeleteMapping("/usuario/{usuarioId}")
    @Transactional
    public ResponseEntity<?> vaciarCarrito(@PathVariable Long usuarioId) {
        Map<String, String> response = new HashMap<>();

        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);
        if (usuarioOpt.isEmpty()) {
            response.put("error", "Usuario no encontrado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        Usuario usuario = usuarioOpt.get();
        carritoItemRepository.deleteByUsuario(usuario);

        response.put("mensaje", "Carrito vaciado exitosamente");
        return ResponseEntity.ok(response);
    }
}
