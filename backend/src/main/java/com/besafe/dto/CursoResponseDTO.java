package com.besafe.dto;

import lombok.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CursoResponseDTO {
    private Long idCurso;
    private String titulo;
    private String descripcion;
    private String url;
    private String color;
    private String portada;
    private Boolean estado;
    private LocalDate fechaCreacion;
    private String instructorNombre;
    private Long instructorId;
    private Set<CategoriaDTO> categorias;
    private int totalModulos;
    private int totalLecciones;
    private List<ModuloDTO> modulos;
}
