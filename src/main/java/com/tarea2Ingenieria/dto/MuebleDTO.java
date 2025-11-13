package com.tarea2Ingenieria.dto;

import lombok.Data;

@Data
public class MuebleDTO {
    private Long idMueble;
    private String nombreMueble;
    private String tipo;
    private Double precioBase;
    private Integer stock;
    private String estado;
    private String tamanio;
    private String material;
}
