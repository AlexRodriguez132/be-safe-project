import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cursoService } from '../../services/cursoService';
import CourseCard from '../../components/courses/CourseCard';
import './AdminCursosPage.css';

const TABS = [
  { label: 'Todos', value: null },
  { label: 'Activos', value: true },
  { label: 'Borradores', value: false },
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
        <input
          className="search"
          placeholder="Buscar curso..."
          value={buscar}
          onChange={e => setBuscar(e.target.value)}
        />
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
