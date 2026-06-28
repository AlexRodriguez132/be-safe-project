import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cursoService } from '../../services/cursoService';
import CourseCard from '../../components/courses/CourseCard';
import './AdminCursosPage.css';

const TABS = [
  { label: 'Todos', value: null },
  { label: 'Activos', value: true },
  { label: 'Borradores', value: false },
  { label: 'Archivados', value: 'archivados' },
];

export default function AdminCursosPage() {
  const [cursos, setCursos] = useState([]);
  const [tab, setTab] = useState(null);
  const [buscar, setBuscar] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cargar = async () => {
    setLoading(true);
    try {
      const params = {};
      if (tab !== null) params.estado = tab;
      if (buscar.trim()) params.buscar = buscar.trim();
      setCursos(await cursoService.listarTodos(params));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargar(); }, [tab, buscar]);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este curso?')) return;
    await cursoService.eliminar(id);
    cargar();
  };

  return (
    <div className="admin-cursos">
      <header className="admin-cursos__header">
        <h1>Cursos</h1>
        <button className="btn btn--primary btn--new" onClick={() => navigate('/admin/cursos/nuevo')}>
          + Nuevo curso
        </button>
      </header>

      <div className="admin-cursos__toolbar">
        <div className="toolbar-top">
          <div className="tabs">
            {TABS.map(t => (
              <button
                key={String(t.value)}
                className={`tab ${tab === t.value ? 'tab--active' : ''}`}
                onClick={() => setTab(t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="toolbar-right">
            <div className="search-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                className="search"
                placeholder="Buscar curso..."
                value={buscar}
                onChange={e => setBuscar(e.target.value)}
              />
            </div>
            <button className="filtros-btn">
              Filtros
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="loading">Cargando...</p>
      ) : cursos.length === 0 ? (
        <p className="empty">No hay cursos.</p>
      ) : (
        <div className="courses-grid">
          {cursos.map(c => (
            <CourseCard
              key={c.idCurso}
              curso={c}
              adminMode
              onEdit={() => navigate(`/admin/cursos/${c.idCurso}/detalle`)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
