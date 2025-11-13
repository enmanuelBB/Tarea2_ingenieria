package com.tarea2Ingenieria.controller;

import com.tarea2Ingenieria.dto.MuebleDTO;
import com.tarea2Ingenieria.service.MuebleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/muebles")
@RequiredArgsConstructor
public class MuebleController {

    private final MuebleService muebleService;

    // 1. Crear Mueble POST /api/muebles
    @PostMapping
    public ResponseEntity<MuebleDTO> crearMueble(@RequestBody MuebleDTO muebleDTO) {
        MuebleDTO nuevoMueble = muebleService.crearMueble(muebleDTO);
        return new ResponseEntity<>(nuevoMueble, HttpStatus.CREATED);
    }

    // 2. Listar MueblesGET /api/muebles
    @GetMapping
    public ResponseEntity<List<MuebleDTO>> getMueblesActivos() {
        List<MuebleDTO> muebles = muebleService.getMueblesActivos();
        return ResponseEntity.ok(muebles);
    }

    // 3. Obtener Mueble por ID GET /api/muebles/{id}
    @GetMapping("/{id}")
    public ResponseEntity<MuebleDTO> getMuebleById(@PathVariable Long id) {
        MuebleDTO mueble = muebleService.getMuebleById(id);
        return ResponseEntity.ok(mueble);
    }

    // 4. Actualizar MueblePUT /api/muebles/{id}
    @PutMapping("/{id}")
    public ResponseEntity<MuebleDTO> actualizarMueble(@PathVariable Long id, @RequestBody MuebleDTO muebleDTO) {
        MuebleDTO muebleActualizado = muebleService.actualizarMueble(id, muebleDTO);
        return ResponseEntity.ok(muebleActualizado);
    }

    // 5. Desactivar Mueble DELETE /api/muebles/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> desactivarMueble(@PathVariable Long id) {
        muebleService.desactivarMueble(id);
        return ResponseEntity.noContent().build(); // HTTP 204 No Content
    }

    // 5. Activar Mueble Post /api/{id}/activar
    @PostMapping("/{id}/activar")
    public ResponseEntity<Void> activarMueble(@PathVariable Long id) {
        muebleService.activarMueble(id);
        return ResponseEntity.ok().build(); // Devuelve HTTP 200 OK
    }

    // 5. Activar Mueble Patch /api/muebles/{id}
    @PatchMapping("/{id}")
    public ResponseEntity<MuebleDTO> actualizarParcialMueble(
            @PathVariable Long id,
            @RequestBody MuebleDTO muebleDTO) {

        MuebleDTO muebleActualizado = muebleService.actualizarParcialMueble(id, muebleDTO);
        return ResponseEntity.ok(muebleActualizado);
    }
}
