import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cursoService, moduloService } from '../../services/cursoService';
import './NuevoModuloPage.css';

export default function NuevoModuloPage() {
  const { id, idModulo } = useParams();
  const navigate = useNavigate();
  const esEdicion = Boolean(idModulo);

  const [cursotitulo, setCursoTitulo] = useState('');
  const [modulo, setModulo] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [duracion, setDuracion] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    cursoService.obtenerPorId(id).then(c => {
      setCursoTitulo(c.titulo);
      if (esEdicion) {
        const m = c.modulos?.find(m => String(m.idModulo) === String(idModulo));
        if (m) {
          setModulo(m);
          setTitulo(m.titulo);
          setDuracion(m.duracion || '');
        }
      }
    });
  }, [id, idModulo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo.trim()) { setError('El título es obligatorio.'); return; }
    setSaving(true);
    setError('');
    try {
      const data = { titulo, duracion };
      if (esEdicion) {
        await moduloService.actualizar(id, idModulo, data);
      } else {
        await moduloService.crear(id, data);
      }
      navigate(`/admin/cursos/${id}/detalle`);
    } catch {
      setError('Error al guardar.');
    } finally {
      setSaving(false);
    }
  };

  const eliminarLeccion = async (idLeccion) => {
    if (!window.confirm('¿Eliminar esta lección?')) return;
    await moduloService.eliminarLeccion(id, idModulo, idLeccion);
    const c = await cursoService.obtenerPorId(id);
    const m = c.modulos?.find(m => String(m.idModulo) === String(idModulo));
    setModulo(m);
  };

  const lecciones = modulo?.lecciones || [];

  return (
    <div className="nuevo-modulo">
      <div className="breadcrumb">
        <span className="breadcrumb__link" onClick={() => navigate('/admin/cursos')}>Cursos</span>
        <span> &gt; </span>
        <span className="breadcrumb__link" onClick={() => navigate(`/admin/cursos/${id}/detalle`)}>{cursotitulo}</span>
        <span> &gt; </span>
        <strong>{esEdicion ? 'Editar módulo' : 'Nuevo módulo'}</strong>
      </div>

      <div className="nuevo-modulo__card">
        <div className="nuevo-modulo__header">
          <button className="back-btn" onClick={() => navigate(`/admin/cursos/${id}/detalle`)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div>
            <h1>{esEdicion ? 'Editar módulo' : 'Nuevo módulo'}</h1>
            <p>Completa la información para crear un nuevo módulo dentro del curso.</p>
          </div>
        </div>

        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit} className="modulo-form">
          <div className="form-row">
            <div className="form-group">
              <label>Título del módulo *</label>
              <input value={titulo} onChange={e => setTitulo(e.target.value)}
                placeholder="Escribe el título de módulo" />
            </div>
            <div className="form-group">
              <label>Duración *</label>
              <div className="input-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <input value={duracion} onChange={e => setDuracion(e.target.value)}
                  placeholder="3 Semanas, 5 horas" />
              </div>
            </div>
          </div>

          <button type="submit" className="btn-save" disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar módulo'}
          </button>
        </form>
      </div>

      {/* Lecciones — solo en edición */}
      {esEdicion && (
        <div className="lecciones-card">
          <div className="lecciones-card__header">
            <div>
              <h2>Tareas del curso</h2>
              <p>Agrega tareas a tus módulos</p>
            </div>
            <button className="btn-crear"
              onClick={() => navigate(`/admin/cursos/${id}/modulos/${idModulo}/lecciones/nuevo`)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              Añadir recurso
            </button>
          </div>

          <div className="lecciones-list">
            {lecciones.length === 0 ? (
              <p className="empty">Sin lecciones aún.</p>
            ) : lecciones.map(l => (
              <div key={l.idLeccion} className="leccion-item">
                <span className="leccion-item__drag">⠿</span>
                <strong>{l.titulo}</strong>
                <div className="leccion-item__actions">
                  <button className="icon-btn"
                    onClick={() => navigate(`/admin/cursos/${id}/modulos/${idModulo}/lecciones/${l.idLeccion}/editar`)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button className="icon-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  </button>
                  <button className="icon-btn icon-btn--danger" onClick={() => eliminarLeccion(l.idLeccion)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
