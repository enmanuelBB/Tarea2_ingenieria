package com.tarea2Ingenieria.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class CotizacionResponseDTO {
    private Long idCotizacion;
    private LocalDate fecha;
    private Double total;
    private String estado;
    private List<DetalleResponseDTO> detalles;
}

