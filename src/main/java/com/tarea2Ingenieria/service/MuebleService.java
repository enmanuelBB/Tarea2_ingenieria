package com.tarea2Ingenieria.service;

import com.tarea2Ingenieria.dto.MuebleDTO;

import java.util.List;

public interface MuebleService {

    MuebleDTO crearMueble(MuebleDTO muebleDTO);
    List<MuebleDTO> getMueblesActivos();
    MuebleDTO getMuebleById(Long id);
    MuebleDTO actualizarMueble(Long id, MuebleDTO muebleDTO);
    void desactivarMueble(Long id);
    void activarMueble(Long id);
    MuebleDTO actualizarParcialMueble(Long id, MuebleDTO muebleDTO);
}
