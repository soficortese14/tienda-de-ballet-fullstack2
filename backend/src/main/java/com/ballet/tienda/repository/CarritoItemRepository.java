// interfaz entre  codigo Java y la base de datos MySQL. 
package com.ballet.tienda.repository;

import com.ballet.tienda.entity.CarritoItem;
import com.ballet.tienda.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarritoItemRepository extends JpaRepository<CarritoItem, Long> {

    // Buscar carrito de un usuario
    List<CarritoItem> findByUsuario(Usuario usuario);

    // Buscar por usuario ID
    List<CarritoItem> findByUsuarioId(Long usuarioId);

    // Eliminar todos los items de un usuario
    void deleteByUsuario(Usuario usuario);
}
