package com.tarea2Ingenieria;

import com.tarea2Ingenieria.model.Mueble;
import com.tarea2Ingenieria.model.Variante;

import com.tarea2Ingenieria.model.enums.EstadoMueble;
import com.tarea2Ingenieria.model.enums.TamanioMueble;

import com.tarea2Ingenieria.repository.MuebleRepository;
import com.tarea2Ingenieria.repository.VarianteRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataLoader implements CommandLineRunner {

    private final MuebleRepository muebleRepository;
    private final VarianteRepository varianteRepository;

    public DataLoader(MuebleRepository muebleRepository, VarianteRepository varianteRepository) {
        this.muebleRepository = muebleRepository;
        this.varianteRepository = varianteRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        cargarVariantes();
        cargarMuebles();
    }

    private void cargarVariantes() {
        if (varianteRepository.count() == 0) {
            Variante v1 = new Variante();
            v1.setNombre("Normal");
            v1.setAumentoPrecio(0.0);

            Variante v2 = new Variante();
            v2.setNombre("Barniz Premium");
            v2.setAumentoPrecio(3500.0);

            Variante v3 = new Variante();
            v3.setNombre("Acabado Mate");
            v3.setAumentoPrecio(2000.0);

            varianteRepository.saveAll(Arrays.asList(v1, v2, v3));
            System.out.println("✅ Variantes precargadas exitosamente");
        }
    }

    private void cargarMuebles() {
        if (muebleRepository.count() == 0) {
            // Mueble 1
            Mueble m1 = new Mueble();
            m1.setNombreMueble("Silla de Roble");
            m1.setTipo("Silla");
            m1.setMaterial("Roble");
            m1.setPrecioBase(15000.0);
            m1.setStock(20);
            m1.setTamanio(TamanioMueble.MEDIANO);
            m1.setEstado(EstadoMueble.ACTIVO);

            // Mueble 2
            Mueble m2 = new Mueble();
            m2.setNombreMueble("Mesa Comedor Familiar");
            m2.setTipo("Mesa");
            m2.setMaterial("Pino");
            m2.setPrecioBase(85000.0);
            m2.setStock(5);
            m2.setTamanio(TamanioMueble.GRANDE);
            m2.setEstado(EstadoMueble.ACTIVO);

            // Mueble 3
            Mueble m3 = new Mueble();
            m3.setNombreMueble("Sofá 3 Cuerpos");
            m3.setTipo("Sofá");
            m3.setMaterial("Tela Premium");
            m3.setPrecioBase(120000.0);
            m3.setStock(3);
            m3.setTamanio(TamanioMueble.GRANDE);
            m3.setEstado(EstadoMueble.ACTIVO);

            muebleRepository.saveAll(Arrays.asList(m1, m2, m3));
            System.out.println("Muebles precargados exitosamente");
        }
    }
}