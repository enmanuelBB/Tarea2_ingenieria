package com.example.tarea2Ingenieria.service;


import com.tarea2Ingenieria.dto.CotizacionRequestDTO;
import com.tarea2Ingenieria.dto.DetalleRequestDTO;
import com.tarea2Ingenieria.model.Cotizacion;
import com.tarea2Ingenieria.model.DetalleCotizacion;
import com.tarea2Ingenieria.model.Mueble;
import com.tarea2Ingenieria.model.Variante;
import com.tarea2Ingenieria.model.enums.EstadoCotizacion;
import com.tarea2Ingenieria.model.enums.EstadoMueble;
import com.tarea2Ingenieria.repository.CotizacionRepository;
import com.tarea2Ingenieria.repository.MuebleRepository;
import com.tarea2Ingenieria.repository.VarianteRepository;
import com.tarea2Ingenieria.service.CotizacionServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CotizacionServiceImplTest {

    @Mock
    private MuebleRepository muebleRepository;

    @Mock
    private VarianteRepository varianteRepository;

    @Mock
    private CotizacionRepository cotizacionRepository;

    @InjectMocks
    private CotizacionServiceImpl cotizacionService;


    private Mueble mueblePrueba;
    private Variante variantePrueba;
    private CotizacionRequestDTO cotizacionRequest;

    @BeforeEach
    void setUp() {

        mueblePrueba = new Mueble();
        mueblePrueba.setIdMueble(1L);
        mueblePrueba.setNombreMueble("Silla Gamer");
        mueblePrueba.setPrecioBase(100000.0);
        mueblePrueba.setStock(10);
        mueblePrueba.setEstado(EstadoMueble.ACTIVO);

        variantePrueba = new Variante();
        variantePrueba.setIdVariante(1L);
        variantePrueba.setNombre("Normal");
        variantePrueba.setAumentoPrecio(0.0);

        DetalleRequestDTO detalleRequest = new DetalleRequestDTO();
        detalleRequest.setIdMueble(1L);
        detalleRequest.setIdVariante(1L);
        detalleRequest.setCantidad(5);

        cotizacionRequest = new CotizacionRequestDTO();
        cotizacionRequest.setDetalles(Collections.singletonList(detalleRequest));
    }

    @Test
    void testCrearCotizacion_ErrorStockInsuficiente() {

        mueblePrueba.setStock(2);

        when(muebleRepository.findById(1L)).thenReturn(Optional.of(mueblePrueba));
        when(varianteRepository.findById(1L)).thenReturn(Optional.of(variantePrueba));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            cotizacionService.crearCotizacion(cotizacionRequest);
        });

        assertEquals("Stock insuficiente para: Silla Gamer", exception.getMessage());
    }

    @Test
    void testCrearCotizacion_ErrorMuebleInactivo() {
        mueblePrueba.setEstado(EstadoMueble.INACTIVO);
        when(muebleRepository.findById(1L)).thenReturn(Optional.of(mueblePrueba));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            cotizacionService.crearCotizacion(cotizacionRequest);
        });

        assertTrue(exception.getMessage().contains("no está disponible (inactivo)"));
    }

    @Test
    void testConfirmarVenta_DescuentaStockCorrectamente() {

        DetalleCotizacion detalle = new DetalleCotizacion();
        detalle.setMueble(mueblePrueba);
        detalle.setVariante(variantePrueba);
        detalle.setCantidad(5);


        detalle.setPrecioUnitarioSnapshot(100000.0);

        Cotizacion cotizacionExistente = new Cotizacion();
        cotizacionExistente.setIdCotizacion(1L);
        cotizacionExistente.setEstado(EstadoCotizacion.PENDIENTE);
        cotizacionExistente.setDetalles(Collections.singletonList(detalle));


        when(cotizacionRepository.findById(1L)).thenReturn(Optional.of(cotizacionExistente));
        when(cotizacionRepository.save(any(Cotizacion.class))).thenReturn(cotizacionExistente);

        cotizacionService.confirmarVenta(1L);

        ArgumentCaptor<Mueble> muebleCaptor = ArgumentCaptor.forClass(Mueble.class);
        verify(muebleRepository, times(1)).save(muebleCaptor.capture());

        Mueble muebleGuardado = muebleCaptor.getValue();
        assertEquals(5, muebleGuardado.getStock());

        assertEquals(EstadoCotizacion.CONFIRMADA, cotizacionExistente.getEstado());
    }
}
