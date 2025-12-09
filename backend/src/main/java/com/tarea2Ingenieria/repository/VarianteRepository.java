package com.tarea2Ingenieria.repository;

import com.tarea2Ingenieria.model.Variante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VarianteRepository extends JpaRepository<Variante, Long> {

    Optional<Variante> findByNombre(String nombre);
}
