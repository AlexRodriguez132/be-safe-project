package com.besafe.model;

import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ModuloModel {
    private Long idModulo;
    private String titulo;
    private String duracion;
    private List<LeccionModel> lecciones = new ArrayList<>();
    private List<CuestionarioModel> cuestionarios = new ArrayList<>();
}
