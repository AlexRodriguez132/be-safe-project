package com.besafe.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CategoriaDTO {
    private Long idCategoria;
    private String nombreCategoria;
    private String descripcion;
}
