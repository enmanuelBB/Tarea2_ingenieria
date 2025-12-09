package com.example.tarea2Ingenieria.service;

import com.tarea2Ingenieria.dto.MuebleDTO;
import com.tarea2Ingenieria.model.Mueble;
import com.tarea2Ingenieria.model.enums.EstadoMueble;
import com.tarea2Ingenieria.model.enums.TamanioMueble;
import com.tarea2Ingenieria.repository.MuebleRepository;
import com.tarea2Ingenieria.service.MuebleServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MuebleServiceImplTest {

    @Mock
    private MuebleRepository muebleRepository;

    @InjectMocks
    private MuebleServiceImpl muebleService;

    private Mueble mueblePrueba;
    private MuebleDTO muebleDTOPrueba;

    @BeforeEach
    void setUp() {
        mueblePrueba = new Mueble();
        mueblePrueba.setIdMueble(1L);
        mueblePrueba.setNombreMueble("Mesa de Centro");
        mueblePrueba.setEstado(EstadoMueble.ACTIVO);
        mueblePrueba.setStock(20);
        mueblePrueba.setTamanio(TamanioMueble.PEQUENO);
        mueblePrueba.setMaterial("Roble");
        mueblePrueba.setPrecioBase(50000.0);
        mueblePrueba.setTipo("Mesa");

        muebleDTOPrueba = new MuebleDTO();
        muebleDTOPrueba.setNombreMueble("Mesa de Centro");
        muebleDTOPrueba.setTamanio("PEQUENO");
    }

    @Test
    void testCrearMueble() {

        when(muebleRepository.save(any(Mueble.class))).thenReturn(mueblePrueba);

        MuebleDTO resultado = muebleService.crearMueble(muebleDTOPrueba);
        assertNotNull(resultado);
        assertEquals("Mesa de Centro", resultado.getNombreMueble());
        assertEquals("ACTIVO", resultado.getEstado()); // El servicio debe setearlo como ACTIVO
    }

    @Test
    void testGetMuebleById_Encontrado() {

        when(muebleRepository.findById(1L)).thenReturn(Optional.of(mueblePrueba));

        MuebleDTO resultado = muebleService.getMuebleById(1L);
        assertNotNull(resultado);
        assertEquals(1L, resultado.getIdMueble());
    }

    @Test
    void testGetMuebleById_NoEncontrado() {
        when(muebleRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            muebleService.getMuebleById(99L);
        });
        assertEquals("Mueble no encontrado", exception.getMessage());
    }

    @Test
    void testDesactivarMueble() {
        when(muebleRepository.findById(1L)).thenReturn(Optional.of(mueblePrueba));
        muebleService.desactivarMueble(1L);
        ArgumentCaptor<Mueble> captor = ArgumentCaptor.forClass(Mueble.class);
        verify(muebleRepository).save(captor.capture());

        Mueble muebleGuardado = captor.getValue();
        assertEquals(EstadoMueble.INACTIVO, muebleGuardado.getEstado());
    }

    @Test
    void testActivarMueble() {
        mueblePrueba.setEstado(EstadoMueble.INACTIVO);
        when(muebleRepository.findById(1L)).thenReturn(Optional.of(mueblePrueba));

        muebleService.activarMueble(1L);
        ArgumentCaptor<Mueble> captor = ArgumentCaptor.forClass(Mueble.class);
        verify(muebleRepository).save(captor.capture());

        Mueble muebleGuardado = captor.getValue();
        assertEquals(EstadoMueble.ACTIVO, muebleGuardado.getEstado());
    }
}
