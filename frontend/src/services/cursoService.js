import api from './api';

export const cursoService = {
  listarTodos: (params = {}) => api.get('/cursos', { params }).then(r => r.data),
  listarPopulares: () => api.get('/cursos/populares').then(r => r.data),
  obtenerPorId: (id) => api.get(`/cursos/${id}`).then(r => r.data),
  crear: (data) => api.post('/cursos', data).then(r => r.data),
  actualizar: (id, data) => api.put(`/cursos/${id}`, data).then(r => r.data),
  eliminar: (id) => api.delete(`/cursos/${id}`),
};

export const moduloService = {
  crear: (idCurso, data) => api.post(`/cursos/${idCurso}/modulos`, data).then(r => r.data),
  actualizar: (idCurso, idModulo, data) => api.put(`/cursos/${idCurso}/modulos/${idModulo}`, data).then(r => r.data),
  eliminar: (idCurso, idModulo) => api.delete(`/cursos/${idCurso}/modulos/${idModulo}`),
  crearLeccion: (idCurso, idModulo, data) => api.post(`/cursos/${idCurso}/modulos/${idModulo}/lecciones`, data).then(r => r.data),
  actualizarLeccion: (idCurso, idModulo, idLeccion, data) => api.put(`/cursos/${idCurso}/modulos/${idModulo}/lecciones/${idLeccion}`, data).then(r => r.data),
  eliminarLeccion: (idCurso, idModulo, idLeccion) => api.delete(`/cursos/${idCurso}/modulos/${idModulo}/lecciones/${idLeccion}`),
};

export const categoriaService = {
  listarTodas: () => api.get('/categorias').then(r => r.data),
  crear: (data) => api.post('/categorias', data).then(r => r.data),
};
