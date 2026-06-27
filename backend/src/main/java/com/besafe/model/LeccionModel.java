package com.besafe.model;

import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class LeccionModel {
    private Long idLeccion;
    private String titulo;
    private String descripcion;
    private List<BloqueModel> bloques = new ArrayList<>();
}
