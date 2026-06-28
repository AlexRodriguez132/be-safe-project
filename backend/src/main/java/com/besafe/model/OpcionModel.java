package com.besafe.model;

import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class OpcionModel {
    private Long idOpcion;
    private String texto;
    private boolean esCorrecta;
}
