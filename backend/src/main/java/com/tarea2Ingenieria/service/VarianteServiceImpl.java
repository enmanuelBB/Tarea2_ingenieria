package com.tarea2Ingenieria.service;


import com.tarea2Ingenieria.dto.VarianteDTO;
import com.tarea2Ingenieria.model.Variante;
import com.tarea2Ingenieria.repository.VarianteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VarianteServiceImpl implements VarianteService {

    private final VarianteRepository varianteRepository;

    @Override
    public VarianteDTO crearVariante(VarianteDTO varianteDTO) {
        Variante variante = toEntity(varianteDTO);
        Variante varianteGuardada = varianteRepository.save(variante);
        return toDTO(varianteGuardada);
    }

    @Override
    public List<VarianteDTO> getAllVariantes() {
        return varianteRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public VarianteDTO getVarianteById(Long id) {
        Variante variante = varianteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Variante no encontrada"));
        return toDTO(variante);
    }


    private VarianteDTO toDTO(Variante variante) {
        VarianteDTO dto = new VarianteDTO();
        dto.setIdVariante(variante.getIdVariante());
        dto.setNombre(variante.getNombre());
        dto.setAumentoPrecio(variante.getAumentoPrecio());
        return dto;
    }

    private Variante toEntity(VarianteDTO dto) {
        Variante variante = new Variante();
        variante.setNombre(dto.getNombre());
        variante.setAumentoPrecio(dto.getAumentoPrecio());
        return variante;
    }
}
