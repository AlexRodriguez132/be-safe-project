package com.besafe.controller;

import com.besafe.dto.*;
import com.besafe.service.ModuloService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/cursos/{idCurso}/modulos")
@RequiredArgsConstructor
@CrossOrigin(origins = "${cors.allowed-origins}")
public class ModuloController {

    private final ModuloService moduloService;

    @PostMapping
    public ResponseEntity<ModuloDTO> crear(@PathVariable Long idCurso,
                                           @RequestBody ModuloDTO dto) throws IOException {
        return ResponseEntity.status(HttpStatus.CREATED).body(moduloService.crear(idCurso, dto));
    }

    @PutMapping("/{idModulo}")
    public ResponseEntity<ModuloDTO> actualizar(@PathVariable Long idCurso,
                                                @PathVariable Long idModulo,
                                                @RequestBody ModuloDTO dto) throws IOException {
        return ResponseEntity.ok(moduloService.actualizar(idCurso, idModulo, dto));
    }

    @DeleteMapping("/{idModulo}")
    public ResponseEntity<Void> eliminar(@PathVariable Long idCurso,
                                         @PathVariable Long idModulo) throws IOException {
        moduloService.eliminar(idCurso, idModulo);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{idModulo}/lecciones")
    public ResponseEntity<LeccionDTO> crearLeccion(@PathVariable Long idCurso,
                                                    @PathVariable Long idModulo,
                                                    @RequestBody LeccionDTO dto) throws IOException {
        return ResponseEntity.status(HttpStatus.CREATED).body(moduloService.crearLeccion(idCurso, idModulo, dto));
    }

    @PutMapping("/{idModulo}/lecciones/{idLeccion}")
    public ResponseEntity<LeccionDTO> actualizarLeccion(@PathVariable Long idCurso,
                                                         @PathVariable Long idModulo,
                                                         @PathVariable Long idLeccion,
                                                         @RequestBody LeccionDTO dto) throws IOException {
        return ResponseEntity.ok(moduloService.actualizarLeccion(idCurso, idModulo, idLeccion, dto));
    }

    @DeleteMapping("/{idModulo}/lecciones/{idLeccion}")
    public ResponseEntity<Void> eliminarLeccion(@PathVariable Long idCurso,
                                                 @PathVariable Long idModulo,
                                                 @PathVariable Long idLeccion) throws IOException {
        moduloService.eliminarLeccion(idCurso, idModulo, idLeccion);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{idModulo}/cuestionarios")
    public ResponseEntity<CuestionarioDTO> crearCuestionario(@PathVariable Long idCurso,
                                                              @PathVariable Long idModulo,
                                                              @RequestBody CuestionarioDTO dto) throws IOException {
        return ResponseEntity.status(HttpStatus.CREATED).body(moduloService.crearCuestionario(idCurso, idModulo, dto));
    }

    @PutMapping("/{idModulo}/cuestionarios/{idCuestionario}")
    public ResponseEntity<CuestionarioDTO> actualizarCuestionario(@PathVariable Long idCurso,
                                                                   @PathVariable Long idModulo,
                                                                   @PathVariable Long idCuestionario,
                                                                   @RequestBody CuestionarioDTO dto) throws IOException {
        return ResponseEntity.ok(moduloService.actualizarCuestionario(idCurso, idModulo, idCuestionario, dto));
    }

    @DeleteMapping("/{idModulo}/cuestionarios/{idCuestionario}")
    public ResponseEntity<Void> eliminarCuestionario(@PathVariable Long idCurso,
                                                      @PathVariable Long idModulo,
                                                      @PathVariable Long idCuestionario) throws IOException {
        moduloService.eliminarCuestionario(idCurso, idModulo, idCuestionario);
        return ResponseEntity.noContent().build();
    }
}
