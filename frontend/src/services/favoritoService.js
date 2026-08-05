import api from './api';

const USER_ID = 1;

export const favoritoService = {
  listar: () =>
    api.get(`/favoritos/${USER_ID}`).then(r => r.data),

  esFavorito: (cursoId) =>
    api.get(`/favoritos/${USER_ID}/cursos/${cursoId}`).then(r => r.data.favorito),

  toggle: (cursoId) =>
    api.post(`/favoritos/${USER_ID}/cursos/${cursoId}/toggle`).then(r => r.data.favorito),
};
