package com.tarea2Ingenieria.repository;

import com.tarea2Ingenieria.model.Mueble;
import com.tarea2Ingenieria.model.enums.EstadoMueble;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MuebleRepository extends JpaRepository<Mueble, Long> {


    List<Mueble> findByEstado(EstadoMueble estado);
}