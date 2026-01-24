# 📚 DOCUMENTACIÓN COMPLETA - TIENDA DE BALLET FULLSTACK

**Proyecto:** Tienda de Ballet E-commerce
**Alumna:** Sofía Cortese
**Fecha:** Enero 2026
**Tecnologías:** React + Spring Boot + MySQL + AWS

---

## 📋 TABLA DE CONTENIDOS

1. [Introducción y Objetivos](#1-introducción-y-objetivos)
2. [Arquitectura del Sistema](#2-arquitectura-del-sistema)
3. [Tecnologías Utilizadas](#3-tecnologías-utilizadas)
4. [Estructura del Proyecto](#4-estructura-del-proyecto)
5. [Backend - Spring Boot](#5-backend---spring-boot)
6. [Frontend - React](#6-frontend---react)
7. [Base de Datos MySQL](#7-base-de-datos-mysql)
8. [API REST - Comunicación Frontend-Backend](#8-api-rest---comunicación-frontend-backend)
9. [Autenticación y Seguridad (JWT)](#9-autenticación-y-seguridad-jwt)
10. [Flujo de Datos Completo](#10-flujo-de-datos-completo)
11. [Deployment en AWS](#11-deployment-en-aws)
12. [Procedimientos de Uso](#12-procedimientos-de-uso)
13. [Pruebas y Verificación](#13-pruebas-y-verificación)
14. [Resolución de Problemas](#14-resolución-de-problemas)

---

## 1. INTRODUCCIÓN Y OBJETIVOS

### 1.1 Descripción del Proyecto

Sistema de comercio electrónico completo para venta de productos de ballet, implementando una arquitectura **fullstack moderna** con:
- **Frontend SPA** (Single Page Application) en React
- **Backend API REST** en Spring Boot
- **Base de datos relacional** MySQL
- **Deployment en la nube** con AWS EC2

### 1.2 Objetivos del Proyecto

✅ **Objetivo 1:** Desarrollar una aplicación fullstack funcional con separación frontend/backend
✅ **Objetivo 2:** Implementar API REST siguiendo estándares HTTP
✅ **Objetivo 3:** Gestionar autenticación y autorización con JWT
✅ **Objetivo 4:** Integrar base de datos relacional con JPA/Hibernate
✅ **Objetivo 5:** Desplegar aplicación en infraestructura cloud (AWS)
✅ **Objetivo 6:** Aplicar buenas prácticas de desarrollo y arquitectura de software

### 1.3 Funcionalidades Implementadas

#### Usuario Regular:
- Ver catálogo de productos
- Buscar y filtrar productos por categoría
- Registrarse en la plataforma
- Iniciar sesión (autenticación JWT)
- Agregar productos al carrito
- Modificar cantidades en el carrito
- Eliminar productos del carrito
- Ver total del carrito

#### Usuario Administrador:
- Todas las funcionalidades de usuario regular
- Crear nuevos productos
- Editar productos existentes
- Eliminar productos
- Gestionar usuarios

---

## 2. ARQUITECTURA DEL SISTEMA

### 2.1 Diagrama de Arquitectura General

```
┌─────────────────────────────────────────────────────────────────┐
│                    ARQUITECTURA FULLSTACK                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐  │
│  │   FRONTEND   │      │   BACKEND    │      │   DATABASE   │  │
│  │              │      │              │      │              │  │
│  │    React     │◄────►│ Spring Boot  │◄────►│    MySQL     │  │
│  │   (Vite)     │ HTTP │   API REST   │ JDBC │   (Docker)   │  │
│  │              │ JSON │              │  SQL │              │  │
│  │  Port: 5173  │      │  Port: 8080  │      │  Port: 3306  │  │
│  └──────────────┘      └──────────────┘      └──────────────┘  │
│        ▲                      ▲                      ▲          │
│        │                      │                      │          │
│   [Mac Local]           [Mac Local]            [AWS EC2]       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Patrón de Arquitectura: MVC (Model-View-Controller)

**Backend (Spring Boot):**
```
Controller → Service → Repository → Database
    ↑           ↑          ↑
    │           │          └── Acceso a datos (JPA)
    │           └──────────── Lógica de negocio
    └──────────────────────── Endpoints HTTP (API REST)
```

**Frontend (React):**
```
Component → Service → API REST → Backend
    ↑          ↑
    │          └── Llamadas HTTP (Axios)
    └─────────── UI y estado local
```

### 2.3 Comunicación Entre Capas

#### Frontend → Backend:
- **Protocolo:** HTTP/HTTPS
- **Formato:** JSON
- **Métodos:** GET, POST, PUT, DELETE
- **Autenticación:** Bearer Token (JWT)

#### Backend → Database:
- **Protocolo:** JDBC over TCP/IP
- **ORM:** JPA/Hibernate
- **Formato:** Objetos Java ↔ Tablas SQL

---

## 3. TECNOLOGÍAS UTILIZADAS

### 3.1 Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.3.1 | Framework JavaScript para UI |
| **Vite** | 6.0.5 | Build tool y servidor de desarrollo |
| **Axios** | 1.7.9 | Cliente HTTP para llamadas API |
| **React Router** | 7.1.1 | Enrutamiento SPA |
| **Bootstrap** | 5.3.3 | Framework CSS para diseño responsive |

**¿Por qué React?**
- Componentes reutilizables
- Virtual DOM para rendimiento
- Ecosistema maduro y amplia comunidad
- Ideal para SPA (Single Page Applications)

**¿Por qué Vite?**
- Hot Module Replacement (HMR) ultra rápido
- Build optimizado con Rollup
- Configuración mínima
- Mejor experiencia de desarrollo que Create React App

### 3.2 Backend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Spring Boot** | 3.5.0 | Framework Java para aplicaciones empresariales |
| **Spring Data JPA** | Incluido | ORM y acceso a datos |
| **Spring Security** | Incluido | Autenticación y autorización |
| **Spring Web** | Incluido | API REST y servidor HTTP |
| **JWT (jjwt)** | 0.12.6 | Tokens de autenticación |
| **MySQL Connector** | Latest | Driver JDBC para MySQL |
| **Java** | 17 LTS | Lenguaje de programación |

**¿Por qué Spring Boot?**
- Configuración automática (opinionated)
- Servidor Tomcat embebido
- Producción-ready desde el inicio
- Ecosistema completo (seguridad, datos, web)
- Ampliamente usado en la industria

**¿Por qué Java 17?**
- Versión LTS (Long Term Support)
- Compatibilidad con AWS EC2
- Rendimiento mejorado vs versiones anteriores
- Records, Text Blocks, Pattern Matching

### 3.3 Base de Datos

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **MySQL** | 9.6.0 | Base de datos relacional |
| **Docker** | Latest | Contenedor para MySQL |

**¿Por qué MySQL?**
- Base de datos relacional robusta
- ACID compliance (transacciones seguras)
- Amplia adopción en la industria
- Buen rendimiento para aplicaciones web
- Integración perfecta con Spring Data JPA

**¿Por qué Docker?**
- Aislamiento del entorno
- Fácil despliegue y reinicio
- Consistencia entre desarrollo y producción
- No contamina el sistema host

### 3.4 Cloud Infrastructure

| Tecnología | Propósito |
|------------|-----------|
| **AWS EC2** | Servidor virtual para MySQL |
| **AWS Security Groups** | Firewall para controlar acceso |

**¿Por qué AWS?**
- Líder del mercado cloud
- Free tier para aprendizaje
- Escalabilidad futura
- Experiencia práctica con cloud computing

---

## 4. ESTRUCTURA DEL PROYECTO

### 4.1 Estructura de Directorios

```
tienda-de-ballet-fullstack2/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/ballet/tienda/
│   │   │   │   ├── config/              # Configuración
│   │   │   │   │   ├── DataInitializer.java
│   │   │   │   │   ├── JwtUtil.java
│   │   │   │   │   └── SecurityConfig.java
│   │   │   │   ├── controller/          # API REST Endpoints
│   │   │   │   │   ├── CarritoController.java
│   │   │   │   │   ├── ProductoController.java
│   │   │   │   │   └── UsuarioController.java
│   │   │   │   ├── entity/              # Modelos de datos
│   │   │   │   │   ├── CarritoItem.java
│   │   │   │   │   ├── Producto.java
│   │   │   │   │   └── Usuario.java
│   │   │   │   ├── repository/          # Acceso a datos
│   │   │   │   │   ├── CarritoItemRepository.java
│   │   │   │   │   ├── ProductoRepository.java
│   │   │   │   │   └── UsuarioRepository.java
│   │   │   │   └── TiendaBalletBackendApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties      # Config desarrollo
│   │   │       └── application-prod.properties # Config producción
│   │   └── test/
│   ├── pom.xml                          # Dependencias Maven
│   └── target/                          # Archivos compilados
│
├── frontend/
│   ├── public/
│   │   └── imagenes/                    # Imágenes de productos
│   ├── src/
│   │   ├── components/                  # Componentes React
│   │   │   ├── AdminPanel.jsx
│   │   │   ├── Carrito.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductoCard.jsx
│   │   │   └── Registro.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx          # Estado global autenticación
│   │   ├── services/
│   │   │   └── api.js                   # Cliente HTTP (Axios)
│   │   ├── App.jsx                      # Componente principal
│   │   └── main.jsx                     # Punto de entrada
│   ├── package.json                     # Dependencias npm
│   └── vite.config.js                   # Configuración Vite
│
├── DEPLOY_AWS.md                        # Guía de deployment
└── README.md                            # Documentación principal
```

### 4.2 Separación de Responsabilidades

#### Backend (Capa de Servidor):
- **Controllers:** Manejan peticiones HTTP, validación de entrada, respuestas
- **Repositories:** Acceso a base de datos, queries JPA
- **Entities:** Modelos de datos (tablas de BD)
- **Config:** Seguridad, inicialización, JWT

#### Frontend (Capa de Cliente):
- **Components:** UI y lógica de presentación
- **Services:** Comunicación con API (Axios)
- **Context:** Estado global de la aplicación
- **Utils:** Funciones auxiliares

---

## 5. BACKEND - SPRING BOOT

### 5.1 Configuración del Proyecto

#### pom.xml - Dependencias Maven

```xml
<dependencies>
    <!-- Spring Boot Starters -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- MySQL Driver -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <scope>runtime</scope>
    </dependency>

    <!-- JWT -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.12.6</version>
    </dependency>
</dependencies>
```

**Justificación de cada dependencia:**
- `spring-boot-starter-data-jpa`: ORM (mapeo objeto-relacional) para trabajar con base de datos sin SQL directo
- `spring-boot-starter-security`: Autenticación, autorización, protección CSRF
- `spring-boot-starter-web`: API REST, servidor HTTP Tomcat embebido
- `mysql-connector-j`: Driver JDBC para conectar con MySQL
- `jjwt`: Crear y validar tokens JWT para autenticación stateless

### 5.2 Entidades (Modelos de Datos)

#### Producto.java

```java
@Entity
@Table(name = "productos")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private Integer precio;
    private String descripcion;
    private String imagen;
    private String categoria;

    // Getters y Setters
}
```

**Anotaciones explicadas:**
- `@Entity`: Marca la clase como entidad JPA (tabla de BD)
- `@Table`: Especifica nombre de tabla (opcional)
- `@Id`: Marca la clave primaria
- `@GeneratedValue`: Auto-incremento de ID en base de datos

#### Usuario.java

```java
@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    @Column(unique = true)
    private String email;

    private String password;  // Almacenada con BCrypt

    @Enumerated(EnumType.STRING)
    private Rol rol;  // USER o ADMIN

    public enum Rol {
        USER, ADMIN
    }
}
```

**Características de seguridad:**
- Email único (`unique = true`)
- Password hasheada con BCrypt (nunca en texto plano)
- Roles para autorización (USER/ADMIN)

#### CarritoItem.java

```java
@Entity
@Table(name = "carrito")
public class CarritoItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;

    private Integer cantidad;
}
```

**Relaciones explicadas:**
- `@ManyToOne`: Muchos items del carrito pertenecen a UN usuario
- `@ManyToOne`: Muchos items del carrito referencian UN producto
- `@JoinColumn`: Define la columna de clave foránea

### 5.3 Repositories (Acceso a Datos)

```java
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    List<Producto> findByCategoria(String categoria);
}

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username);
    Optional<Usuario> findByEmail(String email);
}

public interface CarritoItemRepository extends JpaRepository<CarritoItem, Long> {
    List<CarritoItem> findByUsuarioId(Long usuarioId);
    void deleteByUsuarioId(Long usuarioId);
}
```

**¿Por qué JpaRepository?**
- Proporciona métodos CRUD básicos automáticamente: save(), findById(), findAll(), delete()
- Permite queries personalizadas con nomenclatura de métodos
- Abstrae SQL (pero permite queries nativas si se necesitan)

### 5.4 Controllers (API REST)

#### ProductoController.java - Endpoints de Productos

```java
@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    // GET /api/productos - Obtener todos los productos
    @GetMapping
    public List<Producto> getProductos() {
        return productoRepository.findAll();
    }

    // GET /api/productos/{id} - Obtener un producto
    @GetMapping("/{id}")
    public ResponseEntity<Producto> getProductoPorId(@PathVariable Long id) {
        return productoRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/productos - Crear producto (solo admin)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Producto crearProducto(@RequestBody Producto producto) {
        return productoRepository.save(producto);
    }

    // PUT /api/productos/{id} - Actualizar producto (solo admin)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Producto> actualizarProducto(
        @PathVariable Long id,
        @RequestBody Producto productoActualizado
    ) {
        return productoRepository.findById(id)
            .map(producto -> {
                producto.setNombre(productoActualizado.getNombre());
                producto.setPrecio(productoActualizado.getPrecio());
                producto.setDescripcion(productoActualizado.getDescripcion());
                producto.setImagen(productoActualizado.getImagen());
                producto.setCategoria(productoActualizado.getCategoria());
                return ResponseEntity.ok(productoRepository.save(producto));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /api/productos/{id} - Eliminar producto (solo admin)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        if (productoRepository.existsById(id)) {
            productoRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
```

**Anotaciones explicadas:**
- `@RestController`: Marca la clase como controlador REST (responses en JSON)
- `@RequestMapping`: Define ruta base para todos los endpoints
- `@CrossOrigin`: Permite peticiones desde frontend (CORS)
- `@GetMapping`, `@PostMapping`, etc.: Mapean métodos HTTP
- `@PathVariable`: Extrae parámetros de la URL
- `@RequestBody`: Deserializa JSON del body a objeto Java
- `@PreAuthorize`: Autorización basada en roles

#### CarritoController.java - Gestión del Carrito

```java
@RestController
@RequestMapping("/api/carrito")
@CrossOrigin(origins = "*")
public class CarritoController {

    @Autowired
    private CarritoItemRepository carritoRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // GET /api/carrito/usuario/{usuarioId}
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<Map<String, Object>> getCarrito(@PathVariable Long usuarioId) {
        List<CarritoItem> items = carritoRepository.findByUsuarioId(usuarioId);

        int total = items.stream()
            .mapToInt(item -> item.getProducto().getPrecio() * item.getCantidad())
            .sum();

        Map<String, Object> response = new HashMap<>();
        response.put("items", items);
        response.put("total", total);

        return ResponseEntity.ok(response);
    }

    // POST /api/carrito - Agregar al carrito
    @PostMapping
    public ResponseEntity<CarritoItem> agregarAlCarrito(@RequestBody Map<String, Object> request) {
        Long usuarioId = Long.valueOf(request.get("usuarioId").toString());
        Long productoId = Long.valueOf(request.get("productoId").toString());
        Integer cantidad = Integer.valueOf(request.get("cantidad").toString());

        Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow();
        Producto producto = productoRepository.findById(productoId).orElseThrow();

        CarritoItem item = new CarritoItem();
        item.setUsuario(usuario);
        item.setProducto(producto);
        item.setCantidad(cantidad);

        return ResponseEntity.ok(carritoRepository.save(item));
    }

    // PUT /api/carrito/{id} - Actualizar cantidad
    @PutMapping("/{id}")
    public ResponseEntity<CarritoItem> actualizarCantidad(
        @PathVariable Long id,
        @RequestBody Map<String, Integer> request
    ) {
        return carritoRepository.findById(id)
            .map(item -> {
                item.setCantidad(request.get("cantidad"));
                return ResponseEntity.ok(carritoRepository.save(item));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /api/carrito/{id} - Eliminar item
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarDelCarrito(@PathVariable Long id) {
        if (carritoRepository.existsById(id)) {
            carritoRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
```

### 5.5 Seguridad y JWT

#### SecurityConfig.java

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // Deshabilitado para API REST
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/usuarios/login", "/api/usuarios/registro").permitAll()
                .requestMatchers("/api/productos/**").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Hasheado seguro de passwords
    }
}
```

**Configuraciones de seguridad:**
- CSRF deshabilitado (API REST no usa cookies de sesión)
- CORS configurado para permitir frontend
- Endpoints públicos: login, registro, productos
- Sesiones STATELESS (JWT en lugar de sesiones de servidor)
- BCrypt para hashear contraseñas (irreversible)

#### JwtUtil.java - Generación y Validación de Tokens

```java
@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String username, String rol) {
        return Jwts.builder()
            .setSubject(username)
            .claim("rol", rol)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSigningKey())
            .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }
}
```

**¿Cómo funciona JWT?**
1. Usuario hace login con username/password
2. Backend valida credenciales
3. Backend genera token JWT firmado con secret
4. Frontend guarda token (localStorage)
5. Frontend incluye token en header de cada petición: `Authorization: Bearer <token>`
6. Backend valida token en cada request
7. Token expira después de 24 horas

### 5.6 Configuración de Base de Datos

#### application.properties (Desarrollo Local)

```properties
# H2 Database para desarrollo local
spring.datasource.url=jdbc:h2:mem:tienda_ballet
spring.datasource.driver-class-name=org.h2.Driver
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect

# Hibernate auto-crea tablas al iniciar
spring.jpa.hibernate.ddl-auto=create-drop

# Ver SQL en consola (debugging)
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# H2 Console en navegador
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# JWT Configuration
jwt.secret=TiendaBallet2025SecretKeyParaJWT1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ
jwt.expiration=86400000  # 24 horas en milisegundos
```

#### application-prod.properties (Producción AWS)

```properties
# MySQL en AWS EC2
spring.datasource.url=jdbc:mysql://98.92.98.32:3306/tienda_ballet?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=America/Santiago
spring.datasource.username=admin
spring.datasource.password=adminpass
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Hibernate con MySQL
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true

# Deshabilitar H2 Console
spring.h2.console.enabled=false

# CORS abierto (para desarrollo)
cors.allowed-origins=*

# JWT (misma configuración que desarrollo)
jwt.secret=TiendaBallet2025SecretKeyParaJWT1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ
jwt.expiration=86400000
```

**¿Por qué dos archivos de configuración?**
- `application.properties`: Desarrollo local con H2 (base de datos en memoria)
- `application-prod.properties`: Producción con MySQL en AWS
- Spring Boot selecciona automáticamente según el profile activo

**Diferencias clave:**
- Desarrollo usa H2 (rápida, en memoria, se borra al apagar)
- Producción usa MySQL (persistente, en servidor remoto)
- `ddl-auto=create-drop`: Recrea tablas al iniciar (útil para desarrollo)

### 5.7 Inicialización de Datos (DataInitializer)

```java
@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Crear productos de prueba
        Producto p1 = new Producto();
        p1.setNombre("Zapatillas de Punta");
        p1.setPrecio(45000);
        p1.setDescripcion("Zapatillas profesionales para ballet clásico");
        p1.setImagen("/imagenes/zapatillaPunta.jpg");
        p1.setCategoria("zapatillas");
        productoRepository.save(p1);

        // ... más productos

        // Crear usuarios de prueba
        Usuario admin = new Usuario();
        admin.setUsername("admin");
        admin.setEmail("admin@ballet.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRol(Usuario.Rol.ADMIN);
        usuarioRepository.save(admin);

        Usuario user = new Usuario();
        user.setUsername("sofia");
        user.setEmail("sofia@ballet.com");
        user.setPassword(passwordEncoder.encode("12345"));
        user.setRol(Usuario.Rol.USER);
        usuarioRepository.save(user);
    }
}
```

**¿Por qué DataInitializer?**
- Carga datos de prueba automáticamente al iniciar
- Útil para desarrollo y demostraciones
- Se ejecuta después de crear tablas (`ddl-auto`)
- Permite probar la aplicación sin insertar datos manualmente

---

## 6. FRONTEND - REACT

### 6.1 Configuración del Proyecto

#### package.json - Dependencias

```json
{
  "name": "tienda-ballet-react",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.1.1",
    "axios": "^1.7.9",
    "bootstrap": "^5.3.3"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.5"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### 6.2 Servicio API (Comunicación con Backend)

#### services/api.js

```javascript
import axios from 'axios';

// URL del backend
const API_URL = 'http://localhost:8080/api';

// Instancia de Axios con configuración base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Agrega token JWT a cada petición
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor: Maneja errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado - limpiar localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
    }
    return Promise.reject(error);
  }
);

// ========== SERVICIOS DE AUTENTICACIÓN ==========

export const login = async (username, password) => {
  const response = await api.post('/usuarios/login', { username, password });

  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
  }

  return response.data;
};

export const registro = async (userData) => {
  const response = await api.post('/usuarios/registro', userData);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  window.location.href = '/';
};

// ========== SERVICIOS DE PRODUCTOS ==========

export const getProductos = async () => {
  const response = await api.get('/productos');
  return response.data;
};

export const getProductoPorId = async (id) => {
  const response = await api.get(`/productos/${id}`);
  return response.data;
};

export const crearProducto = async (producto) => {
  const response = await api.post('/productos', producto);
  return response.data;
};

export const actualizarProducto = async (id, producto) => {
  const response = await api.put(`/productos/${id}`, producto);
  return response.data;
};

export const eliminarProducto = async (id) => {
  const response = await api.delete(`/productos/${id}`);
  return response.data;
};

// ========== SERVICIOS DE CARRITO ==========

export const getCarrito = async (usuarioId) => {
  const response = await api.get(`/carrito/usuario/${usuarioId}`);
  return response.data;
};

export const agregarAlCarrito = async (usuarioId, productoId, cantidad = 1) => {
  const response = await api.post('/carrito', {
    usuarioId,
    productoId,
    cantidad,
  });
  return response.data;
};

export const actualizarCantidadCarrito = async (itemId, cantidad) => {
  const response = await api.put(`/carrito/${itemId}`, { cantidad });
  return response.data;
};

export const eliminarDelCarrito = async (itemId) => {
  const response = await api.delete(`/carrito/${itemId}`);
  return response.data;
};

export const vaciarCarrito = async (usuarioId) => {
  const response = await api.delete(`/carrito/usuario/${usuarioId}`);
  return response.data;
};

export default api;
```

**Conceptos clave:**
- **Interceptores:** Código que se ejecuta antes/después de cada request
- **localStorage:** Almacenamiento persistente en el navegador (token JWT)
- **Axios instance:** Cliente HTTP configurado (base URL, headers)
- **Async/await:** Manejo de operaciones asíncronas (llamadas HTTP)

### 6.3 Context API - Estado Global de Autenticación

#### context/AuthContext.jsx

```javascript
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    const token = localStorage.getItem('token');

    if (usuarioGuardado && token) {
      setUsuario(JSON.parse(usuarioGuardado));
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const login = (usuarioData, token) => {
    localStorage.setItem('usuario', JSON.stringify(usuarioData));
    localStorage.setItem('token', token);
    setUsuario(usuarioData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    setUsuario(null);
    setIsAuthenticated(false);
  };

  const value = {
    usuario,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
```

**¿Por qué Context API?**
- Evita prop drilling (pasar props por muchos niveles)
- Estado global accesible desde cualquier componente
- Más simple que Redux para aplicaciones pequeñas/medianas
- Ideal para autenticación (estado compartido en toda la app)

### 6.4 Componentes Principales

#### Home.jsx - Catálogo de Productos

```javascript
import React, { useState, useEffect } from 'react';
import { getProductos } from '../services/api';
import ProductoCard from './ProductoCard';

function Home() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaFiltro, setCategoriaFiltro] = useState('todos');

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const data = await getProductos();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const productosFiltrados = categoriaFiltro === 'todos'
    ? productos
    : productos.filter(p => p.categoria === categoriaFiltro);

  if (loading) return <div>Cargando productos...</div>;

  return (
    <div className="container mt-4">
      <h1>Catálogo de Productos</h1>

      {/* Filtro por categoría */}
      <div className="mb-4">
        <button onClick={() => setCategoriaFiltro('todos')}>Todos</button>
        <button onClick={() => setCategoriaFiltro('zapatillas')}>Zapatillas</button>
        <button onClick={() => setCategoriaFiltro('ropa')}>Ropa</button>
        <button onClick={() => setCategoriaFiltro('accesorios')}>Accesorios</button>
      </div>

      {/* Grid de productos */}
      <div className="row">
        {productosFiltrados.map(producto => (
          <div key={producto.id} className="col-md-4 mb-4">
            <ProductoCard producto={producto} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
```

#### ProductoCard.jsx - Tarjeta de Producto

```javascript
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { agregarAlCarrito } from '../services/api';

function ProductoCard({ producto }) {
  const { usuario, isAuthenticated } = useAuth();

  const handleAgregarCarrito = async () => {
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para agregar al carrito');
      return;
    }

    try {
      await agregarAlCarrito(usuario.id, producto.id, 1);
      alert('Producto agregado al carrito');
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      alert('Error al agregar producto');
    }
  };

  return (
    <div className="card h-100">
      <img
        src={producto.imagen}
        className="card-img-top"
        alt={producto.nombre}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">{producto.descripcion}</p>
        <p className="card-text">
          <strong>${producto.precio.toLocaleString('es-CL')}</strong>
        </p>
        <button
          className="btn btn-primary w-100"
          onClick={handleAgregarCarrito}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}

export default ProductoCard;
```

#### Login.jsx - Formulario de Login

```javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as loginService } from '../services/api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await loginService(username, password);
      login(response.usuario, response.token);
      navigate('/');
    } catch (error) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Iniciar Sesión</h2>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Ingresar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
```

#### Carrito.jsx - Visualización del Carrito

```javascript
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getCarrito,
  actualizarCantidadCarrito,
  eliminarDelCarrito,
  vaciarCarrito
} from '../services/api';

function Carrito() {
  const { usuario } = useAuth();
  const [carrito, setCarrito] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarCarrito();
  }, []);

  const cargarCarrito = async () => {
    try {
      const data = await getCarrito(usuario.id);
      setCarrito(data);
    } catch (error) {
      console.error('Error al cargar carrito:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleActualizarCantidad = async (itemId, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;

    try {
      await actualizarCantidadCarrito(itemId, nuevaCantidad);
      await cargarCarrito();  // Recargar carrito
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
    }
  };

  const handleEliminar = async (itemId) => {
    try {
      await eliminarDelCarrito(itemId);
      await cargarCarrito();
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  const handleVaciar = async () => {
    if (!window.confirm('¿Vaciar todo el carrito?')) return;

    try {
      await vaciarCarrito(usuario.id);
      await cargarCarrito();
    } catch (error) {
      console.error('Error al vaciar carrito:', error);
    }
  };

  if (loading) return <div>Cargando carrito...</div>;

  if (carrito.items.length === 0) {
    return (
      <div className="container mt-5">
        <h2>Carrito de Compras</h2>
        <p>Tu carrito está vacío</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Carrito de Compras</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carrito.items.map(item => (
            <tr key={item.id}>
              <td>{item.producto.nombre}</td>
              <td>${item.producto.precio.toLocaleString('es-CL')}</td>
              <td>
                <button onClick={() => handleActualizarCantidad(item.id, item.cantidad - 1)}>
                  -
                </button>
                <span className="mx-2">{item.cantidad}</span>
                <button onClick={() => handleActualizarCantidad(item.id, item.cantidad + 1)}>
                  +
                </button>
              </td>
              <td>
                ${(item.producto.precio * item.cantidad).toLocaleString('es-CL')}
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleEliminar(item.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-end"><strong>Total:</strong></td>
            <td><strong>${carrito.total.toLocaleString('es-CL')}</strong></td>
            <td></td>
          </tr>
        </tfoot>
      </table>

      <div className="d-flex justify-content-between">
        <button className="btn btn-danger" onClick={handleVaciar}>
          Vaciar Carrito
        </button>
        <button className="btn btn-success">
          Proceder al Pago
        </button>
      </div>
    </div>
  );
}

export default Carrito;
```

### 6.5 Enrutamiento

#### App.jsx - Rutas de la Aplicación

```javascript
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Registro from './components/Registro';
import Carrito from './components/Carrito';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />

          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
```

**React Router conceptos:**
- `BrowserRouter`: Habilita navegación sin recargar página (SPA)
- `Routes`: Contenedor de rutas
- `Route`: Define mapeo URL → Componente
- Navegación: `<Link to="/ruta">` o `navigate('/ruta')`

---

## 7. BASE DE DATOS MYSQL

### 7.1 Esquema de Base de Datos

```sql
-- Base de datos
CREATE DATABASE tienda_ballet;
USE tienda_ballet;

-- Tabla: productos
CREATE TABLE productos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio INT NOT NULL,
    descripcion TEXT,
    imagen VARCHAR(500),
    categoria VARCHAR(100)
);

-- Tabla: usuarios
CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,  -- BCrypt hash
    rol VARCHAR(20) NOT NULL         -- 'USER' o 'ADMIN'
);

-- Tabla: carrito
CREATE TABLE carrito (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    producto_id BIGINT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

-- Índices para mejorar rendimiento
CREATE INDEX idx_carrito_usuario ON carrito(usuario_id);
CREATE INDEX idx_carrito_producto ON carrito(producto_id);
CREATE INDEX idx_productos_categoria ON productos(categoria);
```

### 7.2 Relaciones Entre Tablas

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   usuarios   │         │   carrito    │         │  productos   │
├──────────────┤         ├──────────────┤         ├──────────────┤
│ id (PK)      │◄────────│ usuario_id   │         │ id (PK)      │
│ username     │         │ producto_id  │────────►│ nombre       │
│ email        │         │ cantidad     │         │ precio       │
│ password     │         │ id (PK)      │         │ descripcion  │
│ rol          │         └──────────────┘         │ imagen       │
└──────────────┘                                  │ categoria    │
                                                  └──────────────┘

Relaciones:
- carrito.usuario_id → usuarios.id (Many-to-One)
- carrito.producto_id → productos.id (Many-to-One)
- ON DELETE CASCADE: Si se elimina usuario/producto, se eliminan sus items del carrito
```

### 7.3 Datos de Ejemplo

```sql
-- Productos
INSERT INTO productos (nombre, precio, descripcion, imagen, categoria) VALUES
('Zapatillas de Punta', 45000, 'Zapatillas profesionales para ballet clásico', '/imagenes/zapatillaPunta.jpg', 'zapatillas'),
('Malla Negra', 25000, 'Malla cómoda para clases de ballet', '/imagenes/malla_negra.webp', 'ropa'),
('Zapatillas Media Punta', 30000, 'Ideales para principiantes', '/imagenes/zapatilaMediaPunta.jpeg', 'zapatillas'),
('Polainas', 15000, 'Mantén tus piernas calientes durante el entrenamiento', '/imagenes/polainas.jpg', 'accesorios'),
('Falda de Ballet', 18000, 'Falda ligera para practicar', '/imagenes/faldaBallet.jpg', 'ropa'),
('Accesorios Ballet', 12000, 'Set de accesorios para ballet', '/imagenes/accesorios.jpg', 'accesorios');

-- Usuarios (passwords hasheadas con BCrypt)
INSERT INTO usuarios (username, email, password, rol) VALUES
('admin', 'admin@ballet.com', '$2a$10$...', 'ADMIN'),
('sofia', 'sofia@ballet.com', '$2a$10$...', 'USER'),
('lanadelrey', 'lana@ballet.com', '$2a$10$...', 'USER');

-- Items del carrito (ejemplo)
INSERT INTO carrito (usuario_id, producto_id, cantidad) VALUES
(2, 1, 2),  -- Sofia compró 2 zapatillas de punta
(2, 3, 1);  -- Sofia compró 1 malla negra
```

### 7.4 Queries Comunes

```sql
-- Obtener todos los productos
SELECT * FROM productos;

-- Obtener productos por categoría
SELECT * FROM productos WHERE categoria = 'zapatillas';

-- Obtener carrito de un usuario con detalles de productos
SELECT
    c.id as carrito_id,
    c.cantidad,
    p.nombre,
    p.precio,
    (c.cantidad * p.precio) as subtotal
FROM carrito c
JOIN productos p ON c.producto_id = p.id
WHERE c.usuario_id = 2;

-- Calcular total del carrito
SELECT SUM(c.cantidad * p.precio) as total
FROM carrito c
JOIN productos p ON c.producto_id = p.id
WHERE c.usuario_id = 2;

-- Verificar si usuario existe (para login)
SELECT id, username, email, password, rol
FROM usuarios
WHERE username = 'admin';

-- Contar productos por categoría
SELECT categoria, COUNT(*) as cantidad
FROM productos
GROUP BY categoria;
```

---

## 8. API REST - COMUNICACIÓN FRONTEND-BACKEND

### 8.1 ¿Qué es una API REST?

**REST** (Representational State Transfer) es un estilo de arquitectura para APIs web que usa:
- **HTTP** como protocolo de comunicación
- **JSON** como formato de datos
- **Métodos HTTP** para operaciones CRUD:
  - GET: Leer datos
  - POST: Crear datos
  - PUT: Actualizar datos
  - DELETE: Eliminar datos

### 8.2 Endpoints Implementados

#### Productos

| Método | Endpoint | Descripción | Auth | Rol |
|--------|----------|-------------|------|-----|
| GET | `/api/productos` | Obtener todos los productos | No | - |
| GET | `/api/productos/{id}` | Obtener un producto | No | - |
| GET | `/api/productos/categoria/{cat}` | Productos por categoría | No | - |
| POST | `/api/productos` | Crear producto | Sí | ADMIN |
| PUT | `/api/productos/{id}` | Actualizar producto | Sí | ADMIN |
| DELETE | `/api/productos/{id}` | Eliminar producto | Sí | ADMIN |

#### Usuarios

| Método | Endpoint | Descripción | Auth | Rol |
|--------|----------|-------------|------|-----|
| POST | `/api/usuarios/registro` | Registrar usuario | No | - |
| POST | `/api/usuarios/login` | Iniciar sesión | No | - |
| POST | `/api/usuarios/validar-token` | Validar JWT | Sí | - |
| GET | `/api/usuarios` | Listar usuarios | Sí | ADMIN |
| GET | `/api/usuarios/{id}` | Obtener usuario | Sí | ADMIN |
| PUT | `/api/usuarios/{id}` | Actualizar usuario | Sí | ADMIN |
| DELETE | `/api/usuarios/{id}` | Eliminar usuario | Sí | ADMIN |

#### Carrito

| Método | Endpoint | Descripción | Auth | Rol |
|--------|----------|-------------|------|-----|
| GET | `/api/carrito/usuario/{id}` | Obtener carrito | Sí | USER/ADMIN |
| POST | `/api/carrito` | Agregar item | Sí | USER/ADMIN |
| PUT | `/api/carrito/{id}` | Actualizar cantidad | Sí | USER/ADMIN |
| DELETE | `/api/carrito/{id}` | Eliminar item | Sí | USER/ADMIN |
| DELETE | `/api/carrito/usuario/{id}` | Vaciar carrito | Sí | USER/ADMIN |

### 8.3 Formato de Peticiones y Respuestas

#### Ejemplo: Login

**Request (Frontend → Backend):**
```http
POST http://localhost:8080/api/usuarios/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Response (Backend → Frontend):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "username": "admin",
    "email": "admin@ballet.com",
    "rol": "ADMIN"
  }
}
```

#### Ejemplo: Obtener Productos

**Request:**
```http
GET http://localhost:8080/api/productos
```

**Response:**
```json
[
  {
    "id": 1,
    "nombre": "Zapatillas de Punta",
    "precio": 45000,
    "descripcion": "Zapatillas profesionales para ballet clásico",
    "imagen": "/imagenes/zapatillaPunta.jpg",
    "categoria": "zapatillas"
  },
  {
    "id": 2,
    "nombre": "Malla Negra",
    "precio": 25000,
    "descripcion": "Malla cómoda para clases de ballet",
    "imagen": "/imagenes/malla_negra.webp",
    "categoria": "ropa"
  }
]
```

#### Ejemplo: Agregar al Carrito (con JWT)

**Request:**
```http
POST http://localhost:8080/api/carrito
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "usuarioId": 2,
  "productoId": 1,
  "cantidad": 2
}
```

**Response:**
```json
{
  "id": 15,
  "usuario": {
    "id": 2,
    "username": "sofia"
  },
  "producto": {
    "id": 1,
    "nombre": "Zapatillas de Punta",
    "precio": 45000
  },
  "cantidad": 2
}
```

### 8.4 Códigos de Estado HTTP

| Código | Significado | Uso en la API |
|--------|-------------|---------------|
| 200 OK | Éxito | GET, PUT, DELETE exitosos |
| 201 Created | Creado | POST exitoso (recurso creado) |
| 400 Bad Request | Petición inválida | Datos de entrada incorrectos |
| 401 Unauthorized | No autenticado | Token faltante o inválido |
| 403 Forbidden | No autorizado | Usuario sin permisos |
| 404 Not Found | No encontrado | Recurso no existe |
| 500 Internal Server Error | Error del servidor | Excepción no manejada |

---

## 9. AUTENTICACIÓN Y SEGURIDAD (JWT)

### 9.1 ¿Por qué JWT?

**Problema con sesiones tradicionales:**
- Backend debe mantener sesiones en memoria
- No escala bien (múltiples servidores)
- Requiere cookies y CSRF protection

**Solución con JWT:**
- **Stateless**: Backend no guarda estado de sesión
- Token contiene toda la información necesaria
- Escalable horizontalmente
- Compatible con arquitecturas distribuidas

### 9.2 Estructura de un JWT

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsInJvbCI6IkFETUlOIiwiaWF0IjoxNzA2MDAwMDAwLCJleHAiOjE3MDYwODY0MDB9.5F7J8K9L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6

│                  Header                 │                    Payload                    │           Signature          │
```

**Header (metadatos):**
```json
{
  "alg": "HS256",  // Algoritmo de firma
  "typ": "JWT"     // Tipo de token
}
```

**Payload (datos):**
```json
{
  "sub": "admin",           // Subject (usuario)
  "rol": "ADMIN",           // Rol del usuario
  "iat": 1706000000,        // Issued At (timestamp)
  "exp": 1706086400         // Expiration (24h después)
}
```

**Signature (firma digital):**
```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
```

**Características importantes:**
- ✅ **Verificable**: Firma digital garantiza integridad
- ✅ **Auto-contenido**: Incluye información del usuario
- ❌ **No encriptado**: Payload es legible (no poner datos sensibles)
- ⏰ **Expirable**: Token tiene tiempo de vida limitado

### 9.3 Flujo de Autenticación

```
┌─────────────┐                                    ┌─────────────┐
│   FRONTEND  │                                    │   BACKEND   │
└──────┬──────┘                                    └──────┬──────┘
       │                                                  │
       │  1. POST /api/usuarios/login                    │
       │     { username, password }                      │
       ├────────────────────────────────────────────────►│
       │                                                  │
       │                         2. Validar credenciales │
       │                            (BCrypt compare)     │
       │                                                  │
       │  3. Response con token JWT                      │
       │     { token, usuario }                          │
       │◄────────────────────────────────────────────────┤
       │                                                  │
       │  4. Guardar en localStorage                     │
       │     localStorage.setItem('token', token)        │
       │                                                  │
       │  5. GET /api/carrito/usuario/2                  │
       │     Authorization: Bearer <token>               │
       ├────────────────────────────────────────────────►│
       │                                                  │
       │                           6. Validar token JWT  │
       │                              (firma + expiración)│
       │                                                  │
       │  7. Response con datos                          │
       │     { items: [...], total: 90000 }              │
       │◄────────────────────────────────────────────────┤
       │                                                  │
```

### 9.4 Seguridad Implementada

#### Protección de Contraseñas: BCrypt

```java
// Al registrar usuario
String passwordHasheada = passwordEncoder.encode("admin123");
// Resultado: $2a$10$AbC123XyZ... (irreversible)

// Al hacer login
boolean coincide = passwordEncoder.matches("admin123", passwordHasheada);
```

**¿Por qué BCrypt?**
- Hasheado irreversible (no se puede desencriptar)
- Salt automático (diferentes hashes para misma password)
- Adaptativo (se puede aumentar complejidad con el tiempo)
- Resistente a ataques de fuerza bruta

#### CORS (Cross-Origin Resource Sharing)

```java
@CrossOrigin(origins = "*")  // Permite peticiones desde cualquier origen
```

**En producción cambiar a:**
```java
@CrossOrigin(origins = "https://mi-tienda-ballet.com")
```

#### CSRF Protection

Deshabilitado porque usamos JWT (no cookies de sesión):
```java
http.csrf(csrf -> csrf.disable())
```

**Seguro porque:**
- JWT en header Authorization (no en cookie)
- No vulnerable a CSRF (atacante no puede obtener token)

---

## 10. FLUJO DE DATOS COMPLETO

### 10.1 Ejemplo Completo: Agregar Producto al Carrito

#### Paso 1: Usuario hace clic en "Agregar al Carrito"

**ProductoCard.jsx:**
```javascript
const handleAgregarCarrito = async () => {
  // Validar autenticación
  if (!isAuthenticated) {
    alert('Debes iniciar sesión');
    return;
  }

  // Llamar servicio API
  await agregarAlCarrito(usuario.id, producto.id, 1);
};
```

#### Paso 2: Frontend llama a servicio API

**services/api.js:**
```javascript
export const agregarAlCarrito = async (usuarioId, productoId, cantidad) => {
  // Axios interceptor agrega automáticamente:
  // Authorization: Bearer <token>

  const response = await api.post('/carrito', {
    usuarioId,
    productoId,
    cantidad
  });

  return response.data;
};
```

#### Paso 3: Request HTTP al Backend

```http
POST http://localhost:8080/api/carrito
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "usuarioId": 2,
  "productoId": 1,
  "cantidad": 1
}
```

#### Paso 4: Backend procesa la petición

**CarritoController.java:**
```java
@PostMapping
public ResponseEntity<CarritoItem> agregarAlCarrito(@RequestBody Map<String, Object> request) {
    // 1. Extraer datos del request
    Long usuarioId = Long.valueOf(request.get("usuarioId").toString());
    Long productoId = Long.valueOf(request.get("productoId").toString());
    Integer cantidad = Integer.valueOf(request.get("cantidad").toString());

    // 2. Buscar usuario y producto en BD
    Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow();
    Producto producto = productoRepository.findById(productoId).orElseThrow();

    // 3. Crear item del carrito
    CarritoItem item = new CarritoItem();
    item.setUsuario(usuario);
    item.setProducto(producto);
    item.setCantidad(cantidad);

    // 4. Guardar en base de datos
    CarritoItem itemGuardado = carritoRepository.save(item);

    // 5. Retornar respuesta
    return ResponseEntity.ok(itemGuardado);
}
```

#### Paso 5: Repository guarda en Base de Datos

**JPA/Hibernate genera y ejecuta SQL:**
```sql
INSERT INTO carrito (usuario_id, producto_id, cantidad)
VALUES (2, 1, 1);
```

#### Paso 6: Response HTTP al Frontend

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 15,
  "usuario": {
    "id": 2,
    "username": "sofia",
    "email": "sofia@ballet.com",
    "rol": "USER"
  },
  "producto": {
    "id": 1,
    "nombre": "Zapatillas de Punta",
    "precio": 45000,
    "descripcion": "Zapatillas profesionales para ballet clásico",
    "imagen": "/imagenes/zapatillaPunta.jpg",
    "categoria": "zapatillas"
  },
  "cantidad": 1
}
```

#### Paso 7: Frontend muestra confirmación

```javascript
try {
  await agregarAlCarrito(usuario.id, producto.id, 1);
  alert('Producto agregado al carrito ✅');
} catch (error) {
  alert('Error al agregar producto ❌');
}
```

### 10.2 Diagrama de Flujo Completo

```
┌──────────────────────────────────────────────────────────────────┐
│                    FLUJO COMPLETO DE DATOS                        │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  [Usuario] ──► [ProductoCard.jsx] ──► [api.js]                  │
│                                          │                        │
│                                          │ HTTP POST              │
│                                          │ JSON + JWT             │
│                                          ▼                        │
│                                 [CarritoController.java]          │
│                                          │                        │
│                                          │ Validar JWT            │
│                                          │ Procesar request       │
│                                          ▼                        │
│                                 [CarritoItemRepository]           │
│                                          │                        │
│                                          │ JPA/Hibernate          │
│                                          ▼                        │
│                                 [MySQL Database]                  │
│                                          │                        │
│                                          │ INSERT INTO carrito    │
│                                          │                        │
│                                          ▼                        │
│                                 [Response JSON] ──► [Frontend]    │
│                                                          │         │
│                                                          │         │
│                                                    [Alert + UI]   │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### 10.3 Tecnologías en Cada Capa

```
┌─────────────────────┬──────────────────────┬────────────────────┐
│      FRONTEND       │       BACKEND        │      DATABASE      │
├─────────────────────┼──────────────────────┼────────────────────┤
│ React (UI)          │ Spring Boot (Server) │ MySQL (Storage)    │
│ Axios (HTTP Client) │ Spring Security(Auth)│ Docker (Container) │
│ Context API (State) │ JPA/Hibernate (ORM)  │ JDBC (Connection)  │
│ React Router (Nav)  │ JWT (Tokens)         │ SQL (Queries)      │
│ Bootstrap (CSS)     │ BCrypt (Passwords)   │                    │
│ localStorage (Token)│ Tomcat (HTTP Server) │                    │
└─────────────────────┴──────────────────────┴────────────────────┘
```

---

## 11. DEPLOYMENT EN AWS

### 11.1 Arquitectura de Deployment

```
┌────────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT ARCHITECTURE                      │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐         ┌──────────────────────────────┐    │
│  │   MAC LOCAL  │         │         AWS EC2              │    │
│  ├──────────────┤         ├──────────────────────────────┤    │
│  │              │         │                              │    │
│  │  Frontend    │         │  Docker Container            │    │
│  │  (Vite Dev)  │         │  ┌────────────────────────┐  │    │
│  │  Port: 5173  │         │  │ MySQL 9.6              │  │    │
│  │              │         │  │ Port: 3306             │  │    │
│  ├──────────────┤         │  │ User: admin            │  │    │
│  │              │         │  │ Pass: adminpass        │  │    │
│  │  Backend     │◄────────┼──│ DB: tienda_ballet      │  │    │
│  │  (Spring)    │  JDBC   │  └────────────────────────┘  │    │
│  │  Port: 8080  │         │                              │    │
│  │              │         │  IP: 98.92.98.32             │    │
│  └──────────────┘         │  Security Group: sg-xxx      │    │
│                           └──────────────────────────────┘    │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

**Decisión de arquitectura:**
- **Frontend y Backend en Mac**: Desarrollo más rápido, hot reload
- **MySQL en AWS EC2**: Base de datos persistente en la nube
- **Docker para MySQL**: Aislamiento, fácil recreación

### 11.2 Creación de Instancia EC2

#### Paso 1: Configuración de la Instancia

```
AMI: Ubuntu Server 24.04 LTS
Tipo de instancia: t2.micro (1 vCPU, 1 GB RAM)
Par de claves: clave-tienda-ballet-prueba3.pem
Storage: 8 GB gp2
```

#### Paso 2: Security Group

```
Regla 1: SSH
  - Type: SSH
  - Protocol: TCP
  - Port: 22
  - Source: My IP (para conexión segura)

Regla 2: MySQL
  - Type: MYSQL/Aurora
  - Protocol: TCP
  - Port: 3306
  - Source: 0.0.0.0/0 (abierto para desarrollo)
```

### 11.3 Instalación de Docker y MySQL

#### Conectar a EC2 vía SSH

```bash
# Dar permisos al archivo .pem
chmod 400 /Users/sofiacortese/Downloads/clave-tienda-ballet-prueba3.pem

# Conectar a EC2
ssh -i /Users/sofiacortese/Downloads/clave-tienda-ballet-prueba3.pem ubuntu@98.92.98.32
```

#### Instalar Docker

```bash
# Instalar Docker via snap
sudo snap install docker

# Verificar instalación
docker --version
```

#### Crear Container MySQL

```bash
sudo docker run -d \
  --name mysql-db \
  -e MYSQL_ROOT_PASSWORD=tu_password \
  -e MYSQL_DATABASE=tienda_ballet \
  -e MYSQL_USER=admin \
  -e MYSQL_PASSWORD=adminpass \
  -p 3306:3306 \
  mysql:latest

# Verificar que está corriendo
sudo docker ps

# Ver logs
sudo docker logs mysql-db
```

**Explicación de parámetros:**
- `-d`: Detached (background)
- `--name mysql-db`: Nombre del container
- `-e`: Variables de entorno (configuración)
- `-p 3306:3306`: Mapeo de puertos (host:container)
- `mysql:latest`: Imagen de Docker Hub

#### Verificar Base de Datos

```bash
# Entrar al container
sudo docker exec -it mysql-db bash

# Conectar a MySQL
mysql -u admin -padminpass

# Verificar base de datos
SHOW DATABASES;
USE tienda_ballet;
SHOW TABLES;
```

### 11.4 Configuración del Backend para Producción

#### Actualizar application-prod.properties

```properties
# IP pública de EC2 (cambia con cada reinicio de AWS Academy)
spring.datasource.url=jdbc:mysql://98.92.98.32:3306/tienda_ballet?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=America/Santiago
spring.datasource.username=admin
spring.datasource.password=adminpass

spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=create-drop
```

#### Compilar Backend

```bash
cd /Users/sofiacortese/Desktop/aprendizaje_fullstack/tienda-de-ballet-fullstack2/backend

# Compilar con Maven (saltar tests)
./mvnw clean package -DskipTests
```

#### Ejecutar Backend con Profile de Producción

```bash
java -jar target/tienda-ballet-backend-0.0.1-SNAPSHOT.jar \
  --spring.profiles.active=prod
```

**Resultado esperado:**
```
Started TiendaBalletBackendApplication in 18.005 seconds
Tomcat started on port 8080
```

### 11.5 Conectar MySQL Workbench

```
Connection Name: Tienda Ballet AWS
Hostname: 98.92.98.32
Port: 3306
Username: admin
Password: adminpass
Default Schema: tienda_ballet
```

**Pasos:**
1. Abrir MySQL Workbench
2. Click en ícono de herramienta (🔧)
3. Crear nueva conexión con datos de arriba
4. Test Connection → Continue Anyway (advertencia de versión)
5. Doble click para conectar
6. Ver tablas: productos, usuarios, carrito

---

## 12. PROCEDIMIENTOS DE USO

### 12.1 Desarrollo Local

#### Iniciar Backend (Desarrollo con H2)

```bash
cd /Users/sofiacortese/Desktop/aprendizaje_fullstack/tienda-de-ballet-fullstack2/backend

# Ejecutar sin especificar profile (usa application.properties)
./mvnw spring-boot:run

# O compilar y ejecutar JAR
./mvnw clean package -DskipTests
java -jar target/tienda-ballet-backend-0.0.1-SNAPSHOT.jar
```

**Backend disponible en:** http://localhost:8080

#### Iniciar Frontend

```bash
cd /Users/sofiacortese/Desktop/aprendizaje_fullstack/tienda-de-ballet-fullstack2/frontend

# Instalar dependencias (solo primera vez)
npm install

# Iniciar servidor de desarrollo
npm run dev
```

**Frontend disponible en:** http://localhost:5173

#### Probar Endpoints con cURL

```bash
# Obtener productos
curl http://localhost:8080/api/productos

# Login
curl -X POST http://localhost:8080/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Crear producto (necesita token)
curl -X POST http://localhost:8080/api/productos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "nombre": "Tutú Rosa",
    "precio": 75000,
    "descripcion": "Tutú profesional",
    "imagen": "/imagenes/tutu.jpg",
    "categoria": "ropa"
  }'
```

### 12.2 Deployment a Producción (AWS)

#### Procedimiento Completo

**1. Iniciar AWS Academy Lab**
```
- Ir a AWS Academy
- Clic en "Start Lab"
- Esperar luz verde
- Clic en "AWS Console"
```

**2. Obtener IP pública de EC2**
```
- EC2 → Instances
- Seleccionar instancia "tienda-ballet-ec2"
- Copiar "Public IPv4 address" (ej: 98.92.98.32)
```

**3. Conectar a EC2 y verificar/iniciar MySQL**
```bash
# SSH a EC2
ssh -i /Users/sofiacortese/Downloads/clave-tienda-ballet-prueba3.pem ubuntu@98.92.98.32

# Verificar containers
sudo docker ps -a

# Si MySQL está detenido, iniciarlo
sudo docker start mysql-db

# Verificar que está corriendo
sudo docker ps

# Verificar base de datos
sudo docker exec mysql-db mysql -u admin -padminpass -e "SHOW DATABASES;"
```

**4. Actualizar IP en Backend**
```bash
# En tu Mac
cd /Users/sofiacortese/Desktop/aprendizaje_fullstack/tienda-de-ballet-fullstack2/backend

# Editar src/main/resources/application-prod.properties
# Cambiar IP antigua por nueva IP pública

# Ejemplo:
spring.datasource.url=jdbc:mysql://98.92.98.32:3306/tienda_ballet...
```

**5. Recompilar Backend**
```bash
./mvnw clean package -DskipTests
```

**6. Detener backend anterior (si está corriendo)**
```bash
# Buscar proceso en puerto 8080
lsof -i :8080 | grep LISTEN

# Matar proceso (reemplazar PID)
kill <PID>
```

**7. Iniciar Backend con perfil de producción**
```bash
java -jar target/tienda-ballet-backend-0.0.1-SNAPSHOT.jar \
  --spring.profiles.active=prod
```

**8. Verificar funcionamiento**
```bash
# En otra terminal
curl http://localhost:8080/api/productos
```

**9. Conectar MySQL Workbench (opcional)**
```
- Hostname: <NUEVA_IP>
- Port: 3306
- Username: admin
- Password: adminpass
```

### 12.3 Procedimiento de Reconexión (AWS reinició)

**Cuando AWS Academy expira (cada 4 horas):**

```bash
# PASO 1: Obtener nueva IP de AWS Console
# Ejemplo: 44.220.180.38 → 98.92.98.32

# PASO 2: Actualizar application-prod.properties
# Cambiar línea 5:
spring.datasource.url=jdbc:mysql://98.92.98.32:3306/...

# PASO 3: Reconectar a EC2
ssh -o StrictHostKeyChecking=no \
  -i /Users/sofiacortese/Downloads/clave-tienda-ballet-prueba3.pem \
  ubuntu@98.92.98.32

# PASO 4: Reiniciar MySQL container
sudo docker start mysql-db
sudo docker ps  # Verificar que está Up

# PASO 5: Recompilar backend en Mac
cd /Users/sofiacortese/Desktop/aprendizaje_fullstack/tienda-de-ballet-fullstack2/backend
./mvnw clean package -DskipTests

# PASO 6: Detener backend anterior
lsof -i :8080 | grep LISTEN | awk '{print $2}' | xargs kill

# PASO 7: Iniciar backend nuevo
java -jar target/tienda-ballet-backend-0.0.1-SNAPSHOT.jar \
  --spring.profiles.active=prod

# PASO 8: Verificar
curl http://localhost:8080/api/productos
```

**Tiempo estimado:** 5-10 minutos

---

## 13. PRUEBAS Y VERIFICACIÓN

### 13.1 Checklist de Funcionalidades

#### Backend (API REST)

- [ ] **GET /api/productos** - Retorna lista de productos
- [ ] **POST /api/usuarios/login** - Login exitoso con credenciales válidas
- [ ] **POST /api/usuarios/login** - Error con credenciales inválidas
- [ ] **POST /api/usuarios/registro** - Crea nuevo usuario
- [ ] **GET /api/carrito/usuario/{id}** - Retorna carrito del usuario
- [ ] **POST /api/carrito** - Agrega producto al carrito
- [ ] **PUT /api/carrito/{id}** - Actualiza cantidad
- [ ] **DELETE /api/carrito/{id}** - Elimina item del carrito
- [ ] **POST /api/productos** (admin) - Crea producto
- [ ] **PUT /api/productos/{id}** (admin) - Actualiza producto
- [ ] **DELETE /api/productos/{id}** (admin) - Elimina producto

#### Frontend (React)

- [ ] Página principal muestra catálogo de productos
- [ ] Filtro por categoría funciona
- [ ] Formulario de login funciona
- [ ] Formulario de registro funciona
- [ ] Agregar al carrito funciona (usuario logueado)
- [ ] Ver carrito muestra productos agregados
- [ ] Actualizar cantidad en carrito funciona
- [ ] Eliminar producto del carrito funciona
- [ ] Vaciar carrito funciona
- [ ] Panel de administración (solo admin)
- [ ] Logout funciona y limpia estado

#### Base de Datos

- [ ] Conexión a MySQL exitosa
- [ ] Tablas creadas correctamente (productos, usuarios, carrito)
- [ ] Datos iniciales insertados (6 productos, 3 usuarios)
- [ ] Foreign keys funcionan (relaciones entre tablas)
- [ ] Datos persisten después de reiniciar backend
- [ ] MySQL Workbench puede conectarse y visualizar datos

#### Integración Completa

- [ ] Frontend → Backend → Database (flujo completo)
- [ ] JWT authentication funciona end-to-end
- [ ] CORS permite peticiones desde frontend
- [ ] Datos en carrito se guardan en MySQL (no localStorage)
- [ ] Cambios en MySQL Workbench se reflejan en frontend

### 13.2 Usuarios de Prueba

```
Admin:
  Username: admin
  Password: admin123
  Rol: ADMIN

Usuario Regular 1:
  Username: sofia
  Password: 12345
  Rol: USER

Usuario Regular 2:
  Username: lanadelrey
  Password: lana123
  Rol: USER
```

### 13.3 Datos de Prueba (Productos)

```
1. Zapatillas de Punta - $45.000 (zapatillas)
2. Malla Negra - $25.000 (ropa)
3. Zapatillas Media Punta - $30.000 (zapatillas)
4. Polainas - $15.000 (accesorios)
5. Falda de Ballet - $18.000 (ropa)
6. Accesorios Ballet - $12.000 (accesorios)
```

### 13.4 Escenarios de Prueba

#### Escenario 1: Usuario nuevo se registra y compra

1. Abrir http://localhost:5173
2. Clic en "Registro"
3. Llenar formulario (username, email, password)
4. Submit → Redirige a login
5. Login con nuevas credenciales
6. Ver catálogo de productos
7. Agregar 2 productos al carrito
8. Ir a carrito
9. Verificar que aparecen 2 productos
10. Cambiar cantidad de uno
11. Verificar que total se actualiza
12. En MySQL Workbench: `SELECT * FROM carrito;`
13. Confirmar que items están guardados en BD

#### Escenario 2: Admin gestiona productos

1. Login como admin (admin/admin123)
2. Ir a Panel de Administración
3. Crear nuevo producto:
   - Nombre: "Tutú Profesional"
   - Precio: 120000
   - Categoría: ropa
4. Guardar
5. Verificar que aparece en catálogo
6. Editar producto (cambiar precio)
7. Guardar y verificar cambio
8. Eliminar producto
9. Verificar que desaparece del catálogo
10. En MySQL Workbench: `SELECT * FROM productos;`
11. Confirmar cambios en BD

#### Escenario 3: Reconexión después de reinicio AWS

1. Detener backend (Ctrl+C)
2. Obtener nueva IP de AWS (simulado)
3. Actualizar application-prod.properties
4. Recompilar backend
5. Iniciar backend
6. Verificar que endpoints funcionan
7. Frontend sigue funcionando sin cambios
8. Carrito mantiene datos (si no se usó create-drop)

---

## 14. RESOLUCIÓN DE PROBLEMAS

### 14.1 Backend no inicia

**Síntoma:** Backend se cierra inmediatamente después de iniciar

**Causas posibles:**

1. **Puerto 8080 ocupado**
```bash
# Verificar
lsof -i :8080

# Solución
kill <PID>
```

2. **MySQL no accesible**
```bash
# Verificar conexión
nc -zv 98.92.98.32 3306

# Si falla, verificar container
ssh ubuntu@98.92.98.32 "sudo docker ps"

# Iniciar si está detenido
ssh ubuntu@98.92.98.32 "sudo docker start mysql-db"
```

3. **Error de duplicados (con ddl-auto=update)**
```
Error: Duplicate entry 'admin@ballet.com' for key 'email'
```

**Solución:**
```properties
# Cambiar en application-prod.properties
spring.jpa.hibernate.ddl-auto=create-drop
```

### 14.2 Frontend no se conecta al Backend

**Síntoma:** Productos no cargan, error de red

**Verificaciones:**

1. **Backend está corriendo**
```bash
curl http://localhost:8080/api/productos
```

2. **URL correcta en frontend**
```javascript
// frontend/src/services/api.js
const API_URL = 'http://localhost:8080/api';  // Verificar esto
```

3. **CORS configurado**
```java
// Backend debe tener
@CrossOrigin(origins = "*")
```

### 14.3 MySQL Workbench no conecta

**Síntoma:** Connection refused o timeout

**Soluciones:**

1. **Verificar IP pública correcta**
```bash
# En AWS Console, copiar IP exacta (con todos los números)
# Ejemplo: 98.92.98.32, NO 98.92.98.3
```

2. **Verificar Security Group**
```
- Puerto 3306 debe estar abierto
- Source puede ser 0.0.0.0/0 (para desarrollo)
```

3. **Verificar container MySQL corriendo**
```bash
ssh ubuntu@EC2_IP "sudo docker ps | grep mysql"
```

4. **Limpiar host keys si IP cambió**
```bash
ssh-keygen -R 98.92.98.32
```

### 14.4 Token JWT inválido

**Síntoma:** Error 401 Unauthorized en peticiones autenticadas

**Soluciones:**

1. **Token expirado (después de 24h)**
```javascript
// Hacer logout y login de nuevo
localStorage.removeItem('token');
localStorage.removeItem('usuario');
```

2. **Secret diferente entre dev y prod**
```properties
# Verificar que jwt.secret sea IGUAL en:
# - application.properties
# - application-prod.properties
```

3. **Token mal formado**
```javascript
// Verificar formato en localStorage
const token = localStorage.getItem('token');
console.log(token);  // Debe ser: eyJhbGciOiJIUz...
```

### 14.5 Datos no persisten (con create-drop)

**Síntoma:** Al reiniciar backend, datos se borran

**Explicación:**
```properties
spring.jpa.hibernate.ddl-auto=create-drop
# Esto RECREA las tablas cada vez que inicia
# Útil para desarrollo, NO para producción
```

**Para producción:**
```properties
spring.jpa.hibernate.ddl-auto=update
# Mantiene datos, solo actualiza esquema
```

**O mejor aún:**
```properties
spring.jpa.hibernate.ddl-auto=validate
# Solo valida, no modifica esquema
# Usar Flyway/Liquibase para migraciones
```

---

## 15. CONCLUSIONES Y APRENDIZAJES

### 15.1 Logros del Proyecto

✅ **Arquitectura Fullstack Moderna:**
- Separación clara frontend/backend
- API REST como capa de comunicación
- Base de datos relacional en la nube

✅ **Tecnologías Profesionales:**
- React para interfaces modernas y reactivas
- Spring Boot para backend empresarial robusto
- MySQL para persistencia de datos confiable
- Docker para containerización
- AWS para infraestructura cloud

✅ **Seguridad Implementada:**
- Autenticación JWT stateless
- Contraseñas hasheadas con BCrypt
- Autorización basada en roles (USER/ADMIN)
- Validación de tokens en cada request

✅ **Buenas Prácticas:**
- Código organizado por capas (MVC)
- Separación de responsabilidades
- Configuración por entornos (dev/prod)
- Uso de ORM (JPA) en lugar de SQL directo

### 15.2 Conceptos Clave Aprendidos

**Frontend:**
- Single Page Applications (SPA)
- Component-based architecture (React)
- State management (useState, Context API)
- HTTP requests con Axios
- Enrutamiento client-side (React Router)
- Interceptores para autenticación automática

**Backend:**
- API REST y métodos HTTP
- Serialización/deserialización JSON
- ORM y mapeo objeto-relacional
- Inyección de dependencias (Spring)
- Seguridad web (Spring Security)
- JWT para autenticación stateless

**Base de Datos:**
- Diseño de esquemas relacionales
- Claves primarias y foráneas
- Índices para optimización
- Queries con JPA/JPQL

**DevOps:**
- Cloud computing con AWS EC2
- Containerización con Docker
- SSH y conexión remota
- Security Groups (firewalls)
- Gestión de secretos y credenciales

### 15.3 Mejoras Futuras

**Funcionalidades:**
- [ ] Pasarela de pagos (Webpay, MercadoPago)
- [ ] Sistema de órdenes de compra
- [ ] Historial de compras por usuario
- [ ] Búsqueda de productos con filtros avanzados
- [ ] Wishlist (lista de deseos)
- [ ] Comentarios y ratings de productos
- [ ] Panel de estadísticas para admin

**Técnicas:**
- [ ] Unit tests (JUnit, Jest)
- [ ] Integration tests
- [ ] CI/CD con GitHub Actions
- [ ] Frontend en producción (deploy en S3/Netlify)
- [ ] Backend en producción (EC2 con Java)
- [ ] Base de datos con backups automáticos
- [ ] HTTPS con certificado SSL
- [ ] Rate limiting para proteger API
- [ ] Logging y monitoring (CloudWatch)
- [ ] Cache con Redis
- [ ] CDN para imágenes (CloudFront)

**Optimizaciones:**
- [ ] Lazy loading de productos
- [ ] Pagination en listados
- [ ] Image optimization
- [ ] Code splitting en React
- [ ] Database indexes estratégicos
- [ ] Query optimization

### 15.4 Recursos y Referencias

**Documentación Oficial:**
- React: https://react.dev
- Spring Boot: https://spring.io/projects/spring-boot
- MySQL: https://dev.mysql.com/doc/
- Docker: https://docs.docker.com
- AWS EC2: https://docs.aws.amazon.com/ec2/

**Tutoriales Seguidos:**
- Spring Boot REST API: Spring Guides
- React Context API: React Documentation
- JWT Authentication: JWT.io

**Herramientas Utilizadas:**
- IDE: IntelliJ IDEA / VS Code
- Testing API: cURL / Postman
- Database: MySQL Workbench
- Version Control: Git / GitHub
- Cloud: AWS Academy

---

## 16. ANEXOS

### 16.1 Comandos Útiles de Referencia Rápida

```bash
# ========== BACKEND ==========

# Compilar backend
./mvnw clean package -DskipTests

# Ejecutar backend (desarrollo)
./mvnw spring-boot:run

# Ejecutar backend (producción)
java -jar target/tienda-ballet-backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod

# Ver procesos en puerto 8080
lsof -i :8080

# Matar proceso
kill <PID>

# ========== FRONTEND ==========

# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev

# Build para producción
npm run build

# ========== DOCKER ==========

# Ver containers corriendo
sudo docker ps

# Ver todos los containers
sudo docker ps -a

# Iniciar container
sudo docker start mysql-db

# Detener container
sudo docker stop mysql-db

# Ver logs
sudo docker logs mysql-db

# Entrar al container
sudo docker exec -it mysql-db bash

# Ejecutar comando en container
sudo docker exec mysql-db mysql -u admin -padminpass -e "SHOW DATABASES;"

# ========== AWS / SSH ==========

# Conectar a EC2
ssh -i clave.pem ubuntu@98.92.98.32

# Conectar sin verificar host key
ssh -o StrictHostKeyChecking=no -i clave.pem ubuntu@IP

# Copiar archivo a EC2
scp -i clave.pem archivo.jar ubuntu@IP:~/

# Limpiar host key
ssh-keygen -R 98.92.98.32

# ========== MYSQL ==========

# Conectar a MySQL en container
sudo docker exec -it mysql-db mysql -u admin -padminpass

# Ejecutar query desde fuera
sudo docker exec mysql-db mysql -u admin -padminpass tienda_ballet -e "SELECT * FROM productos;"

# ========== GIT ==========

# Ver estado
git status

# Agregar archivos
git add .

# Commit
git commit -m "mensaje"

# Push
git push origin main

# Ver log
git log --oneline -10
```

### 16.2 Variables de Entorno y Configuración

```properties
# ========== Development (application.properties) ==========
spring.datasource.url=jdbc:h2:mem:tienda_ballet
spring.jpa.hibernate.ddl-auto=create-drop
spring.h2.console.enabled=true
jwt.secret=TiendaBallet2025SecretKeyParaJWT1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ
jwt.expiration=86400000

# ========== Production (application-prod.properties) ==========
spring.datasource.url=jdbc:mysql://98.92.98.32:3306/tienda_ballet
spring.datasource.username=admin
spring.datasource.password=adminpass
spring.jpa.hibernate.ddl-auto=create-drop
spring.h2.console.enabled=false
jwt.secret=TiendaBallet2025SecretKeyParaJWT1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ
jwt.expiration=86400000
```

### 16.3 Endpoints Completos de la API

```
PRODUCTOS
=========
GET    /api/productos                    - Listar todos
GET    /api/productos/{id}               - Obtener por ID
GET    /api/productos/categoria/{cat}    - Filtrar por categoría
POST   /api/productos                    - Crear (ADMIN)
PUT    /api/productos/{id}               - Actualizar (ADMIN)
DELETE /api/productos/{id}               - Eliminar (ADMIN)

USUARIOS
=========
POST   /api/usuarios/registro            - Registrar usuario
POST   /api/usuarios/login               - Iniciar sesión
POST   /api/usuarios/validar-token       - Validar JWT
GET    /api/usuarios                     - Listar usuarios (ADMIN)
GET    /api/usuarios/{id}                - Obtener usuario (ADMIN)
PUT    /api/usuarios/{id}                - Actualizar usuario (ADMIN)
DELETE /api/usuarios/{id}                - Eliminar usuario (ADMIN)

CARRITO
=======
GET    /api/carrito/usuario/{userId}     - Obtener carrito
POST   /api/carrito                      - Agregar item
PUT    /api/carrito/{id}                 - Actualizar cantidad
DELETE /api/carrito/{id}                 - Eliminar item
DELETE /api/carrito/usuario/{userId}     - Vaciar carrito
```

---

## 📌 RESUMEN EJECUTIVO

Este proyecto demuestra la implementación completa de una aplicación **fullstack e-commerce** utilizando:

**Frontend:** React 18 + Vite + Axios + React Router + Bootstrap
**Backend:** Spring Boot 3.5 + Spring Security + JPA/Hibernate + JWT
**Database:** MySQL 9.6 en Docker sobre AWS EC2
**Cloud:** AWS EC2 con Security Groups y Docker

**Arquitectura:** API REST con autenticación JWT stateless, separación frontend/backend, base de datos relacional en la nube.

**Funcionalidades:** Catálogo de productos, registro/login, carrito de compras, panel de administración, gestión de usuarios, autorización basada en roles.

**Deployment:** Backend y frontend en Mac local (desarrollo), MySQL en AWS EC2 (producción), procedimientos documentados para reconexión tras expiración de AWS Academy.

---

**Fecha de creación:** 24 de Enero 2026
**Versión del documento:** 1.0
**Autor:** Sofía Cortese (con asistencia de Claude Code)
**Estado:** ✅ Sistema completamente funcional y desplegado
