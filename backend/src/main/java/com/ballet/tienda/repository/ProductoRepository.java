//SQL + JPA/Hibernate + JDBC  ------aca es la conexion del  Backend → Base de datos (SQL) 
package com.ballet.tienda.repository;

import com.ballet.tienda.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    // Buscar por categoría
    List<Producto> findByCategoria(String categoria);

    // Buscar por nombre (contiene)
    List<Producto> findByNombreContainingIgnoreCase(String nombre);
}
