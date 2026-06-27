package com.besafe.dto;

import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class BloqueDTO {
    private Long idBloque;
    private String tipo;
    private String contenido;
    private String descripcion;
}
