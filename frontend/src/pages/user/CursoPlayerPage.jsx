import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cursoService } from '../../services/cursoService';
import './CursoPlayerPage.css';

const BLOQUE_COLORS = {
  VIDEO: '#59CBA5',
  IMAGEN: '#8b5cf6',
  ARCHIVO: '#f59e0b',
  ENLACE: '#ec4899',
  TEXTO: '#374151',
};

function toEmbedUrl(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com') && u.searchParams.get('v')) {
      return `https://www.youtube.com/embed/${u.searchParams.get('v')}`;
    }
    if (u.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed${u.pathname}`;
    }
    return url;
  } catch {
    return url;
  }
}

const BloqueIcon = ({ tipo }) => {
  if (tipo === 'VIDEO') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg>;
  if (tipo === 'IMAGEN') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
  if (tipo === 'ARCHIVO') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
  if (tipo === 'ENLACE') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>;
};

const OFFLINE_KEY = 'be_safe_offline_archivos';

function getOfflineSet() {
  try { return new Set(JSON.parse(localStorage.getItem(OFFLINE_KEY) || '[]')); }
  catch { return new Set(); }
}

function guardarOffline(contenido) {
  const set = getOfflineSet();
  set.add(contenido);
  localStorage.setItem(OFFLINE_KEY, JSON.stringify([...set]));
}

function ArchivoBloque({ contenido }) {
  const [guardado, setGuardado] = useState(() => getOfflineSet().has(contenido));

  const handleGuardar = () => {
    guardarOffline(contenido);
    setGuardado(true);
  };

  const isUrl = contenido.startsWith('http');
  const isBase64 = contenido.startsWith('data:');
  const canDownload = isUrl || isBase64;

  const nombreArchivo = isUrl
    ? contenido.split('/').pop()
    : isBase64
      ? (contenido.split(';')[0].split('/')[1] ? `archivo.${contenido.split(';')[0].split('/')[1]}` : 'archivo')
      : 'archivo';

  return (
    <div className="cp-archivo">
      <div className="cp-archivo__info">
        <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" width="32" height="32">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
        <span className="cp-archivo__nombre">{nombreArchivo}</span>
      </div>
      <div className="cp-archivo__actions">
        {canDownload && (
          <a href={contenido} download={nombreArchivo} className="cp-archivo-btn cp-archivo-btn--download">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Descargar
          </a>
        )}
        {guardado ? (
          <span className="cp-archivo-guardado">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Guardado sin conexión
          </span>
        ) : (
          <button className="cp-archivo-btn cp-archivo-btn--offline" onClick={handleGuardar}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12 19.79 19.79 0 0 1 1.94 3.38C1.9 2.18 2.78 1.07 4 1.05h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Ver sin conexión
          </button>
        )}
      </div>
    </div>
  );
}

export default function CursoPlayerPage() {
  const { id, idLeccion } = useParams();
  const navigate = useNavigate();
  const [curso, setCurso] = useState(null);
  const [leccionActual, setLeccionActual] = useState(null);
  const [moduloActual, setModuloActual] = useState(null);
  const [completadas, setCompletadas] = useState(() => {
    try { return JSON.parse(localStorage.getItem(`curso_${id}_completadas`) || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    cursoService.obtenerPorId(id).then(c => {
      setCurso(c);
      for (const m of c.modulos || []) {
        const l = m.lecciones?.find(l => String(l.idLeccion) === String(idLeccion));
        if (l) { setLeccionActual(l); setModuloActual(m); break; }
      }
    });
  }, [id, idLeccion]);

  const marcarCompletada = () => {
    const nuevas = completadas.includes(Number(idLeccion))
      ? completadas
      : [...completadas, Number(idLeccion)];
    setCompletadas(nuevas);
    localStorage.setItem(`curso_${id}_completadas`, JSON.stringify(nuevas));
  };

  const todasLecciones = curso?.modulos?.flatMap(m =>
    m.lecciones?.map(l => ({ ...l, moduloTitulo: m.titulo, idModulo: m.idModulo })) || []
  ) || [];

  const idxActual = todasLecciones.findIndex(l => String(l.idLeccion) === String(idLeccion));
  const anterior = idxActual > 0 ? todasLecciones[idxActual - 1] : null;
  const siguiente = idxActual < todasLecciones.length - 1 ? todasLecciones[idxActual + 1] : null;

  const totalLecciones = todasLecciones.length;
  const progreso = totalLecciones > 0 ? Math.round((completadas.length / totalLecciones) * 100) : 0;

  if (!curso || !leccionActual) return <div className="cp-loading">Cargando...</div>;

  return (
    <div className="cp-layout">
      {/* Sidebar */}
      <aside className="cp-sidebar">
        <div className="cp-sidebar__top">
          <button className="cp-back-btn" onClick={() => navigate(`/cursos/${id}`)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="15 18 9 12 15 6"/></svg>
            Volver al curso
          </button>
          <div className="cp-progress">
            <div className="cp-progress__bar">
              <div className="cp-progress__fill" style={{ width: `${progreso}%` }} />
            </div>
            <span>{progreso}% completado</span>
          </div>
        </div>

        <div className="cp-sidebar__nav">
          {curso.modulos?.map((m, mIdx) => (
            <div key={m.idModulo} className="cp-modulo">
              <div className="cp-modulo__header">
                <span className="cp-modulo__num">{mIdx + 1}</span>
                <span className="cp-modulo__titulo">{m.titulo}</span>
              </div>
              {m.lecciones?.map((l, lIdx) => {
                const activa = String(l.idLeccion) === String(idLeccion);
                const done = completadas.includes(l.idLeccion);
                return (
                  <button key={l.idLeccion}
                    className={`cp-leccion-btn ${activa ? 'cp-leccion-btn--active' : ''}`}
                    onClick={() => navigate(`/cursos/${id}/lecciones/${l.idLeccion}`)}>
                    <span className={`cp-check ${done ? 'cp-check--done' : ''}`}>
                      {done
                        ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="11" height="11"><polyline points="20 6 9 17 4 12"/></svg>
                        : <span>{lIdx + 1}</span>
                      }
                    </span>
                    <span>{l.titulo || `Lección ${lIdx + 1}`}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </aside>

      {/* Contenido */}
      <div className="cp-content">
        <div className="cp-content__header">
          <div>
            <p className="cp-modulo-label">{moduloActual?.titulo}</p>
            <h1>{leccionActual.titulo || 'Lección'}</h1>
          </div>
          <button
            className={`cp-btn-completar ${completadas.includes(Number(idLeccion)) ? 'cp-btn-completar--done' : ''}`}
            onClick={marcarCompletada}>
            {completadas.includes(Number(idLeccion))
              ? <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16"><polyline points="20 6 9 17 4 12"/></svg> Completada</>
              : 'Marcar como completada'
            }
          </button>
        </div>

        {leccionActual.descripcion && (
          <p className="cp-desc">{leccionActual.descripcion}</p>
        )}

        {/* Bloques */}
        <div className="cp-bloques">
          {!leccionActual.bloques?.length ? (
            <div className="cp-sin-contenido">
              <svg viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" width="48" height="48"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              <p>Esta lección aún no tiene contenido.</p>
            </div>
          ) : leccionActual.bloques.map((b, bIdx) => (
            <div key={bIdx} className="cp-bloque" style={{ borderLeft: `3px solid ${BLOQUE_COLORS[b.tipo] || '#e5e7eb'}` }}>
              <div className="cp-bloque__tipo" style={{ color: BLOQUE_COLORS[b.tipo] }}>
                <BloqueIcon tipo={b.tipo} />
                <span>{b.tipo}</span>
              </div>
              {b.tipo === 'VIDEO' && b.contenido && (
                <div className="cp-video-wrap">
                  <iframe src={toEmbedUrl(b.contenido)} title="video" allowFullScreen frameBorder="0" />
                </div>
              )}
              {b.tipo === 'ENLACE' && b.contenido && (
                <a href={b.contenido} target="_blank" rel="noopener noreferrer" className="cp-enlace">
                  {b.contenido}
                </a>
              )}
              {b.tipo === 'TEXTO' && b.contenido && (
                <p className="cp-texto">{b.contenido}</p>
              )}
              {b.tipo === 'IMAGEN' && b.contenido && (
                <img src={b.contenido} alt="" style={{ maxWidth: '100%', borderRadius: 8 }} />
              )}
              {b.tipo === 'ARCHIVO' && b.contenido && (
                <ArchivoBloque contenido={b.contenido} />
              )}
            </div>
          ))}
        </div>

        {/* Navegación anterior/siguiente */}
        <div className="cp-nav-lecciones">
          {anterior ? (
            <button className="cp-nav-btn cp-nav-btn--prev"
              onClick={() => navigate(`/cursos/${id}/lecciones/${anterior.idLeccion}`)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="15 18 9 12 15 6"/></svg>
              <div>
                <span>Anterior</span>
                <strong>{anterior.titulo || 'Lección anterior'}</strong>
              </div>
            </button>
          ) : <div />}

          {siguiente ? (
            <button className="cp-nav-btn cp-nav-btn--next"
              onClick={() => { marcarCompletada(); navigate(`/cursos/${id}/lecciones/${siguiente.idLeccion}`); }}>
              <div>
                <span>Siguiente</span>
                <strong>{siguiente.titulo || 'Lección siguiente'}</strong>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          ) : (
            <button className="cp-nav-btn cp-nav-btn--next cp-nav-btn--finish"
              onClick={() => { marcarCompletada(); navigate(`/cursos/${id}`); }}>
              <div>
                <span>Has terminado</span>
                <strong>Volver al curso</strong>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="20 6 9 17 4 12"/></svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
