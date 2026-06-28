package com.besafe.dto;

import lombok.*;
import java.util.List;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class CuestionarioDTO {
    private Long idCuestionario;
    private String titulo;
    private List<PreguntaDTO> preguntas;
}
