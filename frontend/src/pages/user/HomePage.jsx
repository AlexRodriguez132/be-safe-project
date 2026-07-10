import { useEffect, useState } from 'react';
import { cursoService } from '../../services/cursoService';
import CourseCard from '../../components/courses/CourseCard';
import './HomePage.css';

const MoodIcon1 = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/><path d="M9 9.5c0-.5.5-1 1-1s1 .5 1 1"/><path d="M13 9.5c0-.5.5-1 1-1s1 .5 1 1"/></svg>;
const MoodIcon2 = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>;
const MoodIcon3 = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="15" x2="16" y2="15"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>;
const MoodIcon4 = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>;
const MoodIcon5 = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 3 4 3 4-3 4-3"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>;

const MOODS = [
  { Icon: MoodIcon1, label: 'Muy mal' },
  { Icon: MoodIcon2, label: 'Mal' },
  { Icon: MoodIcon3, label: 'Regular' },
  { Icon: MoodIcon4, label: 'Bien' },
  { Icon: MoodIcon5, label: 'Muy bien' },
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
              <span className="mood-icon"><m.Icon /></span>
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
