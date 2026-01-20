package com.ballet.tienda.repository;

import com.ballet.tienda.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Buscar por username
    Optional<Usuario> findByUsername(String username);

    // Buscar por email
    Optional<Usuario> findByEmail(String email);

    // Verificar si existe username
    boolean existsByUsername(String username);

    // Verificar si existe email
    boolean existsByEmail(String email);
}
