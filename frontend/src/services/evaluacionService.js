import api from './api';

const USER_ID = 1;

export const evaluacionService = {
  calificar: (cuestionarioId, respuestas) =>
    api.post(`/evaluaciones/${cuestionarioId}/calificar`, {
      usuarioId: USER_ID,
      respuestas,
    }).then(r => r.data),

  obtenerResultado: (cuestionarioId) =>
    api.get(`/evaluaciones/${cuestionarioId}/resultado/${USER_ID}`)
       .then(r => r.data)
       .catch(() => null),
};
