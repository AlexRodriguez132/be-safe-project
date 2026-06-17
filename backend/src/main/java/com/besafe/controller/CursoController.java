package com.besafe.controller;

import com.besafe.dto.*;
import com.besafe.service.CursoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/cursos")
@RequiredArgsConstructor
@CrossOrigin(origins = "${cors.allowed-origins}")
public class CursoController {

    private final CursoService cursoService;

    @GetMapping
    public ResponseEntity<List<CursoResponseDTO>> listarTodos(
            @RequestParam(required = false) Boolean estado,
            @RequestParam(required = false) String buscar) {

        List<CursoResponseDTO> result;
        if (buscar != null && !buscar.isBlank()) {
            result = cursoService.buscarPorTitulo(buscar);
        } else if (estado != null) {
            result = cursoService.listarPorEstado(estado);
        } else {
            result = cursoService.listarTodos();
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/populares")
    public ResponseEntity<List<CursoResponseDTO>> listarPopulares() {
        return ResponseEntity.ok(cursoService.listarPopulares());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CursoResponseDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(cursoService.obtenerPorId(id));
    }

    @PostMapping
    public ResponseEntity<CursoResponseDTO> crear(@Valid @RequestBody CursoRequestDTO dto) throws IOException {
        return ResponseEntity.status(HttpStatus.CREATED).body(cursoService.crear(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CursoResponseDTO> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody CursoRequestDTO dto) throws IOException {
        return ResponseEntity.ok(cursoService.actualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) throws IOException {
        cursoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
