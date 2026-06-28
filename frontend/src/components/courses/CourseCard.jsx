import { useState, useRef, useEffect } from 'react';
import './CourseCard.css';

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

export default function CourseCard({ curso, onVerCurso, adminMode = false, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const baseColor = curso.color || '#fbbf24';
  const coverBg = `rgba(${hexToRgb(baseColor)}, 0.18)`;
  const iconColor = `rgba(${hexToRgb(baseColor)}, 0.7)`;

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="course-card">
      <div className="course-card__cover" style={{ backgroundColor: coverBg }}>
        {curso.portada
          ? <img src={curso.portada} alt={curso.titulo} />
          : (
            <svg className="cover-placeholder" style={{ color: iconColor }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          )
        }
        {adminMode && (
          <span className={`badge ${curso.estado ? 'badge--activo' : 'badge--borrador'}`}>
            {curso.estado ? 'Activo' : 'Borrador'}
          </span>
        )}
      </div>

      <div className="course-card__body">
        <h3 className="course-card__title">{curso.titulo}</h3>
        <p className="course-card__desc">{curso.descripcion}</p>

        {!adminMode && curso.categorias?.size > 0 && (
          <p className="course-card__cat">
            {[...curso.categorias].map(c => c.nombreCategoria).join(', ')}
          </p>
        )}

        {adminMode && (
          <div className="course-card__modules">
            <span>{curso.totalModulos ?? 0} módulos</span>
            <span>{curso.totalLecciones ?? 0} lecciones</span>
          </div>
        )}

        {adminMode ? (
          <div className="course-card__footer">
            <div className="course-card__stats">
              <span className="stat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                4.7
              </span>
              <span className="stat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                423
              </span>
            </div>
            <div className="course-card__menu" ref={menuRef}>
              <button className="menu-btn" onClick={() => setMenuOpen(o => !o)}>
                <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
              </button>
              {menuOpen && (
                <div className="menu-dropdown">
                  <button onClick={() => { setMenuOpen(false); onEdit?.(); }}>Editar</button>
                  <button className="menu-dropdown__danger" onClick={() => { setMenuOpen(false); onDelete?.(); }}>Eliminar</button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="course-card__modules">
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              {curso.totalLecciones ?? 0} lecciones
            </span>
            <button className="btn-ver" onClick={() => onVerCurso?.(curso.idCurso)}>
              Ver curso
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
