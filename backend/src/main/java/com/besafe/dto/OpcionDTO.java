package com.besafe.dto;

import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class OpcionDTO {
    private Long idOpcion;
    private String texto;
    private boolean esCorrecta;
}
