package com.tarea2Ingenieria.dto;

import lombok.Data;

@Data
public class DetalleRequestDTO {
    private Long idMueble;
    private Long idVariante;
    private Integer cantidad;
}
