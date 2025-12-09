package com.tarea2Ingenieria.dto;

import lombok.Data;
import java.util.List;

@Data
public class CotizacionRequestDTO {

    private List<DetalleRequestDTO> detalles;
}

