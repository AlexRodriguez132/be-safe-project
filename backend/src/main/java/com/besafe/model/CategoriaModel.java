package com.besafe.model;

import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class CategoriaModel {
    private Long idCategoria;
    private String nombreCategoria;
    private String descripcion;
}
