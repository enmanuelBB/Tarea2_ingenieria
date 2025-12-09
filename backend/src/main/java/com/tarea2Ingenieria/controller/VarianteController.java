package com.tarea2Ingenieria.controller;

import com.tarea2Ingenieria.dto.VarianteDTO;
import com.tarea2Ingenieria.service.VarianteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/variantes")
@RequiredArgsConstructor
public class VarianteController {

    private final VarianteService varianteService;

    // 1. Crear Variante POST /api/variantes
    @PostMapping
    public ResponseEntity<VarianteDTO> crearVariante(@RequestBody VarianteDTO varianteDTO) {
        VarianteDTO nuevaVariante = varianteService.crearVariante(varianteDTO);
        return new ResponseEntity<>(nuevaVariante, HttpStatus.CREATED);
    }

    // 2. Listar Variantes GET /api/variantes
    @GetMapping
    public ResponseEntity<List<VarianteDTO>> getAllVariantes() {
        List<VarianteDTO> variantes = varianteService.getAllVariantes();
        return ResponseEntity.ok(variantes);
    }

    // 3. Obtener Variante por ID get /api/variantes/{id}
    @GetMapping("/{id}")
    public ResponseEntity<VarianteDTO> getVarianteById(@PathVariable Long id) {
        VarianteDTO variante = varianteService.getVarianteById(id);
        return ResponseEntity.ok(variante);
    }
}
