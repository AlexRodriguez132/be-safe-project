import { useEffect, useState } from 'react';
import { cursoService } from '../../services/cursoService';
import CourseCard from '../../components/courses/CourseCard';
import './HomePage.css';

const MOODS = [
  { emoji: '😣', label: 'Muy mal' },
  { emoji: '😕', label: 'Mal' },
  { emoji: '😐', label: 'Regular' },
  { emoji: '🙂', label: 'Bien' },
  { emoji: '😄', label: 'Muy bien' },
];

export default function HomePage() {
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
            >
              <span className="mood-emoji">{m.emoji}</span>
              <span className="mood-label">{m.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="popular-section">
        <h3>Popular</h3>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className="courses-grid">
            {cursos.map(c => (
              <CourseCard key={c.idCurso} curso={c} onVerCurso={(id) => alert(`Ver curso ${id}`)} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
