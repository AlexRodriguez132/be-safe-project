import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cursoService } from '../../services/cursoService';
import './MisCursosPage.css';

const PORTADA_COLORS = ['#DFEBFA','#FDF4E8','#FEEFF5','#EEFAF6','#F3E8FF'];
const PORTADA_ICON_COLORS = ['#ABC9E3','#F4D89F','#E8B4C9','#9FC9B3','#C4B5FD'];

function CursoProgressCard({ curso, progreso = 0, idx, onClick }) {
  const bg = PORTADA_COLORS[idx % PORTADA_COLORS.length];
  const ic = PORTADA_ICON_COLORS[idx % PORTADA_ICON_COLORS.length];
  const total = curso.modulos?.reduce((s, m) => s + (m.lecciones?.length || 0), 0) || 60;
  const vistas = Math.round(total * progreso / 100);

  return (
    <div className="mcp-card" style={{ cursor: 'pointer' }} onClick={onClick}>
      <div className="mcp-card__cover" style={{ background: bg }}>
        {curso.portada
          ? <img src={curso.portada} alt={curso.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <svg viewBox="0 0 24 24" fill="none" stroke={ic} strokeWidth="1.2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
        }
      </div>
      <div className="mcp-card__body">
        <h3>{curso.titulo}</h3>
        <p>{curso.descripcion}</p>
        <div className="mcp-progress-row">
          <span className="mcp-progress-count"><strong style={{ color: '#59CBA5' }}>{vistas}</strong> / {total}</span>
          <span className="mcp-progress-pct" style={{ color: '#59CBA5' }}>{progreso}%</span>
        </div>
        <div className="mcp-progress-bar-track">
          <div className="mcp-progress-bar-fill" style={{ width: `${progreso}%` }} />
        </div>
        <div className="mcp-instructor">
          <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>{curso.instructorNombre || 'Jose Rodolfo'}</span>
        </div>
        <button className="mcp-btn-continuar">
          {progreso > 0 ? 'Continuar' : 'Comenzar'}
        </button>
      </div>
    </div>
  );
}

export default function MisCursosPage() {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cursoService.listarPopulares()
      .then(setCursos)
      .finally(() => setLoading(false));
  }, []);

  const enProgreso = cursos.slice(0, 3);
  const todos = cursos;
  const progresos = [40, 70, 90, 20, 55, 80];

  if (loading) return <p style={{ padding: 40, color: '#6b7280' }}>Cargando...</p>;

  return (
    <div className="mis-cursos">
      {enProgreso.length > 0 && (
        <section className="mcp-section">
          <h2>Continua aprendiendo</h2>
          <div className="mcp-grid">
            {enProgreso.map((c, i) => (
              <CursoProgressCard key={c.idCurso} curso={c} progreso={progresos[i] || 40} idx={i} onClick={() => navigate(`/cursos/${c.idCurso}`)} />
            ))}
          </div>
        </section>
      )}

      <section className="mcp-section">
        <div className="mcp-section__header">
          <h2>Todos tus cursos</h2>
          <div className="mcp-filters">
            <button className="mcp-filter-btn mcp-filter-btn--active">Ver todo</button>
            <button className="mcp-filter-btn">Filtros</button>
          </div>
        </div>
        {todos.length === 0 ? (
          <p className="mcp-empty">Aún no estás inscrito en ningún curso.</p>
        ) : (
          <div className="mcp-grid">
            {todos.map((c, i) => (
              <CursoProgressCard key={c.idCurso} curso={c} progreso={progresos[i] || 40} idx={i} onClick={() => navigate(`/cursos/${c.idCurso}`)} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
