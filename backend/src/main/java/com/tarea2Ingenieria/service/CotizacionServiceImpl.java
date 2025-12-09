package com.tarea2Ingenieria.service;

import com.tarea2Ingenieria.dto.CotizacionRequestDTO;
import com.tarea2Ingenieria.dto.CotizacionResponseDTO;
import com.tarea2Ingenieria.dto.DetalleRequestDTO;
import com.tarea2Ingenieria.dto.DetalleResponseDTO;
import com.tarea2Ingenieria.model.Cotizacion;
import com.tarea2Ingenieria.model.DetalleCotizacion;
import com.tarea2Ingenieria.model.Mueble;
import com.tarea2Ingenieria.model.Variante;
import com.tarea2Ingenieria.model.enums.EstadoCotizacion;
import com.tarea2Ingenieria.model.enums.EstadoMueble;
import com.tarea2Ingenieria.repository.CotizacionRepository;
import com.tarea2Ingenieria.repository.MuebleRepository;
import com.tarea2Ingenieria.repository.VarianteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CotizacionServiceImpl implements CotizacionService {

    private final CotizacionRepository cotizacionRepository;
    private final MuebleRepository muebleRepository;
    private final VarianteRepository varianteRepository;

    @Override
    @Transactional
    public CotizacionResponseDTO crearCotizacion(CotizacionRequestDTO requestDTO) {

        Cotizacion cotizacion = new Cotizacion();
        cotizacion.setFecha(LocalDate.now());
        cotizacion.setEstado(EstadoCotizacion.PENDIENTE);

        List<DetalleCotizacion> detalles = new ArrayList<>();
        double totalCotizacion = 0.0;

        for (DetalleRequestDTO itemDTO : requestDTO.getDetalles()) {
            Mueble mueble = muebleRepository.findById(itemDTO.getIdMueble())
                    .orElseThrow(() -> new RuntimeException("Mueble no encontrado"));

            // --- VALIDACIÓN 1: ESTADO DEL MUEBLE ---
            if (mueble.getEstado() == EstadoMueble.INACTIVO) {
                throw new RuntimeException("El producto '" + mueble.getNombreMueble() + "' no está disponible (inactivo).");
            }
            // --- FIN VALIDACIÓN 1 ---

            Variante variante = varianteRepository.findById(itemDTO.getIdVariante())
                    .orElseThrow(() -> new RuntimeException("Variante no encontrada"));

            // Verificación de stock
            if (mueble.getStock() < itemDTO.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para: " + mueble.getNombreMueble());
            }

            // Cálculo de precio
            double precioUnitario = mueble.getPrecioBase() + variante.getAumentoPrecio();

            DetalleCotizacion detalle = new DetalleCotizacion();
            detalle.setMueble(mueble);
            detalle.setVariante(variante);
            detalle.setCantidad(itemDTO.getCantidad());
            detalle.setPrecioUnitarioSnapshot(precioUnitario);
            detalle.setCotizacion(cotizacion);

            detalles.add(detalle);
            totalCotizacion += (precioUnitario * itemDTO.getCantidad());
        }

        cotizacion.setTotal(totalCotizacion);
        cotizacion.setDetalles(detalles);

        Cotizacion cotizacionGuardada = cotizacionRepository.save(cotizacion);
        return toResponseDTO(cotizacionGuardada);
    }

    @Override
    @Transactional
    public CotizacionResponseDTO confirmarVenta(Long cotizacionId) {
        Cotizacion cotizacion = cotizacionRepository.findById(cotizacionId)
                .orElseThrow(() -> new RuntimeException("Cotización no encontrada"));

        if (cotizacion.getEstado() == EstadoCotizacion.CONFIRMADA) {
            throw new RuntimeException("Esta cotización ya fue confirmada como venta.");
        }

        for (DetalleCotizacion detalle : cotizacion.getDetalles()) {

            Mueble mueble = detalle.getMueble();

            // VALIDACIÓN 2: ESTADO AL CONFIRMAR
            if (mueble.getEstado() == EstadoMueble.INACTIVO) {
                throw new RuntimeException("El producto '" + mueble.getNombreMueble() + "' ya no está disponible y no se puede confirmar la venta.");
            }

            // Re-verificamos stock al momento de confirmar
            if (mueble.getStock() < detalle.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para: " + mueble.getNombreMueble());
            }

            // Descontamos stock
            mueble.setStock(mueble.getStock() - detalle.getCantidad());
            muebleRepository.save(mueble);
        }

        cotizacion.setEstado(EstadoCotizacion.CONFIRMADA);
        Cotizacion ventaConfirmada = cotizacionRepository.save(cotizacion);

        return toResponseDTO(ventaConfirmada);
    }

    @Override
    public CotizacionResponseDTO getCotizacionById(Long cotizacionId) {
        Cotizacion cotizacion = cotizacionRepository.findById(cotizacionId)
                .orElseThrow(() -> new RuntimeException("Cotización no encontrada"));
        return toResponseDTO(cotizacion);
    }

    @Override
    public List<CotizacionResponseDTO> getAllCotizaciones() {
        // 1. Busca todas las cotizaciones en la BD
        List<Cotizacion> cotizaciones = cotizacionRepository.findAll();

        // 2. Mapea la lista de Entidades a una lista de DTOs
        return cotizaciones.stream()
                .map(this::toResponseDTO) // Reutilizamos el mapper que ya teníamos
                .collect(Collectors.toList());
    }


    // --- MAPPERS PRIVADOS ---

    private CotizacionResponseDTO toResponseDTO(Cotizacion cotizacion) {
        CotizacionResponseDTO response = new CotizacionResponseDTO();
        response.setIdCotizacion(cotizacion.getIdCotizacion());
        response.setFecha(cotizacion.getFecha());
        response.setTotal(cotizacion.getTotal());
        response.setEstado(cotizacion.getEstado().name());

        response.setDetalles(
                cotizacion.getDetalles().stream()
                        .map(this::toDetalleResponseDTO)
                        .collect(Collectors.toList())
        );
        return response;
    }

    private DetalleResponseDTO toDetalleResponseDTO(DetalleCotizacion detalle) {
        DetalleResponseDTO dto = new DetalleResponseDTO();
        // Asumiendo que los getters de Mueble y Variante están cargados (no son LAZY)
        dto.setNombreMueble(detalle.getMueble().getNombreMueble());
        dto.setNombreVariante(detalle.getVariante().getNombre());
        dto.setCantidad(detalle.getCantidad());
        dto.setPrecioUnitario(detalle.getPrecioUnitarioSnapshot());
        dto.setSubtotal(detalle.getPrecioUnitarioSnapshot() * detalle.getCantidad());
        return dto;
    }
}
