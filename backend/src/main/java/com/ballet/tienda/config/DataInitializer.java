package com.ballet.tienda.config;

import com.ballet.tienda.entity.Producto;
import com.ballet.tienda.entity.Usuario;
import com.ballet.tienda.repository.ProductoRepository;
import com.ballet.tienda.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public void run(String... args) throws Exception {
        // Crear productos de ballet
        productoRepository.save(new Producto(
            "Zapatillas de Punta",
            45000,
            "Zapatillas profesionales para ballet clásico",
            "/imagenes/zapatillaPunta.jpg",
            "zapatillas"
        ));

        productoRepository.save(new Producto(
            "Malla Negra",
            25000,
            "Malla cómoda para clases de ballet",
            "/imagenes/malla_negra.webp",
            "ropa"
        ));

        productoRepository.save(new Producto(
            "Zapatillas Media Punta",
            30000,
            "Ideales para principiantes",
            "/imagenes/zapatilaMediaPunta.jpeg",
            "zapatillas"
        ));

        productoRepository.save(new Producto(
            "Polainas",
            15000,
            "Mantén tus piernas calientes durante el entrenamiento",
            "/imagenes/polainas.jpg",
            "accesorios"
        ));

        productoRepository.save(new Producto(
            "Falda de Ballet",
            18000,
            "Falda ligera para practicar",
            "/imagenes/faldaBallet.jpg",
            "ropa"
        ));

        productoRepository.save(new Producto(
            "Accesorios Ballet",
            12000,
            "Set de accesorios para ballet",
            "/imagenes/accesorios.jpg",
            "accesorios"
        ));

        // Crear usuarios de prueba
        usuarioRepository.save(new Usuario(
            "sofia",
            "sofia@ballet.com",
            "12345", // En producción esto debe estar encriptado con BCrypt
            "USER"
        ));

        usuarioRepository.save(new Usuario(
            "admin",
            "admin@ballet.com",
            "admin123",
            "ADMIN"
        ));

        System.out.println("========================================");
        System.out.println("✅ DATOS DE PRUEBA CREADOS");
        System.out.println("📦 " + productoRepository.count() + " productos");
        System.out.println("👤 " + usuarioRepository.count() + " usuarios");
        System.out.println("========================================");
    }
}
