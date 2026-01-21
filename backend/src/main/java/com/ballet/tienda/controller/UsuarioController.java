package com.ballet.tienda.controller;

import com.ballet.tienda.config.JwtUtil;
import com.ballet.tienda.entity.Usuario;
import com.ballet.tienda.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // POST - Registro de nuevo usuario
    @PostMapping("/registro")
    public ResponseEntity<?> registro(@Valid @RequestBody Usuario usuario) {
        Map<String, String> response = new HashMap<>();

        // Verificar si el username ya existe
        if (usuarioRepository.existsByUsername(usuario.getUsername())) {
            response.put("error", "El nombre de usuario ya está en uso");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        // Verificar si el email ya existe
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            response.put("error", "El email ya está registrado");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        // Asignar rol USER por defecto si no se especifica
        if (usuario.getRol() == null || usuario.getRol().isEmpty()) {
            usuario.setRol("USER");
        }

        // Guardar usuario (password sin encriptar por ahora, JWT lo hará después)
        Usuario nuevoUsuario = usuarioRepository.save(usuario);

        // No devolver la contraseña en la respuesta
        nuevoUsuario.setPassword(null);

        response.put("mensaje", "Usuario registrado exitosamente");
        response.put("username", nuevoUsuario.getUsername());
        response.put("rol", nuevoUsuario.getRol());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // POST - Login de usuario
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credenciales) {
        Map<String, Object> response = new HashMap<>();

        String usernameOrEmail = credenciales.get("username");
        String password = credenciales.get("password");

        if (usernameOrEmail == null || password == null) {
            response.put("error", "Username/email y contraseña son obligatorios");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        // Buscar usuario por username o email
        Usuario usuario = usuarioRepository.findByUsername(usernameOrEmail)
                .or(() -> usuarioRepository.findByEmail(usernameOrEmail))
                .orElse(null);

        if (usuario == null) {
            response.put("error", "Usuario no encontrado");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        // Validar contraseña (sin encriptar por ahora)
        if (!usuario.getPassword().equals(password)) {
            response.put("error", "Contraseña incorrecta");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        // Generar token JWT
        String token = jwtUtil.generateToken(usuario.getUsername(), usuario.getRol(), usuario.getId());

        // Login exitoso
        response.put("mensaje", "Login exitoso");
        response.put("token", token);
        response.put("usuario", Map.of(
            "id", usuario.getId(),
            "username", usuario.getUsername(),
            "email", usuario.getEmail(),
            "rol", usuario.getRol()
        ));

        return ResponseEntity.ok(response);
    }

    // POST - Validar token JWT
    @PostMapping("/validar-token")
    public ResponseEntity<?> validarToken(@RequestHeader("Authorization") String authHeader) {
        Map<String, Object> response = new HashMap<>();

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.put("error", "Token no proporcionado o formato inválido");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        String token = authHeader.substring(7); // Quitar "Bearer "

        try {
            String username = jwtUtil.extractUsername(token);
            String rol = jwtUtil.extractRol(token);
            Long userId = jwtUtil.extractUserId(token);

            // Verificar que el usuario existe
            Usuario usuario = usuarioRepository.findByUsername(username).orElse(null);

            if (usuario == null) {
                response.put("error", "Usuario no encontrado");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            // Validar token
            if (jwtUtil.validateToken(token, username)) {
                response.put("valido", true);
                response.put("usuario", Map.of(
                    "id", userId,
                    "username", username,
                    "rol", rol
                ));
                return ResponseEntity.ok(response);
            } else {
                response.put("error", "Token expirado o inválido");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

        } catch (Exception e) {
            response.put("error", "Token inválido: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    // GET - Obtener todos los usuarios (admin)
    @GetMapping
    public List<Usuario> obtenerTodos() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        // No devolver contraseñas
        usuarios.forEach(u -> u.setPassword(null));
        return usuarios;
    }

    // GET - Obtener usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerPorId(@PathVariable Long id) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuario.setPassword(null); // No devolver contraseña
                    return ResponseEntity.ok(usuario);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // PUT - Actualizar usuario
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizar(@PathVariable Long id, @Valid @RequestBody Usuario usuarioActualizado) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    // Actualizar campos (excepto password si viene vacío)
                    usuario.setUsername(usuarioActualizado.getUsername());
                    usuario.setEmail(usuarioActualizado.getEmail());

                    if (usuarioActualizado.getPassword() != null && !usuarioActualizado.getPassword().isEmpty()) {
                        usuario.setPassword(usuarioActualizado.getPassword());
                    }

                    if (usuarioActualizado.getRol() != null) {
                        usuario.setRol(usuarioActualizado.getRol());
                    }

                    Usuario usuarioGuardado = usuarioRepository.save(usuario);
                    usuarioGuardado.setPassword(null); // No devolver contraseña

                    return ResponseEntity.ok(usuarioGuardado);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE - Eliminar usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        Map<String, String> response = new HashMap<>();

        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            response.put("mensaje", "Usuario eliminado exitosamente");
            return ResponseEntity.ok(response);
        }

        response.put("error", "Usuario no encontrado");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
}
