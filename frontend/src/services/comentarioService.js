import api from './api';

const USER_ID = 1;

export const comentarioService = {
  listarAprobados: (cursoId) =>
    api.get(`/comentarios/cursos/${cursoId}`).then(r => r.data),

  resumen: (cursoId) =>
    api.get(`/comentarios/cursos/${cursoId}/resumen`).then(r => r.data),

  crear: (cursoId, texto, calificacion) =>
    api.post(`/comentarios/cursos/${cursoId}`, { usuarioId: USER_ID, texto, calificacion }).then(r => r.data),

  // Admin
  listarTodos: () =>
    api.get('/comentarios/admin').then(r => r.data),

  listarPendientes: () =>
    api.get('/comentarios/admin/pendientes').then(r => r.data),

  aprobar: (id) =>
    api.patch(`/comentarios/${id}/estado`, { estado: 'APROBADO' }).then(r => r.data),

  rechazar: (id) =>
    api.patch(`/comentarios/${id}/estado`, { estado: 'RECHAZADO' }).then(r => r.data),

  eliminar: (id) =>
    api.delete(`/comentarios/${id}`),
};
