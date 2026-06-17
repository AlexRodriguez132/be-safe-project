import './CourseCard.css';

export default function CourseCard({ curso, onVerCurso, adminMode = false, onEdit, onDelete }) {
  const bgColor = curso.color || '#f5e6d8';

  return (
    <div className="course-card">
      <div className="course-card__cover" style={{ backgroundColor: bgColor }}>
        {curso.portada
          ? <img src={curso.portada} alt={curso.titulo} />
          : <span className="course-card__cover-icon">🖼</span>
        }
        {adminMode && (
          <span className={`course-card__badge course-card__badge--${curso.estado ? 'activo' : 'borrador'}`}>
            {curso.estado ? 'Activo' : 'Borrador'}
          </span>
        )}
      </div>

      <div className="course-card__body">
        <h3 className="course-card__title">{curso.titulo}</h3>
        <p className="course-card__desc">{curso.descripcion}</p>

        {!adminMode && curso.categorias?.length > 0 && (
          <p className="course-card__cat">
            {[...curso.categorias].map(c => c.nombreCategoria).join(', ')}
          </p>
        )}

        <div className="course-card__meta">
          <span>📖 {curso.totalLecciones ?? 0} lecciones</span>
          {adminMode && (
            <>
              <span>⭐ --</span>
              <span>👤 --</span>
            </>
          )}
        </div>

        {adminMode ? (
          <div className="course-card__actions">
            <button className="btn btn--outline" onClick={() => onEdit?.(curso)}>Editar</button>
            <button className="btn btn--danger" onClick={() => onDelete?.(curso.idCurso)}>Eliminar</button>
          </div>
        ) : (
          <button className="btn btn--primary" onClick={() => onVerCurso?.(curso.idCurso)}>
            Ver curso
          </button>
        )}
      </div>
    </div>
  );
}
