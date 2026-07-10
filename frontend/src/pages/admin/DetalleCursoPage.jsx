import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cursoService, categoriaService, moduloService } from '../../services/cursoService';
import './DetalleCursoPage.css';

const COLORES = ['#59CBA5', '#fbbf24', '#93c5fd', '#f9a8d4'];

export default function DetalleCursoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curso, setCurso] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [editandoDesc, setEditandoDesc] = useState(false);
  const [desc, setDesc] = useState('');
  const [saving, setSaving] = useState(false);

  const cargar = async () => {
    const [c, cats] = await Promise.all([
      cursoService.obtenerPorId(id),
      categoriaService.listarTodas(),
    ]);
    setCurso(c);
    setDesc(c.descripcion || '');
    setCategorias(cats);
  };

  useEffect(() => { cargar(); }, [id]);

  const guardarCampo = async (campo, valor) => {
    setSaving(true);
    try {
      const updated = await cursoService.actualizar(id, {
        titulo: curso.titulo,
        descripcion: curso.descripcion,
        url: curso.url,
        color: curso.color,
        portada: curso.portada,
        estado: curso.estado,
        idInstructor: curso.instructorId,
        idsCategorias: curso.categorias ? [...curso.categorias].map(c => c.idCategoria) : [],
        [campo]: valor,
      });
      setCurso(updated);
      setDesc(updated.descripcion || '');
    } finally {
      setSaving(false);
    }
  };

  const eliminarModulo = async (idModulo) => {
    if (!window.confirm('¿Eliminar este módulo y sus lecciones?')) return;
    await moduloService.eliminar(id, idModulo);
    cargar();
  };

  if (!curso) return <p className="loading">Cargando...</p>;

  const catActual = curso.categorias && [...curso.categorias][0];

  return (
    <div className="detalle-curso">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span className="breadcrumb__link" onClick={() => navigate('/admin/cursos')}>Cursos</span>
        <span> &gt; </span>
        <span>{curso.titulo}</span>
      </div>

      {/* Card principal */}
      <div className="detalle-card">
        <div className="detalle-card__top">
          <div className="detalle-card__left">
            <div className="detalle-card__header">
              <button className="back-btn" onClick={() => navigate('/admin/cursos')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <h1>{curso.titulo}</h1>
              <button className="icon-btn" onClick={() => navigate(`/admin/cursos/editar/${id}`)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <span className={`estado-badge ${curso.estado ? 'estado-badge--activo' : 'estado-badge--borrador'}`}>
                {curso.estado ? 'Activo' : 'Borrador'}
              </span>
            </div>

            <div className="detalle-campo">
              <label>Color del curso:</label>
              <div className="color-picker">
                {COLORES.map(c => (
                  <button key={c} type="button"
                    className={`color-swatch ${curso.color === c ? 'color-swatch--active' : ''}`}
                    style={{ backgroundColor: c }}
                    onClick={() => guardarCampo('color', c)}
                  />
                ))}
              </div>
            </div>

            <div className="detalle-campo detalle-campo--row">
              <svg className="campo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <label>Instructor:</label>
              <span>{curso.instructorNombre || '—'}</span>
            </div>

            <div className="detalle-campo detalle-campo--row">
              <svg className="campo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
              <label>Categoría:</label>
              <span>{catActual?.nombreCategoria || '—'}</span>
            </div>

            <div className="detalle-campo detalle-campo--row">
              <svg className="campo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              <label>URL:</label>
              <span>/{curso.url}</span>
            </div>
          </div>

          <div className="detalle-card__cover" style={{ backgroundColor: curso.color || '#f5e6d8' }}>
            {curso.portada
              ? <img src={curso.portada} alt={curso.titulo} />
              : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9l4-4 4 4 4-4 4 4"/><circle cx="8" cy="14" r="2"/></svg>
            }
            <button className="cover-edit-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
          </div>
        </div>

        {/* Descripción */}
        <div className="detalle-desc">
          {editandoDesc ? (
            <div className="desc-edit">
              <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} />
              <div className="desc-edit__actions">
                <button className="btn-sm btn-sm--primary" disabled={saving}
                  onClick={async () => { await guardarCampo('descripcion', desc); setEditandoDesc(false); }}>
                  Guardar
                </button>
                <button className="btn-sm" onClick={() => setEditandoDesc(false)}>Cancelar</button>
              </div>
            </div>
          ) : (
            <div className="desc-view">
              <p>{curso.descripcion || 'Sin descripción.'}</p>
              <button className="icon-btn" onClick={() => setEditandoDesc(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Módulos */}
      <div className="modulos-card">
        <div className="modulos-card__header">
          <div>
            <h2>Módulos del curso</h2>
            <p>Organiza el contenido de tu curso en módulos</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-vista-previa" onClick={() => navigate(`/admin/cursos/${id}/vista-previa`)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              Vista previa
            </button>
            <button className="btn-crear" onClick={() => navigate(`/admin/cursos/${id}/modulos/nuevo`)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              Crear módulo
            </button>
          </div>
        </div>

        <div className="modulos-list">
          {(!curso.modulos || curso.modulos.length === 0) ? (
            <p className="empty">Sin módulos aún.</p>
          ) : curso.modulos.map(m => (
            <div key={m.idModulo} className="modulo-item">
              <span className="modulo-item__drag">⠿</span>
              <div className="modulo-item__info">
                <strong>{m.titulo}</strong>
                <span>{m.lecciones?.length ?? 0} lecciones &nbsp; {m.duracion}</span>
              </div>
              <div className="modulo-item__actions">
                <button className="icon-btn" onClick={() => navigate(`/admin/cursos/${id}/modulos/${m.idModulo}/editar`)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button className="icon-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                </button>
                <button className="icon-btn icon-btn--danger" onClick={() => eliminarModulo(m.idModulo)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="btn-agregar-modulo" onClick={() => navigate(`/admin/cursos/${id}/modulos/nuevo`)}>
          Agregar módulo
        </button>
      </div>
    </div>
  );
}

