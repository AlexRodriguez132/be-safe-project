package com.besafe.model;

import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class PreguntaModel {
    private Long idPregunta;
    private String titulo;
    private String tipo; // UNA_OPCION | MAS_OPCIONES
    private List<OpcionModel> opciones = new ArrayList<>();
}
