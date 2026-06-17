package com.besafe.service;

import com.besafe.config.JsonDataStore;
import com.besafe.dto.CategoriaDTO;
import com.besafe.model.CategoriaModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoriaService {

    private final JsonDataStore store;

    public List<CategoriaDTO> listarTodas() {
        return store.getData().getCategorias().stream()
                .map(c -> CategoriaDTO.builder()
                        .idCategoria(c.getIdCategoria())
                        .nombreCategoria(c.getNombreCategoria())
                        .descripcion(c.getDescripcion())
                        .build())
                .collect(Collectors.toList());
    }

    public CategoriaDTO crear(CategoriaDTO dto) throws IOException {
        CategoriaModel cat = CategoriaModel.builder()
                .idCategoria(store.getData().getNextCategoriaId())
                .nombreCategoria(dto.getNombreCategoria())
                .descripcion(dto.getDescripcion())
                .build();
        store.getData().setNextCategoriaId(store.getData().getNextCategoriaId() + 1);
        store.getData().getCategorias().add(cat);
        store.save();
        return CategoriaDTO.builder()
                .idCategoria(cat.getIdCategoria())
                .nombreCategoria(cat.getNombreCategoria())
                .descripcion(cat.getDescripcion())
                .build();
    }

    public void eliminar(Long id) throws IOException {
        store.getData().getCategorias().removeIf(c -> c.getIdCategoria().equals(id));
        store.save();
    }
}
