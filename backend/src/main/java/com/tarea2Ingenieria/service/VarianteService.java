package com.tarea2Ingenieria.service;

import com.tarea2Ingenieria.dto.VarianteDTO;

import java.util.List;

public interface VarianteService {

    VarianteDTO crearVariante(VarianteDTO varianteDTO);
    List<VarianteDTO> getAllVariantes();
    VarianteDTO getVarianteById(Long id);
}
