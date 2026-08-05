import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cursoService } from '../../services/cursoService';
import { favoritoService } from '../../services/favoritoService';
import { comentarioService } from '../../services/comentarioService';
import { progresoService } from '../../services/progresoService';
import './CursoDetallePage.css';

const PORTADA_COLORS = ['#DFEBFA', '#FDF4E8', '#FEEFF5', '#EEFAF6', '#F3E8FF'];
const PORTADA_ICON_COLORS = ['#ABC9E3', '#F4B84A', '#E8B4C9', '#59CBA5', '#C4B5FD'];

function EstrellasSVG({ valor, interactive = false, onChange }) {
  return (
    <span className="cd-estrellas">
      {[1, 2, 3, 4, 5].map(n => (
        <svg key={n} viewBox="0 0 24 24" width="18" height="18"
          fill={n <= valor ? '#f59e0b' : 'none'}
          stroke={n <= valor ? '#f59e0b' : '#d1d5db'}
          strokeWidth="1.5"
          style={{ cursor: interactive ? 'pointer' : 'default' }}
          onClick={() => interactive && onChange && onChange(n)}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </span>
  );
}

export default function CursoDetallePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curso, setCurso] = useState(null);
  const [moduloAbierto, setModuloAbierto] = useState(null);

  const [esFavorito, setEsFavorito] = useState(false);
  const [comentarios, setComentarios] = useState([]);
  const [resumen, setResumen] = useState({ promedio: 0, total: 0 });
  const [nuevoTexto, setNuevoTexto] = useState('');
  const [nuevaCalif, setNuevaCalif] = useState(0);
  const [enviando, setEnviando] = useState(false);
  const [msgEnviado, setMsgEnviado] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    cursoService.obtenerPorId(id).then(c => {
      setCurso(c);
      if (c.modulos?.length > 0) setModuloAbierto(c.modulos[0].idModulo);
    });
    favoritoService.esFavorito(id).then(setEsFavorito).catch(() => {});
    comentarioService.listarAprobados(id).then(setComentarios).catch(() => {});
    comentarioService.resumen(id).then(setResumen).catch(() => {});
  }, [id]);

  if (!curso) return (
    <div className="cd-loading">
      <div className="cd-loading__spinner" />
      Cargando curso...
    </div>
  );

  const totalLecciones = curso.modulos?.reduce((s, m) => s + (m.lecciones?.length || 0), 0) || 0;
  const totalModulos = curso.modulos?.length || 0;
  const totalCuestionarios = curso.modulos?.reduce((s, m) => s + (m.cuestionarios?.length || 0), 0) || 0;
  const idx = parseInt(id) % PORTADA_COLORS.length;
  const bg = PORTADA_COLORS[idx];
  const ic = PORTADA_ICON_COLORS[idx];

  const handleComenzar = () => { if (totalLecciones > 0) setModalVisible(true); };

  const elegirModalidad = async (modalidad) => {
    setModalVisible(false);
    await progresoService.iniciar(id, modalidad).catch(() => {});
    const primera = curso.modulos?.[0]?.lecciones?.[0];
    if (primera) navigate(`/cursos/${id}/lecciones/${primera.idLeccion}`);
  };

  const toggleFavorito = async () => {
    const nuevo = await favoritoService.toggle(id).catch(() => esFavorito);
    setEsFavorito(nuevo);
  };

  const enviarComentario = async () => {
    if (!nuevoTexto.trim() || nuevaCalif === 0) return;
    setEnviando(true);
    await comentarioService.crear(id, nuevoTexto.trim(), nuevaCalif).catch(() => {});
    setNuevoTexto('');
    setNuevaCalif(0);
    setEnviando(false);
    setMsgEnviado('Comentario enviado. Será visible tras aprobación.');
    setTimeout(() => setMsgEnviado(''), 4000);
  };

  return (
    <div className="cd-page">

      {/* ── HERO ── */}
      <div className="cd-hero">
        <div className="cd-hero__inner">
          <div className="cd-hero__left">
            <div className="cd-hero__tags">
              {curso.categorias?.slice(0, 2).map(cat => (
                <span key={cat.idCategoria} className="cd-tag">{cat.nombreCategoria}</span>
              ))}
              <span className={`cd-tag cd-tag--estado ${curso.estado ? 'cd-tag--activo' : 'cd-tag--borrador'}`}>
                {curso.estado ? 'Disponible' : 'Borrador'}
              </span>
            </div>

            <div className="cd-hero__title-row">
              <h1 className="cd-hero__title">{curso.titulo}</h1>
              <button className={`cd-fav-btn ${esFavorito ? 'cd-fav-btn--active' : ''}`}
                onClick={toggleFavorito}>
                <svg viewBox="0 0 24 24" width="22" height="22"
                  fill={esFavorito ? '#f59e0b' : 'none'}
                  stroke={esFavorito ? '#f59e0b' : 'rgba(255,255,255,0.7)'}
                  strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </button>
            </div>

            {resumen.total > 0 && (
              <div className="cd-hero__rating">
                <EstrellasSVG valor={Math.round(resumen.promedio)} />
                <span className="cd-rating-num">{resumen.promedio.toFixed(1)}</span>
                <span className="cd-rating-total">({resumen.total} reseña{resumen.total !== 1 ? 's' : ''})</span>
              </div>
            )}

            <p className="cd-hero__desc">{curso.descripcion}</p>

            <div className="cd-hero__stats">
              <div className="cd-stat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                <span><strong>{totalModulos}</strong> módulos</span>
              </div>
              <div className="cd-stat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span><strong>{totalLecciones}</strong> lecciones</span>
              </div>
              {totalCuestionarios > 0 && (
                <div className="cd-stat">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                  <span><strong>{totalCuestionarios}</strong> cuestionarios</span>
                </div>
              )}
            </div>

            {totalLecciones > 0 && (
              <button className="cd-btn-primary" onClick={handleComenzar}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Comenzar curso
              </button>
            )}
          </div>

          <div className="cd-hero__cover" style={{ background: bg }}>
            {curso.portada
              ? <img src={curso.portada} alt={curso.titulo} />
              : <svg viewBox="0 0 24 24" fill="none" stroke={ic} strokeWidth="0.8" width="80" height="80">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
            }
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="cd-body">
        <aside className="cd-sidebar">
          <div className="cd-sidebar__header">
            <h3>Contenido del curso</h3>
            <span className="cd-sidebar__meta">{totalModulos} módulos · {totalLecciones} lecciones</span>
          </div>

          {!curso.modulos?.length ? (
            <p className="cd-empty">Sin módulos disponibles.</p>
          ) : curso.modulos.map((m, mIdx) => {
            const isOpen = moduloAbierto === m.idModulo;
            const itemCount = (m.lecciones?.length || 0) + (m.cuestionarios?.length || 0);
            return (
              <div key={m.idModulo} className={`cd-modulo ${isOpen ? 'cd-modulo--open' : ''}`}>
                <button className="cd-modulo__btn" onClick={() => setModuloAbierto(p => p === m.idModulo ? null : m.idModulo)}>
                  <span className="cd-modulo__num">{mIdx + 1}</span>
                  <span className="cd-modulo__name">{m.titulo}</span>
                  <span className="cd-modulo__count">{itemCount}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13"
                    className={`cd-chevron ${isOpen ? 'cd-chevron--open' : ''}`}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {isOpen && (
                  <div className="cd-lecciones">
                    {m.lecciones?.map((l, lIdx) => (
                      <button key={l.idLeccion} className="cd-item-btn"
                        onClick={() => navigate(`/cursos/${id}/lecciones/${l.idLeccion}`)}>
                        <span className="cd-item-icon cd-item-icon--leccion">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg>
                        </span>
                        <span className="cd-item-title">{l.titulo || `Lección ${lIdx + 1}`}</span>
                        <span className="cd-item-num">{lIdx + 1}</span>
                      </button>
                    ))}
                    {m.cuestionarios?.map((q, qIdx) => (
                      <button key={q.idCuestionario} className="cd-item-btn cd-item-btn--quiz"
                        onClick={() => navigate(`/cursos/${id}/cuestionarios/${q.idCuestionario}`)}>
                        <span className="cd-item-icon cd-item-icon--quiz">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                        </span>
                        <span className="cd-item-title">{q.titulo || `Cuestionario ${qIdx + 1}`}</span>
                      </button>
                    ))}
                    {!m.lecciones?.length && !m.cuestionarios?.length && (
                      <p className="cd-empty" style={{ padding: '10px 16px', fontSize: '0.78rem' }}>Sin contenido aún.</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </aside>

        <div className="cd-main">
          {/* CTA card */}
          <div className="cd-cta-card">
            <div className="cd-cta-card__cover" style={{ background: bg }}>
              {curso.portada
                ? <img src={curso.portada} alt="" />
                : <svg viewBox="0 0 24 24" fill="none" stroke={ic} strokeWidth="0.8" width="48" height="48"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              }
            </div>
            <div className="cd-cta-card__body">
              <div className="cd-cta-stats">
                <div className="cd-cta-stat">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#59CBA5" strokeWidth="2" width="16" height="16"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                  <span>{totalModulos} módulos</span>
                </div>
                <div className="cd-cta-stat">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#59CBA5" strokeWidth="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>{totalLecciones} lecciones</span>
                </div>
                <div className="cd-cta-stat">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#59CBA5" strokeWidth="2" width="16" height="16"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span>Certificado al completar</span>
                </div>
                <div className="cd-cta-stat">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#59CBA5" strokeWidth="2" width="16" height="16"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
                  <span>Acceso completo</span>
                </div>
              </div>
              {totalLecciones > 0
                ? <button className="cd-btn-primary cd-btn-primary--full" onClick={handleComenzar}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    Comenzar ahora
                  </button>
                : <p style={{ color: '#9ca3af', fontSize: '0.875rem', textAlign: 'center' }}>Sin contenido aún.</p>
              }
            </div>
          </div>

          {/* Instructor */}
          <div className="cd-instructor-card">
            <div className="cd-instructor-card__avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="#59CBA5" strokeWidth="1.5" width="28" height="28">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div className="cd-instructor-card__info">
              <span className="cd-instructor-label">Instructor</span>
              <strong>{curso.instructorNombre || 'Por definir'}</strong>
            </div>
          </div>

          {/* Lo que aprenderás */}
          {totalLecciones > 0 && (
            <div className="cd-aprende-card">
              <h3>Lo que aprenderás</h3>
              <ul className="cd-aprende-list">
                {curso.modulos?.flatMap(m => m.lecciones || []).slice(0, 6).map(l => (
                  <li key={l.idLeccion}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#59CBA5" strokeWidth="2.5" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>
                    {l.titulo}
                  </li>
                ))}
                {totalLecciones > 6 && (
                  <li className="cd-aprende-more">+ {totalLecciones - 6} lecciones más</li>
                )}
              </ul>
            </div>
          )}

          {/* Comentarios */}
          <div className="cd-comentarios-card">
            <div className="cd-comentarios__header">
              <h3>Reseñas</h3>
              {resumen.total > 0 && (
                <div className="cd-rating-badge">
                  <EstrellasSVG valor={Math.round(resumen.promedio)} />
                  <span>{resumen.promedio.toFixed(1)} · {resumen.total} reseña{resumen.total !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>

            <div className="cd-comentario-form">
              <p className="cd-form-label">Tu calificación</p>
              <EstrellasSVG valor={nuevaCalif} interactive onChange={setNuevaCalif} />
              <textarea className="cd-comentario-textarea"
                placeholder="Escribe tu reseña..."
                value={nuevoTexto}
                onChange={e => setNuevoTexto(e.target.value)}
                rows={3}
              />
              {msgEnviado && <p className="cd-msg-enviado">{msgEnviado}</p>}
              <button className="cd-btn-primary" onClick={enviarComentario}
                disabled={enviando || !nuevoTexto.trim() || nuevaCalif === 0}
                style={{ opacity: (!nuevoTexto.trim() || nuevaCalif === 0) ? 0.5 : 1 }}>
                {enviando ? 'Enviando...' : 'Publicar reseña'}
              </button>
            </div>

            {comentarios.length === 0 ? (
              <p className="cd-empty" style={{ padding: '16px 0' }}>Sin reseñas aprobadas aún.</p>
            ) : (
              <div className="cd-comentarios-list">
                {comentarios.map(c => (
                  <div key={c.idComentario} className="cd-comentario">
                    <div className="cd-comentario__avatar">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#59CBA5" strokeWidth="1.5" width="20" height="20">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <div className="cd-comentario__body">
                      <div className="cd-comentario__meta">
                        <span className="cd-comentario__user">Usuario {c.usuarioId}</span>
                        <EstrellasSVG valor={c.calificacion || 0} />
                      </div>
                      <p>{c.texto}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── MODAL MODALIDAD ── */}
      {modalVisible && (
        <div className="cd-modal-overlay" onClick={() => setModalVisible(false)}>
          <div className="cd-modal" onClick={e => e.stopPropagation()}>
            <h2>Elige tu modalidad</h2>
            <p className="cd-modal-desc">Define cómo quieres tomar este curso.</p>
            <div className="cd-modal-opciones">
              <button className="cd-modal-opcion" onClick={() => elegirModalidad('LIBRE')}>
                <div className="cd-modal-opcion__icon" style={{ background: '#EEFAF6' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#59CBA5" strokeWidth="1.5" width="32" height="32">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <strong>Modo libre</strong>
                <span>Aprende a tu ritmo sin restricciones. Accede a todas las lecciones en cualquier orden.</span>
              </button>
              <button className="cd-modal-opcion" onClick={() => elegirModalidad('ACREDITACION')}>
                <div className="cd-modal-opcion__icon" style={{ background: '#f5f3ff' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" width="32" height="32">
                    <path d="M9 11l3 3L22 4"/>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                  </svg>
                </div>
                <strong>Modo acreditación</strong>
                <span>Avanza módulo a módulo. Debes aprobar cada evaluación para continuar.</span>
              </button>
            </div>
            <button className="cd-modal-cancel" onClick={() => setModalVisible(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
