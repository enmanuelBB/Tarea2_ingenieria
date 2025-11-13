package com.tarea2Ingenieria.dto;

import lombok.Data;

//sub dto
@Data
public class DetalleResponseDTO {
    private String nombreMueble;
    private String nombreVariante;
    private Integer cantidad;
    private Double precioUnitario;
    private Double subtotal;
}
