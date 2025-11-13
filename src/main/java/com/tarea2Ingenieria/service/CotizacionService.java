package com.tarea2Ingenieria.service;

import com.tarea2Ingenieria.dto.CotizacionRequestDTO;
import com.tarea2Ingenieria.dto.CotizacionResponseDTO;

import java.util.List;

public interface CotizacionService {

    CotizacionResponseDTO crearCotizacion(CotizacionRequestDTO requestDTO);
    CotizacionResponseDTO confirmarVenta(Long cotizacionId);
    CotizacionResponseDTO getCotizacionById(Long cotizacionId);
    List<CotizacionResponseDTO> getAllCotizaciones();
}
