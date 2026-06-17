package com.besafe.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import java.util.Set;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CursoRequestDTO {

    @NotBlank(message = "El título es obligatorio")
    private String titulo;

    private String descripcion;
    private String url;
    private String color;
    private String portada;
    private Boolean estado;
    private Long idInstructor;
    private Set<Long> idsCategorias;
}
