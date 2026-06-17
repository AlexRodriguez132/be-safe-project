package com.besafe.service;

import com.besafe.config.JsonDataStore;
import com.besafe.dto.*;
import com.besafe.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModuloService {

    private final JsonDataStore store;

    public ModuloDTO crear(Long idCurso, ModuloDTO dto) throws IOException {
        CursoModel curso = getCurso(idCurso);
        ModuloModel modulo = ModuloModel.builder()
                .idModulo(store.getData().getNextModuloId())
                .titulo(dto.getTitulo())
                .duracion(dto.getDuracion())
                .lecciones(new ArrayList<>())
                .build();
        store.getData().setNextModuloId(store.getData().getNextModuloId() + 1);
        curso.getModulos().add(modulo);
        store.save();
        return toDTO(modulo);
    }

    public ModuloDTO actualizar(Long idCurso, Long idModulo, ModuloDTO dto) throws IOException {
        CursoModel curso = getCurso(idCurso);
        List<ModuloModel> modulos = curso.getModulos();
        for (int i = 0; i < modulos.size(); i++) {
            if (modulos.get(i).getIdModulo().equals(idModulo)) {
                modulos.get(i).setTitulo(dto.getTitulo());
                modulos.get(i).setDuracion(dto.getDuracion());
                store.save();
                return toDTO(modulos.get(i));
            }
        }
        throw new RuntimeException("Módulo no encontrado: " + idModulo);
    }

    public void eliminar(Long idCurso, Long idModulo) throws IOException {
        CursoModel curso = getCurso(idCurso);
        curso.getModulos().removeIf(m -> m.getIdModulo().equals(idModulo));
        store.save();
    }

    public LeccionDTO crearLeccion(Long idCurso, Long idModulo, LeccionDTO dto) throws IOException {
        ModuloModel modulo = getModulo(idCurso, idModulo);
        LeccionModel leccion = LeccionModel.builder()
                .idLeccion(store.getData().getNextLeccionId())
                .titulo(dto.getTitulo())
                .descripcion(dto.getDescripcion())
                .bloques(new ArrayList<>())
                .build();
        store.getData().setNextLeccionId(store.getData().getNextLeccionId() + 1);
        modulo.getLecciones().add(leccion);
        store.save();
        return toLeccionDTO(leccion);
    }

    public LeccionDTO actualizarLeccion(Long idCurso, Long idModulo, Long idLeccion, LeccionDTO dto) throws IOException {
        ModuloModel modulo = getModulo(idCurso, idModulo);
        List<LeccionModel> lecciones = modulo.getLecciones();
        for (LeccionModel l : lecciones) {
            if (l.getIdLeccion().equals(idLeccion)) {
                l.setTitulo(dto.getTitulo());
                l.setDescripcion(dto.getDescripcion());
                if (dto.getBloques() != null) {
                    l.setBloques(dto.getBloques().stream().map(b -> BloqueModel.builder()
                            .idBloque(b.getIdBloque())
                            .tipo(b.getTipo())
                            .contenido(b.getContenido())
                            .descripcion(b.getDescripcion())
                            .build()).collect(Collectors.toList()));
                }
                store.save();
                return toLeccionDTO(l);
            }
        }
        throw new RuntimeException("Lección no encontrada: " + idLeccion);
    }

    public void eliminarLeccion(Long idCurso, Long idModulo, Long idLeccion) throws IOException {
        getModulo(idCurso, idModulo).getLecciones().removeIf(l -> l.getIdLeccion().equals(idLeccion));
        store.save();
    }

    private CursoModel getCurso(Long idCurso) {
        return store.getData().getCursos().stream()
                .filter(c -> c.getIdCurso().equals(idCurso))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Curso no encontrado: " + idCurso));
    }

    private ModuloModel getModulo(Long idCurso, Long idModulo) {
        return getCurso(idCurso).getModulos().stream()
                .filter(m -> m.getIdModulo().equals(idModulo))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Módulo no encontrado: " + idModulo));
    }

    private ModuloDTO toDTO(ModuloModel m) {
        return ModuloDTO.builder()
                .idModulo(m.getIdModulo())
                .titulo(m.getTitulo())
                .duracion(m.getDuracion())
                .lecciones(m.getLecciones() == null ? new ArrayList<>() :
                        m.getLecciones().stream().map(this::toLeccionDTO).collect(Collectors.toList()))
                .build();
    }

    private LeccionDTO toLeccionDTO(LeccionModel l) {
        return LeccionDTO.builder()
                .idLeccion(l.getIdLeccion())
                .titulo(l.getTitulo())
                .descripcion(l.getDescripcion())
                .bloques(l.getBloques() == null ? new ArrayList<>() :
                        l.getBloques().stream().map(b -> BloqueDTO.builder()
                                .idBloque(b.getIdBloque())
                                .tipo(b.getTipo())
                                .contenido(b.getContenido())
                                .descripcion(b.getDescripcion())
                                .build()).collect(Collectors.toList()))
                .build();
    }
}
