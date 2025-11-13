package com.tarea2Ingenieria.service;

import com.tarea2Ingenieria.dto.MuebleDTO;
import com.tarea2Ingenieria.model.Mueble;
import com.tarea2Ingenieria.model.enums.EstadoMueble;
import com.tarea2Ingenieria.model.enums.TamanioMueble;
import com.tarea2Ingenieria.repository.MuebleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MuebleServiceImpl implements MuebleService {

    private final MuebleRepository muebleRepository;

    @Override
    public MuebleDTO crearMueble(MuebleDTO muebleDTO) {
        Mueble mueble = toEntity(muebleDTO);
        mueble.setEstado(EstadoMueble.ACTIVO);
        Mueble muebleGuardado = muebleRepository.save(mueble);
        return toDTO(muebleGuardado);
    }

    @Override
    public List<MuebleDTO> getMueblesActivos() {
        return muebleRepository.findByEstado(EstadoMueble.ACTIVO)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public MuebleDTO getMuebleById(Long id) {
        Mueble mueble = muebleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mueble no encontrado"));
        return toDTO(mueble);
    }

    @Override
    public MuebleDTO actualizarMueble(Long id, MuebleDTO muebleDTO) {
        Mueble muebleExistente = muebleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mueble no encontrado"));

        if (muebleExistente.getEstado() == EstadoMueble.INACTIVO) {
            throw new RuntimeException("No se puede modificar un mueble inactivo.");
        }

        muebleExistente.setNombreMueble(muebleDTO.getNombreMueble());
        muebleExistente.setTipo(muebleDTO.getTipo());
        muebleExistente.setPrecioBase(muebleDTO.getPrecioBase());
        muebleExistente.setStock(muebleDTO.getStock());
        muebleExistente.setMaterial(muebleDTO.getMaterial());

        if (muebleDTO.getTamanio() != null) {
            muebleExistente.setTamanio(TamanioMueble.valueOf(muebleDTO.getTamanio().toUpperCase()));
        } else {

        }

        Mueble muebleActualizado = muebleRepository.save(muebleExistente);
        return toDTO(muebleActualizado);
    }

    @Override
    public void desactivarMueble(Long id) {
        Mueble mueble = muebleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mueble no encontrado"));
        mueble.setEstado(EstadoMueble.INACTIVO);
        muebleRepository.save(mueble);
    }

    @Override
    public void activarMueble(Long id) {
        Mueble mueble = muebleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mueble no encontrado"));

        if (mueble.getEstado() == EstadoMueble.ACTIVO) {
            throw new RuntimeException("El mueble ya estaba activo.");
        }

        mueble.setEstado(EstadoMueble.ACTIVO);
        muebleRepository.save(mueble);
    }
    @Override
    public MuebleDTO actualizarParcialMueble(Long id, MuebleDTO muebleDTO) {

        Mueble muebleExistente = muebleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mueble no encontrado"));

        if (muebleExistente.getEstado() == EstadoMueble.INACTIVO) {
            throw new RuntimeException("No se puede modificar un mueble inactivo.");
        }

        if (muebleDTO.getNombreMueble() != null) {
            muebleExistente.setNombreMueble(muebleDTO.getNombreMueble());
        }
        if (muebleDTO.getTipo() != null) {
            muebleExistente.setTipo(muebleDTO.getTipo());
        }
        if (muebleDTO.getPrecioBase() != null) {
            muebleExistente.setPrecioBase(muebleDTO.getPrecioBase());
        }
        if (muebleDTO.getStock() != null) {
            muebleExistente.setStock(muebleDTO.getStock());
        }
        if (muebleDTO.getMaterial() != null) {
            muebleExistente.setMaterial(muebleDTO.getMaterial());
        }
        if (muebleDTO.getTamanio() != null) {
            muebleExistente.setTamanio(TamanioMueble.valueOf(muebleDTO.getTamanio().toUpperCase()));
        }

        Mueble muebleActualizado = muebleRepository.save(muebleExistente);
        return toDTO(muebleActualizado);
    }


    private MuebleDTO toDTO(Mueble mueble) {
        MuebleDTO dto = new MuebleDTO();
        dto.setIdMueble(mueble.getIdMueble());
        dto.setNombreMueble(mueble.getNombreMueble());
        dto.setTipo(mueble.getTipo());
        dto.setPrecioBase(mueble.getPrecioBase());
        dto.setStock(mueble.getStock());
        dto.setMaterial(mueble.getMaterial());

        dto.setEstado(mueble.getEstado().name());
        dto.setTamanio(mueble.getTamanio().name());

        return dto;
    }

    private Mueble toEntity(MuebleDTO dto) {
        Mueble mueble = new Mueble();
        mueble.setNombreMueble(dto.getNombreMueble());
        mueble.setTipo(dto.getTipo());
        mueble.setPrecioBase(dto.getPrecioBase());
        mueble.setStock(dto.getStock());
        mueble.setMaterial(dto.getMaterial());

        if (dto.getTamanio() != null) {

            mueble.setTamanio(TamanioMueble.valueOf(dto.getTamanio().toUpperCase()));
        }
        return mueble;
    }
}
