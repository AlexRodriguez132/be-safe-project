import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { favoritoService } from '../../services/favoritoService';
import './MisFavoritosPage.css';

const PORTADA_COLORS = ['#DFEBFA', '#FDF4E8', '#FEEFF5', '#EEFAF6', '#F3E8FF'];
const PORTADA_ICON_COLORS = ['#ABC9E3', '#F4B84A', '#E8B4C9', '#59CBA5', '#C4B5FD'];

export default function MisFavoritosPage() {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    favoritoService.listar()
      .then(setCursos)
      .catch(() => setCursos([]))
      .finally(() => setCargando(false));
  }, []);

  const quitarFavorito = async (cursoId) => {
    await favoritoService.toggle(cursoId).catch(() => {});
    setCursos(prev => prev.filter(c => c.idCurso !== cursoId));
  };

  if (cargando) return (
    <div className="fav-loading">
      <div className="fav-spinner" />
      Cargando favoritos...
    </div>
  );

  return (
    <div className="fav-page">
      <div className="fav-header">
        <h1>Mis favoritos</h1>
        <span>{cursos.length} curso{cursos.length !== 1 ? 's' : ''}</span>
      </div>

      {cursos.length === 0 ? (
        <div className="fav-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" width="56" height="56">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <p>Aún no tienes cursos favoritos.</p>
          <button className="fav-btn-primary" onClick={() => navigate('/inicio')}>Explorar cursos</button>
        </div>
      ) : (
        <div className="fav-grid">
          {cursos.map(c => {
            const idx = (c.idCurso || 0) % PORTADA_COLORS.length;
            const bg = PORTADA_COLORS[idx];
            const ic = PORTADA_ICON_COLORS[idx];
            const totalLecciones = c.modulos?.reduce((s, m) => s + (m.lecciones?.length || 0), 0) || 0;
            return (
              <div key={c.idCurso} className="fav-card" onClick={() => navigate(`/cursos/${c.idCurso}`)}>
                <div className="fav-card__cover" style={{ background: bg }}>
                  {c.portada
                    ? <img src={c.portada} alt={c.titulo} />
                    : <svg viewBox="0 0 24 24" fill="none" stroke={ic} strokeWidth="0.8" width="44" height="44">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                  }
                  <button className="fav-card__remove" title="Quitar de favoritos"
                    onClick={e => { e.stopPropagation(); quitarFavorito(c.idCurso); }}>
                    <svg viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1.5" width="18" height="18">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </button>
                </div>
                <div className="fav-card__body">
                  <div className="fav-card__tags">
                    {c.categorias?.slice(0, 1).map(cat => (
                      <span key={cat.idCategoria} className="fav-tag">{cat.nombreCategoria}</span>
                    ))}
                  </div>
                  <h3>{c.titulo}</h3>
                  <p>{c.descripcion}</p>
                  <div className="fav-card__meta">
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {totalLecciones} lecciones
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                      {c.modulos?.length || 0} módulos
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
