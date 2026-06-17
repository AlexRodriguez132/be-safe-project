package com.besafe.dto;

import lombok.*;
import java.util.List;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class LeccionDTO {
    private Long idLeccion;
    private String titulo;
    private String descripcion;
    private List<BloqueDTO> bloques;
}
