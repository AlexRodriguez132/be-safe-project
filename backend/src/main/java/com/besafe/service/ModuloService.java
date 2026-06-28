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
        if (curso.getModulos() == null) curso.setModulos(new ArrayList<>());
        ModuloModel modulo = ModuloModel.builder()
                .idModulo(store.getData().getNextModuloId())
                .titulo(dto.getTitulo())
                .duracion(dto.getDuracion())
                .lecciones(new ArrayList<>())
                .cuestionarios(new ArrayList<>())
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

    // --- Lecciones ---

    public LeccionDTO crearLeccion(Long idCurso, Long idModulo, LeccionDTO dto) throws IOException {
        ModuloModel modulo = getModulo(idCurso, idModulo);
        if (modulo.getLecciones() == null) modulo.setLecciones(new ArrayList<>());
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

    // --- Cuestionarios ---

    public CuestionarioDTO crearCuestionario(Long idCurso, Long idModulo, CuestionarioDTO dto) throws IOException {
        ModuloModel modulo = getModulo(idCurso, idModulo);
        if (modulo.getCuestionarios() == null) modulo.setCuestionarios(new ArrayList<>());
        long nextId = store.getData().getNextLeccionId();
        store.getData().setNextLeccionId(nextId + 1);
        List<PreguntaModel> preguntas = buildPreguntas(dto.getPreguntas(), new long[]{nextId * 100});
        CuestionarioModel cuestionario = CuestionarioModel.builder()
                .idCuestionario(nextId)
                .titulo(dto.getTitulo())
                .preguntas(preguntas)
                .build();
        modulo.getCuestionarios().add(cuestionario);
        store.save();
        return toCuestionarioDTO(cuestionario);
    }

    public CuestionarioDTO actualizarCuestionario(Long idCurso, Long idModulo, Long idCuestionario, CuestionarioDTO dto) throws IOException {
        ModuloModel modulo = getModulo(idCurso, idModulo);
        for (CuestionarioModel c : modulo.getCuestionarios()) {
            if (c.getIdCuestionario().equals(idCuestionario)) {
                c.setTitulo(dto.getTitulo());
                c.setPreguntas(buildPreguntas(dto.getPreguntas(), new long[]{idCuestionario * 100}));
                store.save();
                return toCuestionarioDTO(c);
            }
        }
        throw new RuntimeException("Cuestionario no encontrado: " + idCuestionario);
    }

    public void eliminarCuestionario(Long idCurso, Long idModulo, Long idCuestionario) throws IOException {
        getModulo(idCurso, idModulo).getCuestionarios()
                .removeIf(c -> c.getIdCuestionario().equals(idCuestionario));
        store.save();
    }

    // --- Helpers ---

    private List<PreguntaModel> buildPreguntas(List<PreguntaDTO> dtos, long[] seed) {
        if (dtos == null) return new ArrayList<>();
        return dtos.stream().map(p -> {
            List<OpcionModel> opciones = p.getOpciones() == null ? new ArrayList<>() :
                    p.getOpciones().stream().map(o -> OpcionModel.builder()
                            .idOpcion(o.getIdOpcion() != null ? o.getIdOpcion() : seed[0]++)
                            .texto(o.getTexto())
                            .esCorrecta(o.isEsCorrecta())
                            .build()).collect(Collectors.toList());
            return PreguntaModel.builder()
                    .idPregunta(p.getIdPregunta() != null ? p.getIdPregunta() : seed[0]++)
                    .titulo(p.getTitulo())
                    .tipo(p.getTipo())
                    .opciones(opciones)
                    .build();
        }).collect(Collectors.toList());
    }

    private CuestionarioDTO toCuestionarioDTO(CuestionarioModel c) {
        List<PreguntaDTO> preguntas = c.getPreguntas() == null ? new ArrayList<>() :
                c.getPreguntas().stream().map(p -> PreguntaDTO.builder()
                        .idPregunta(p.getIdPregunta())
                        .titulo(p.getTitulo())
                        .tipo(p.getTipo())
                        .opciones(p.getOpciones() == null ? new ArrayList<>() :
                                p.getOpciones().stream().map(o -> OpcionDTO.builder()
                                        .idOpcion(o.getIdOpcion())
                                        .texto(o.getTexto())
                                        .esCorrecta(o.isEsCorrecta())
                                        .build()).collect(Collectors.toList()))
                        .build()).collect(Collectors.toList());
        return CuestionarioDTO.builder()
                .idCuestionario(c.getIdCuestionario())
                .titulo(c.getTitulo())
                .preguntas(preguntas)
                .build();
    }

    private ModuloDTO toDTO(ModuloModel m) {
        return ModuloDTO.builder()
                .idModulo(m.getIdModulo())
                .titulo(m.getTitulo())
                .duracion(m.getDuracion())
                .lecciones(m.getLecciones() == null ? new ArrayList<>() :
                        m.getLecciones().stream().map(this::toLeccionDTO).collect(Collectors.toList()))
                .cuestionarios(m.getCuestionarios() == null ? new ArrayList<>() :
                        m.getCuestionarios().stream().map(this::toCuestionarioDTO).collect(Collectors.toList()))
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
}
