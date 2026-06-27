package com.besafe.model;

import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class CursoModel {
    private Long idCurso;
    private String titulo;
    private String descripcion;
    private String url;
    private String color;
    private String portada;
    private Boolean estado;
    private String fechaCreacion;
    private Long idInstructor;
    private List<Long> idsCategorias;
    private List<ModuloModel> modulos = new ArrayList<>();
}
