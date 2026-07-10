import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cursoService } from '../../services/cursoService';
import './VistaPreviaCursoPage.css';

const COLORES_BLOQUE = { VIDEO: '#59CBA5', IMAGEN: '#8b5cf6', ARCHIVO: '#f59e0b', ENLACE: '#ec4899' };

const ICONOS = {
  VIDEO: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>,
  IMAGEN: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  ARCHIVO: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  ENLACE: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
};

export default function VistaPreviaCursoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curso, setCurso] = useState(null);
  const [moduloAbierto, setModuloAbierto] = useState(null);

  useEffect(() => {
    cursoService.obtenerPorId(id).then(c => {
      setCurso(c);
      if (c.modulos?.length > 0) setModuloAbierto(c.modulos[0].idModulo);
    });
  }, [id]);

  if (!curso) return <p style={{ padding: 40, color: '#6b7280' }}>Cargando...</p>;

  const totalLecciones = curso.modulos?.reduce((s, m) => s + (m.lecciones?.length || 0), 0) || 0;
  const totalModulos = curso.modulos?.length || 0;

  return (
    <div className="vista-previa">
      <div className="breadcrumb">
        <span className="breadcrumb__link" onClick={() => navigate('/admin/cursos')}>Cursos</span>
        <span> &gt; </span>
        <span className="breadcrumb__link" onClick={() => navigate(`/admin/cursos/${id}/detalle`)}>{curso.titulo}</span>
        <span> &gt; </span>
        <strong>Vista previa</strong>
      </div>

      <div className="vp-hero" style={{ borderLeft: `4px solid ${curso.color || '#59CBA5'}` }}>
        <div className="vp-hero__left">
          <span className={`estado-badge ${curso.estado ? 'estado-badge--activo' : 'estado-badge--borrador'}`}>
            {curso.estado ? 'Activo' : 'Borrador'}
          </span>
          <h1>{curso.titulo}</h1>
          <p>{curso.descripcion}</p>
          <div className="vp-hero__meta">
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              {totalModulos} módulos
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {totalLecciones} lecciones
            </span>
          </div>
        </div>
        <div className="vp-hero__cover" style={{ backgroundColor: `${curso.color || '#59CBA5'}22` }}>
          {curso.portada
            ? <img src={curso.portada} alt={curso.titulo} />
            : <svg viewBox="0 0 24 24" fill="none" stroke={curso.color || '#59CBA5'} strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          }
        </div>
      </div>

      <div className="vp-body">
        <aside className="vp-sidebar">
          <h3>Módulos</h3>
          {!curso.modulos?.length ? (
            <p className="vp-empty">Sin módulos.</p>
          ) : curso.modulos.map((m, idx) => (
            <button key={m.idModulo}
              className={`vp-modulo-btn ${moduloAbierto === m.idModulo ? 'vp-modulo-btn--active' : ''}`}
              onClick={() => setModuloAbierto(m.idModulo)}>
              <span className="vp-modulo-num">{idx + 1}</span>
              <span>{m.titulo}</span>
            </button>
          ))}
        </aside>

        <div className="vp-detalle">
          {curso.modulos?.map(m => m.idModulo === moduloAbierto && (
            <div key={m.idModulo}>
              <div className="vp-modulo-header">
                <h2>{m.titulo}</h2>
                {m.duracion && <span className="vp-duracion">{m.duracion}</span>}
              </div>

              {m.lecciones?.length > 0 && (
                <div className="vp-section">
                  <h4>Lecciones</h4>
                  {m.lecciones.map((l, lIdx) => (
                    <div key={l.idLeccion} className="vp-recurso-card">
                      <div className="vp-recurso-card__header">
                        <span className="vp-recurso-num">{lIdx + 1}</span>
                        <strong>{l.titulo || 'Sin título'}</strong>
                        <span className="vp-tag vp-tag--leccion">Lección</span>
                      </div>
                      {l.descripcion && <p className="vp-recurso-desc">{l.descripcion}</p>}
                      {l.bloques?.length > 0 && (
                        <div className="vp-bloques">
                          {l.bloques.map((b, bIdx) => (
                            <div key={bIdx} className="vp-bloque"
                              style={{ borderLeft: `3px solid ${COLORES_BLOQUE[b.tipo] || '#9ca3af'}` }}>
                              <span style={{ color: COLORES_BLOQUE[b.tipo], display: 'flex' }}>{ICONOS[b.tipo]}</span>
                              <div>
                                <span className="vp-bloque__tipo">{b.tipo}</span>
                                {b.contenido && <span className="vp-bloque__contenido"> — {b.contenido}</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {m.cuestionarios?.length > 0 && (
                <div className="vp-section">
                  <h4>Cuestionarios</h4>
                  {m.cuestionarios.map((q, qIdx) => (
                    <div key={q.idCuestionario} className="vp-recurso-card vp-recurso-card--quiz">
                      <div className="vp-recurso-card__header">
                        <span className="vp-recurso-num">{qIdx + 1}</span>
                        <strong>{q.titulo || 'Sin título'}</strong>
                        <span className="vp-tag vp-tag--quiz">Cuestionario</span>
                      </div>
                      {q.preguntas?.map((p, pIdx) => (
                        <div key={p.idPregunta || pIdx} className="vp-pregunta">
                          <p className="vp-pregunta__titulo">{pIdx + 1}. {p.titulo}</p>
                          <div className="vp-opciones">
                            {p.opciones?.map((o, oIdx) => (
                              <div key={oIdx} className={`vp-opcion ${o.esCorrecta ? 'vp-opcion--correcta' : ''}`}>
                                <div className={`vp-opcion-ind ${o.esCorrecta ? 'vp-opcion-ind--correcta' : ''}`}
                                  style={{ borderRadius: p.tipo === 'UNA_OPCION' ? '50%' : '3px' }} />
                                <span>{o.texto}</span>
                                {o.esCorrecta && <span className="vp-correcta-badge">Correcta</span>}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {(!m.lecciones?.length && !m.cuestionarios?.length) && (
                <p className="vp-empty">Sin recursos aún.</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn-volver" onClick={() => navigate(`/admin/cursos/${id}/detalle`)}>
          Volver al editor
        </button>
      </div>
    </div>
  );
}

