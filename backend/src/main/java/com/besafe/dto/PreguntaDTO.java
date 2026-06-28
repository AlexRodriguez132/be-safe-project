package com.besafe.dto;

import lombok.*;
import java.util.List;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class PreguntaDTO {
    private Long idPregunta;
    private String titulo;
    private String tipo;
    private List<OpcionDTO> opciones;
}
