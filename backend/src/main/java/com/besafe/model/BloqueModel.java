package com.besafe.model;

import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class BloqueModel {
    private Long idBloque;
    private String tipo; // VIDEO, IMAGEN, ARCHIVO, ENLACE
    private String contenido;
    private String descripcion;
}
