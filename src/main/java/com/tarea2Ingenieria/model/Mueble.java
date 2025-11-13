package com.tarea2Ingenieria.model;

import com.tarea2Ingenieria.model.enums.EstadoMueble;
import com.tarea2Ingenieria.model.enums.TamanioMueble;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "muebles")

public class Mueble {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMueble;

    @Column(nullable = false)
    private String nombreMueble;

    @Column(nullable = false)
    private String tipo;

    @Column(nullable = false)
    private Double precioBase;

    @Column(nullable = false)
    private Integer stock;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoMueble estado;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TamanioMueble tamanio;

    @Column(nullable = false)
    private String material;
}
