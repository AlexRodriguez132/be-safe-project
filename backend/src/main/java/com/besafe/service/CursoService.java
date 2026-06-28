package com.besafe.service;

import com.besafe.config.JsonDataStore;
import com.besafe.dto.*;
import com.besafe.model.*;
import com.besafe.model.CursoModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CursoService {

    private final JsonDataStore store;
    private final CategoriaService categoriaService;

    public List<CursoResponseDTO> listarTodos() {
        return store.getData().getCursos().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<CursoResponseDTO> listarPorEstado(Boolean estado) {
        return store.getData().getCursos().stream()
                .filter(c -> estado.equals(c.getEstado()))
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<CursoResponseDTO> buscarPorTitulo(String titulo) {
        String q = titulo.toLowerCase();
        return store.getData().getCursos().stream()
                .filter(c -> c.getTitulo().toLowerCase().contains(q))
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<CursoResponseDTO> listarPopulares() {
        return store.getData().getCursos().stream()
                .filter(c -> Boolean.TRUE.equals(c.getEstado()))
                .limit(6)
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public CursoResponseDTO obtenerPorId(Long id) {
        return store.getData().getCursos().stream()
                .filter(c -> c.getIdCurso().equals(id))
                .findFirst()
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado: " + id));
    }

    public CursoResponseDTO crear(CursoRequestDTO dto) throws IOException {
        CursoModel curso = fromDTO(dto);
        curso.setIdCurso(store.getData().getNextCursoId());
        curso.setFechaCreacion(LocalDate.now().toString());
        store.getData().setNextCursoId(store.getData().getNextCursoId() + 1);
        store.getData().getCursos().add(curso);
        store.save();
        return toDTO(curso);
    }

    public CursoResponseDTO actualizar(Long id, CursoRequestDTO dto) throws IOException {
        List<CursoModel> cursos = store.getData().getCursos();
        for (int i = 0; i < cursos.size(); i++) {
            if (cursos.get(i).getIdCurso().equals(id)) {
                CursoModel updated = fromDTO(dto);
                updated.setIdCurso(id);
                updated.setFechaCreacion(cursos.get(i).getFechaCreacion());
                cursos.set(i, updated);
                store.save();
                return toDTO(updated);
            }
        }
        throw new RuntimeException("Curso no encontrado: " + id);
    }

    public void eliminar(Long id) throws IOException {
        boolean removed = store.getData().getCursos().removeIf(c -> c.getIdCurso().equals(id));
        if (!removed) throw new RuntimeException("Curso no encontrado: " + id);
        store.save();
    }

    private CursoModel fromDTO(CursoRequestDTO dto) {
        return CursoModel.builder()
                .titulo(dto.getTitulo())
                .descripcion(dto.getDescripcion())
                .url(dto.getUrl())
                .color(dto.getColor())
                .portada(dto.getPortada())
                .estado(dto.getEstado() != null ? dto.getEstado() : true)
                .idInstructor(dto.getIdInstructor())
                .idsCategorias(dto.getIdsCategorias() != null
                        ? new ArrayList<>(dto.getIdsCategorias()) : new ArrayList<>())
                .build();
    }

    private CursoResponseDTO toDTO(CursoModel c) {
        Set<CategoriaDTO> cats = categoriaService.listarTodas().stream()
                .filter(cat -> c.getIdsCategorias() != null && c.getIdsCategorias().contains(cat.getIdCategoria()))
                .collect(Collectors.toSet());

        List<ModuloDTO> modulos = c.getModulos() == null ? new ArrayList<>() :
                c.getModulos().stream().map(m -> ModuloDTO.builder()
                        .idModulo(m.getIdModulo())
                        .titulo(m.getTitulo())
                        .duracion(m.getDuracion())
                        .lecciones(m.getLecciones() == null ? new ArrayList<>() :
                                m.getLecciones().stream().map(l -> LeccionDTO.builder()
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
                                        .build()).collect(Collectors.toList()))
                        .cuestionarios(m.getCuestionarios() == null ? new ArrayList<>() :
                                m.getCuestionarios().stream().map(q -> CuestionarioDTO.builder()
                                        .idCuestionario(q.getIdCuestionario())
                                        .titulo(q.getTitulo())
                                        .preguntas(q.getPreguntas() == null ? new ArrayList<>() :
                                                q.getPreguntas().stream().map(p -> PreguntaDTO.builder()
                                                        .idPregunta(p.getIdPregunta())
                                                        .titulo(p.getTitulo())
                                                        .tipo(p.getTipo())
                                                        .opciones(p.getOpciones() == null ? new ArrayList<>() :
                                                                p.getOpciones().stream().map(o -> OpcionDTO.builder()
                                                                        .idOpcion(o.getIdOpcion())
                                                                        .texto(o.getTexto())
                                                                        .esCorrecta(o.isEsCorrecta())
                                                                        .build()).collect(Collectors.toList()))
                                                        .build()).collect(Collectors.toList()))
                                        .build()).collect(Collectors.toList()))
                        .build()).collect(Collectors.toList());

        int totalLecciones = c.getModulos() == null ? 0 :
                c.getModulos().stream().mapToInt(m -> m.getLecciones() == null ? 0 : m.getLecciones().size()).sum();

        return CursoResponseDTO.builder()
                .idCurso(c.getIdCurso())
                .titulo(c.getTitulo())
                .descripcion(c.getDescripcion())
                .url(c.getUrl())
                .color(c.getColor())
                .portada(c.getPortada())
                .estado(c.getEstado())
                .fechaCreacion(c.getFechaCreacion() != null ? LocalDate.parse(c.getFechaCreacion()) : null)
                .instructorId(c.getIdInstructor())
                .instructorNombre(null)
                .categorias(cats)
                .totalModulos(c.getModulos() == null ? 0 : c.getModulos().size())
                .totalLecciones(totalLecciones)
                .modulos(modulos)
                .build();
    }
}
