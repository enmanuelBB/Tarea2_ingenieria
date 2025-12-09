package com.tarea2Ingenieria.controller;

import com.tarea2Ingenieria.dto.CotizacionRequestDTO;
import com.tarea2Ingenieria.dto.CotizacionResponseDTO;
import com.tarea2Ingenieria.service.CotizacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cotizaciones")
@RequiredArgsConstructor
public class CotizacionController {

    private final CotizacionService cotizacionService;

    // 1. Crear Cotización POST /api/cotizaciones
    @PostMapping
    public ResponseEntity<CotizacionResponseDTO> crearCotizacion(@RequestBody CotizacionRequestDTO requestDTO) {
        CotizacionResponseDTO cotizacion = cotizacionService.crearCotizacion(requestDTO);
        return new ResponseEntity<>(cotizacion, HttpStatus.CREATED);
    }

    // 2. Obtener Cotización por ID GET /api/cotizaciones/{id}
    @GetMapping("/{id}")
    public ResponseEntity<CotizacionResponseDTO> getCotizacionById(@PathVariable Long id) {
        CotizacionResponseDTO cotizacion = cotizacionService.getCotizacionById(id);
        return ResponseEntity.ok(cotizacion);
    }

    // 3. listar todos las cotizaciones /api/cotizaciones
    @GetMapping
    public ResponseEntity<List<CotizacionResponseDTO>> getAllCotizaciones() {
        List<CotizacionResponseDTO> cotizaciones = cotizacionService.getAllCotizaciones();
        return ResponseEntity.ok(cotizaciones);
    }

    // 3. Confirmar Venta POST /api/cotizaciones/{id}/confirmar
    @PostMapping("/{id}/confirmar")
    public ResponseEntity<CotizacionResponseDTO> confirmarVenta(@PathVariable Long id) {
        CotizacionResponseDTO ventaConfirmada = cotizacionService.confirmarVenta(id);
        return ResponseEntity.ok(ventaConfirmada);
    }
}
