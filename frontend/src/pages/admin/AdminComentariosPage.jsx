import { useEffect, useState } from 'react';
import { comentarioService } from '../../services/comentarioService';
import './AdminComentariosPage.css';

const ESTADO_LABELS = { PENDIENTE: 'Pendiente', APROBADO: 'Aprobado', RECHAZADO: 'Rechazado' };
const ESTADO_COLORS = { PENDIENTE: '#f59e0b', APROBADO: '#59CBA5', RECHAZADO: '#ef4444' };

function Estrellas({ valor }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2 }}>
      {[1,2,3,4,5].map(n => (
        <svg key={n} viewBox="0 0 24 24" width="14" height="14"
          fill={n <= (valor || 0) ? '#f59e0b' : 'none'}
          stroke={n <= (valor || 0) ? '#f59e0b' : '#d1d5db'} strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </span>
  );
}

export default function AdminComentariosPage() {
  const [comentarios, setComentarios] = useState([]);
  const [filtro, setFiltro] = useState('PENDIENTE');
  const [cargando, setCargando] = useState(true);

  const cargar = () => {
    setCargando(true);
    comentarioService.listarTodos()
      .then(setComentarios)
      .catch(() => setComentarios([]))
      .finally(() => setCargando(false));
  };

  useEffect(cargar, []);

  const aprobar = async (id) => {
    await comentarioService.aprobar(id).catch(() => {});
    cargar();
  };

  const rechazar = async (id) => {
    await comentarioService.rechazar(id).catch(() => {});
    cargar();
  };

  const eliminar = async (id) => {
    await comentarioService.eliminar(id).catch(() => {});
    cargar();
  };

  const filtrados = filtro === 'TODOS' ? comentarios : comentarios.filter(c => c.estado === filtro);
  const pendientes = comentarios.filter(c => c.estado === 'PENDIENTE').length;

  return (
    <div className="ac-page">
      <div className="ac-header">
        <div>
          <h1>Moderación de reseñas</h1>
          {pendientes > 0 && <span className="ac-badge">{pendientes} pendiente{pendientes !== 1 ? 's' : ''}</span>}
        </div>
      </div>

      <div className="ac-filtros">
        {['PENDIENTE', 'APROBADO', 'RECHAZADO', 'TODOS'].map(f => (
          <button key={f} className={`ac-filtro-btn ${filtro === f ? 'ac-filtro-btn--active' : ''}`}
            onClick={() => setFiltro(f)}>
            {f === 'TODOS' ? 'Todos' : ESTADO_LABELS[f]}
            <span className="ac-filtro-count">
              {f === 'TODOS' ? comentarios.length : comentarios.filter(c => c.estado === f).length}
            </span>
          </button>
        ))}
      </div>

      {cargando ? (
        <div className="ac-loading">
          <div className="ac-spinner" /> Cargando...
        </div>
      ) : filtrados.length === 0 ? (
        <div className="ac-empty">Sin reseñas en esta categoría.</div>
      ) : (
        <div className="ac-tabla">
          {filtrados.map(c => (
            <div key={c.idComentario} className="ac-row">
              <div className="ac-row__left">
                <div className="ac-row__meta">
                  <span className="ac-row__user">Usuario {c.usuarioId}</span>
                  <span className="ac-row__curso">Curso #{c.cursoId}</span>
                  <Estrellas valor={c.calificacion} />
                  <span className="ac-estado-chip" style={{ background: ESTADO_COLORS[c.estado] + '22', color: ESTADO_COLORS[c.estado] }}>
                    {ESTADO_LABELS[c.estado] || c.estado}
                  </span>
                </div>
                <p className="ac-row__texto">{c.texto}</p>
                {c.fecha && (
                  <span className="ac-row__fecha">{new Date(c.fecha).toLocaleDateString('es-MX', { dateStyle: 'medium' })}</span>
                )}
              </div>
              <div className="ac-row__actions">
                {c.estado !== 'APROBADO' && (
                  <button className="ac-action-btn ac-action-btn--aprobar" onClick={() => aprobar(c.idComentario)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>
                    Aprobar
                  </button>
                )}
                {c.estado !== 'RECHAZADO' && (
                  <button className="ac-action-btn ac-action-btn--rechazar" onClick={() => rechazar(c.idComentario)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    Rechazar
                  </button>
                )}
                <button className="ac-action-btn ac-action-btn--eliminar" onClick={() => eliminar(c.idComentario)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
