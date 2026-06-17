package com.besafe.model;

import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class DataStore {
    private List<CategoriaModel> categorias = new ArrayList<>();
    private List<CursoModel> cursos = new ArrayList<>();
    private Long nextCursoId = 1L;
    private Long nextCategoriaId = 1L;
    private Long nextModuloId = 1L;
    private Long nextLeccionId = 1L;
}
