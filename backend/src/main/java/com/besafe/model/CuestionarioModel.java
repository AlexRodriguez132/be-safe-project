package com.besafe.model;

import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class CuestionarioModel {
    private Long idCuestionario;
    private String titulo;
    private List<PreguntaModel> preguntas = new ArrayList<>();
}
