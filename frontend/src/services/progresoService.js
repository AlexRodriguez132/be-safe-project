import api from './api';

// userId temporal hasta que exista autenticación real
const USER_ID = 1;

export const progresoService = {
  obtener: (cursoId) =>
    api.get(`/progreso/${USER_ID}/cursos/${cursoId}`).then(r => r.data),

  iniciar: (cursoId, modalidad = 'LIBRE') =>
    api.post(`/progreso/${USER_ID}/cursos/${cursoId}/iniciar`, { modalidad }).then(r => r.data),

  marcarCompletada: (cursoId, leccionId) =>
    api.post(`/progreso/${USER_ID}/cursos/${cursoId}/lecciones/${leccionId}/completar`).then(r => r.data),
};
