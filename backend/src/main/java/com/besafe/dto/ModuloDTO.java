package com.besafe.dto;

import lombok.*;
import java.util.List;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ModuloDTO {
    private Long idModulo;
    private String titulo;
    private String duracion;
    private List<LeccionDTO> lecciones;
}
