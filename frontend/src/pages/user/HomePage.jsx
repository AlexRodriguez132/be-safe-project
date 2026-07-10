import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cursoService } from '../../services/cursoService';
import './HomePage.css';

const MOODS = [
  { label: 'Muy mal',  color: '#E8B4C9', bg: '#FEEFF5' },
  { label: 'Mal',      color: '#F4B84A', bg: '#FEF3C7' },
  { label: 'Regular',  color: '#9ca3af', bg: '#f3f4f6' },
  { label: 'Bien',     color: '#ABC9E3', bg: '#DFEBFA' },
  { label: 'Muy bien', color: '#9FC9B3', bg: '#EEFAF6' },
];

const MoodFace = ({ color, active }) => (
  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
    <circle cx="18" cy="18" r="18" fill={active ? color : 'transparent'} opacity="0.9"/>
    <circle cx="18" cy="18" r="17" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="13" cy="15" r="1.8" fill={active ? '#fff' : color}/>
    <circle cx="23" cy="15" r="1.8" fill={active ? '#fff' : color}/>
    <path d="M12 22 Q18 27 24 22" stroke={active ? '#fff' : color} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
  </svg>
);

const PORTADA_COLORS = ['#DFEBFA','#FDF4E8','#FEEFF5','#EEFAF6'];
const PORTADA_ICON_COLORS = ['#ABC9E3','#F4D89F','#E8B4C9','#9FC9B3'];

export default function HomePage() {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [moodActivo, setMoodActivo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cursoService.listarPopulares()
      .then(setCursos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home">
      <div className="home__greeting">
        <p className="home__label">Inicio</p>
        <h2>Hola, Karina</h2>
      </div>

      <section className="mood-section">
        <h3>¿Cómo te sientes hoy?</h3>
        <div className="mood-list">
          {MOODS.map((m, i) => (
            <button
              key={i}
              className={`mood-btn ${moodActivo === i ? 'mood-btn--active' : ''}`}
              onClick={() => setMoodActivo(i)}
              style={moodActivo === i ? { background: m.bg } : {}}
            >
              <span className="mood-icon">
                <MoodFace color={m.color} active={moodActivo === i} />
              </span>
              <span className="mood-label" style={moodActivo === i ? { color: m.color, fontWeight: 600 } : {}}>
                {m.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="popular-section">
        <h3>Popular</h3>
        {loading ? (
          <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Cargando...</p>
        ) : cursos.length === 0 ? (
          <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Sin cursos disponibles.</p>
        ) : (
          <div className="courses-grid">
            {cursos.map((c, idx) => {
              const bg = PORTADA_COLORS[idx % PORTADA_COLORS.length];
              const ic = PORTADA_ICON_COLORS[idx % PORTADA_ICON_COLORS.length];
              const lecciones = c.modulos?.reduce((s, m) => s + (m.lecciones?.length || 0), 0) || 0;
              return (
                <div key={c.idCurso} className="home-course-card">
                  <div className="home-course-card__cover" style={{ background: bg }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke={ic} strokeWidth="1.2">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </div>
                  <div className="home-course-card__body">
                    <h4>{c.titulo}</h4>
                    <p>{c.descripcion}</p>
                    <span className="home-course-cat">{c.categorias?.[0]?.nombreCategoria || '—'}</span>
                    <div className="home-course-meta">
                      <span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                        {lecciones} lecciones
                      </span>
                      <span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        3.5 hrs
                      </span>
                    </div>
                    <button className="home-course-btn" onClick={() => navigate(`/admin/cursos/${c.idCurso}/detalle`)}>
                      Ver curso
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
