import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cursoService } from '../../services/cursoService';
import { evaluacionService } from '../../services/evaluacionService';
import './CursoQuizPage.css';

export default function CursoQuizPage() {
  const { id, idCuestionario } = useParams();
  const navigate = useNavigate();
  const [cuestionario, setCuestionario] = useState(null);
  const [selecciones, setSelecciones] = useState({});
  const [resultado, setResultado] = useState(null);
  const [prevResultado, setPrevResultado] = useState(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    cursoService.obtenerPorId(id).then(curso => {
      for (const m of curso.modulos || []) {
        const q = m.cuestionarios?.find(c => String(c.idCuestionario) === String(idCuestionario));
        if (q) { setCuestionario(q); break; }
      }
    });
    evaluacionService.obtenerResultado(idCuestionario).then(r => {
      if (r) setPrevResultado(r);
    });
  }, [id, idCuestionario]);

  const toggleOpcion = (preguntaId, opcionId, esMultiple) => {
    setSelecciones(prev => {
      const actual = prev[preguntaId] || [];
      if (esMultiple) {
        return {
          ...prev,
          [preguntaId]: actual.includes(opcionId)
            ? actual.filter(o => o !== opcionId)
            : [...actual, opcionId],
        };
      }
      return { ...prev, [preguntaId]: [opcionId] };
    });
  };

  const enviar = async () => {
    setEnviando(true);
    const respuestas = (cuestionario.preguntas || []).map(p => ({
      preguntaId: p.idPregunta,
      opcionesSeleccionadas: selecciones[p.idPregunta] || [],
    }));
    const res = await evaluacionService.calificar(idCuestionario, respuestas).catch(() => null);
    setResultado(res);
    setEnviando(false);
  };

  if (!cuestionario) return (
    <div className="quiz-loading">
      <div className="quiz-loading__spinner" />
      Cargando evaluación...
    </div>
  );

  if (resultado) {
    const aprobado = resultado.aprobado;
    return (
      <div className="quiz-result">
        <div className={`quiz-result__card ${aprobado ? 'quiz-result__card--ok' : 'quiz-result__card--fail'}`}>
          <div className="quiz-result__icon">
            {aprobado
              ? <svg viewBox="0 0 24 24" fill="none" stroke="#1E7D62" strokeWidth="2" width="48" height="48"><circle cx="12" cy="12" r="10"/><polyline points="20 6 9 17 4 12"/></svg>
              : <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" width="48" height="48"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            }
          </div>
          <h2>{aprobado ? '¡Aprobado!' : 'No aprobado'}</h2>
          <div className="quiz-result__score">{resultado.calificacion}%</div>
          <p>{aprobado ? 'Superaste el mínimo de aprobación (70%).' : 'No alcanzaste el 70% requerido.'}</p>
          <p className="quiz-result__intentos">Intento #{resultado.intentos}</p>
          <div className="quiz-result__actions">
            <button className="quiz-btn quiz-btn--primary" onClick={() => navigate(`/cursos/${id}`)}>
              Volver al curso
            </button>
            {!aprobado && (
              <button className="quiz-btn quiz-btn--secondary" onClick={() => { setResultado(null); setSelecciones({}); }}>
                Intentar de nuevo
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <button className="quiz-back" onClick={() => navigate(`/cursos/${id}`)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="15 18 9 12 15 6"/></svg>
          Volver al curso
        </button>
        <div className="quiz-header__info">
          <h1>{cuestionario.titulo}</h1>
          <span>{cuestionario.preguntas?.length || 0} preguntas · Mín. aprobación: 70%</span>
        </div>
      </div>

      {prevResultado && !resultado && (
        <div className={`quiz-prev-result ${prevResultado.aprobado ? 'quiz-prev-result--ok' : 'quiz-prev-result--fail'}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          Último intento: {prevResultado.calificacion}% — {prevResultado.aprobado ? 'Aprobado' : 'No aprobado'} ({prevResultado.intentos} intento{prevResultado.intentos !== 1 ? 's' : ''})
        </div>
      )}

      <div className="quiz-preguntas">
        {cuestionario.preguntas?.map((p, pIdx) => {
          const esMultiple = p.tipo === 'MAS_OPCIONES';
          const selec = selecciones[p.idPregunta] || [];
          return (
            <div key={p.idPregunta} className="quiz-pregunta">
              <div className="quiz-pregunta__num">Pregunta {pIdx + 1}</div>
              <p className="quiz-pregunta__titulo">{p.titulo}</p>
              {esMultiple && <span className="quiz-pregunta__hint">Selecciona todas las que apliquen</span>}
              <div className="quiz-opciones">
                {p.opciones?.map(o => {
                  const sel = selec.includes(o.idOpcion);
                  return (
                    <button key={o.idOpcion}
                      className={`quiz-opcion ${sel ? 'quiz-opcion--sel' : ''}`}
                      onClick={() => toggleOpcion(p.idPregunta, o.idOpcion, esMultiple)}>
                      <span className={`quiz-opcion__mark ${esMultiple ? 'quiz-opcion__mark--check' : 'quiz-opcion__mark--radio'} ${sel ? 'quiz-opcion__mark--active' : ''}`}>
                        {sel && (esMultiple
                          ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="11" height="11"><polyline points="20 6 9 17 4 12"/></svg>
                          : <div className="quiz-radio-dot" />
                        )}
                      </span>
                      <span>{o.texto}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="quiz-footer">
        <button className="quiz-btn quiz-btn--primary" onClick={enviar}
          disabled={enviando || Object.keys(selecciones).length === 0}>
          {enviando ? 'Calificando...' : 'Enviar respuestas'}
        </button>
      </div>
    </div>
  );
}
