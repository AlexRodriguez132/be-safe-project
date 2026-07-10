import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cursoService, moduloService } from '../../services/cursoService';
import './NuevoCuestionarioPage.css';

const TIPO_OPCIONES = [
  { value: 'UNA_OPCION', label: 'Una opción' },
  { value: 'MAS_OPCIONES', label: 'Más opciones' },
];

function preguntaVacia(id) {
  return {
    _id: id,
    titulo: '',
    tipo: 'UNA_OPCION',
    opciones: [
      { _id: `${id}a`, texto: 'Opción 1', esCorrecta: false },
      { _id: `${id}b`, texto: 'Opción 2', esCorrecta: false },
    ],
  };
}

export default function NuevoCuestionarioPage() {
  const { id, idModulo, idCuestionario } = useParams();
  const navigate = useNavigate();
  const esEdicion = Boolean(idCuestionario);

  const [cursotitulo, setCursoTitulo] = useState('');
  const [modulotitulo, setModuloTitulo] = useState('');
  const [titulo, setTitulo] = useState('');
  const [preguntas, setPreguntas] = useState([preguntaVacia(Date.now())]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    cursoService.obtenerPorId(id).then(c => {
      setCursoTitulo(c.titulo);
      const m = c.modulos?.find(m => String(m.idModulo) === String(idModulo));
      setModuloTitulo(m?.titulo || '');
      if (esEdicion) {
        const q = m?.cuestionarios?.find(q => String(q.idCuestionario) === String(idCuestionario));
        if (q) {
          setTitulo(q.titulo);
          setPreguntas(q.preguntas.map(p => ({
            _id: p.idPregunta,
            idPregunta: p.idPregunta,
            titulo: p.titulo,
            tipo: p.tipo,
            opciones: p.opciones.map(o => ({
              _id: o.idOpcion,
              idOpcion: o.idOpcion,
              texto: o.texto,
              esCorrecta: o.esCorrecta || false,
            })),
          })));
        }
      }
    });
  }, [id, idModulo, idCuestionario]);

  const agregarPregunta = () => setPreguntas(p => [...p, preguntaVacia(Date.now())]);

  const actualizarPregunta = (idx, field, value) =>
    setPreguntas(p => p.map((pr, i) => i === idx ? { ...pr, [field]: value } : pr));

  const cambiarTipo = (idx, tipo) =>
    setPreguntas(p => p.map((pr, i) => i === idx
      ? { ...pr, tipo, opciones: pr.opciones.map(o => ({ ...o, esCorrecta: false })) }
      : pr));

  const agregarOpcion = (idx) => {
    const ts = Date.now();
    setPreguntas(p => p.map((pr, i) => i === idx
      ? { ...pr, opciones: [...pr.opciones, { _id: ts, texto: `Opción ${pr.opciones.length + 1}`, esCorrecta: false }] }
      : pr));
  };

  const actualizarOpcion = (pIdx, oIdx, valor) =>
    setPreguntas(p => p.map((pr, i) => i === pIdx
      ? { ...pr, opciones: pr.opciones.map((o, j) => j === oIdx ? { ...o, texto: valor } : o) }
      : pr));

  const toggleCorrecta = (pIdx, oIdx) =>
    setPreguntas(p => p.map((pr, i) => {
      if (i !== pIdx) return pr;
      if (pr.tipo === 'UNA_OPCION') {
        return { ...pr, opciones: pr.opciones.map((o, j) => ({ ...o, esCorrecta: j === oIdx })) };
      }
      return { ...pr, opciones: pr.opciones.map((o, j) => j === oIdx ? { ...o, esCorrecta: !o.esCorrecta } : o) };
    }));

  const eliminarPregunta = (idx) => setPreguntas(p => p.filter((_, i) => i !== idx));

  const eliminarOpcion = (pIdx, oIdx) =>
    setPreguntas(p => p.map((pr, i) => i === pIdx
      ? { ...pr, opciones: pr.opciones.filter((_, j) => j !== oIdx) }
      : pr));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo.trim()) { setError('El título del cuestionario es obligatorio.'); return; }
    setSaving(true);
    setError('');
    try {
      const data = {
        titulo,
        preguntas: preguntas.map(p => ({
          idPregunta: p.idPregunta,
          titulo: p.titulo,
          tipo: p.tipo,
          opciones: p.opciones.map(o => ({ idOpcion: o.idOpcion, texto: o.texto, esCorrecta: o.esCorrecta })),
        })),
      };
      if (esEdicion) {
        await moduloService.actualizarCuestionario(id, idModulo, idCuestionario, data);
      } else {
        await moduloService.crearCuestionario(id, idModulo, data);
      }
      navigate(`/admin/cursos/${id}/modulos/${idModulo}/editar`);
    } catch {
      setError('Error al guardar el cuestionario.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="nuevo-cuestionario">
      <div className="breadcrumb">
        <span className="breadcrumb__link" onClick={() => navigate('/admin/cursos')}>Cursos</span>
        <span> &gt; </span>
        <span className="breadcrumb__link" onClick={() => navigate(`/admin/cursos/${id}/detalle`)}>{cursotitulo}</span>
        <span> &gt; </span>
        <span className="breadcrumb__link" onClick={() => navigate(`/admin/cursos/${id}/modulos/${idModulo}/editar`)}>{modulotitulo}</span>
        <span> &gt; </span>
        <strong>{esEdicion ? 'Editar cuestionario' : 'Nuevo cuestionario'}</strong>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="cq-card">
          <div className="cq-card__header">
            <button type="button" className="back-btn" onClick={() => navigate(`/admin/cursos/${id}/modulos/${idModulo}/editar`)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div>
              <h1>{esEdicion ? 'Editar Cuestionario' : 'Nuevo Cuestionario'}</h1>
              <p>Crea preguntas con respuestas correctas para evaluar a tus estudiantes</p>
            </div>
          </div>
          {error && <p className="form-error">{error}</p>}
          <div className="form-group">
            <label>Título del cuestionario *</label>
            <input value={titulo} onChange={e => setTitulo(e.target.value)}
              placeholder="Escribe el nombre del cuestionario" />
          </div>
        </div>

        <div className="cq-content-card">
          <div className="cq-content-header">
            <h2>Preguntas</h2>
            <button type="button" className="btn-agregar-pregunta" onClick={agregarPregunta}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              Agregar pregunta
            </button>
          </div>

          <div className="preguntas-list">
            {preguntas.map((p, pIdx) => (
              <div key={p._id} className="pregunta-card">
                <div className="pregunta-card__top">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Pregunta {pIdx + 1} *</label>
                    <input value={p.titulo}
                      onChange={e => actualizarPregunta(pIdx, 'titulo', e.target.value)}
                      placeholder="Escribe la pregunta" />
                  </div>
                  <div className="form-group" style={{ minWidth: 165 }}>
                    <label>Tipo</label>
                    <select value={p.tipo} onChange={e => cambiarTipo(pIdx, e.target.value)}>
                      {TIPO_OPCIONES.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                  <button type="button" className="icon-btn icon-btn--danger" style={{ marginTop: 22 }}
                    onClick={() => eliminarPregunta(pIdx)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                  </button>
                </div>

                <div className="opciones-section">
                  <div className="opciones-header">
                    <span className="opciones-label">Opciones de respuesta</span>
                    <span className="correcta-hint">
                      {p.tipo === 'UNA_OPCION' ? 'Selecciona la respuesta correcta' : 'Selecciona las respuestas correctas'}
                    </span>
                  </div>
                  <div className="opciones-list">
                    {p.opciones.map((o, oIdx) => (
                      <div key={o._id} className={`opcion-item ${o.esCorrecta ? 'opcion-item--correcta' : ''}`}>
                        <div className={`tipo-indicator ${o.esCorrecta ? 'tipo-indicator--active' : ''}`}
                          style={{ borderRadius: p.tipo === 'UNA_OPCION' ? '50%' : '4px' }} />
                        <input className="opcion-input" value={o.texto}
                          onChange={e => actualizarOpcion(pIdx, oIdx, e.target.value)} />
                        <button type="button"
                          className={`btn-correcta ${o.esCorrecta ? 'btn-correcta--active' : ''}`}
                          onClick={() => toggleCorrecta(pIdx, oIdx)}
                          title={o.esCorrecta ? 'Quitar como correcta' : 'Marcar como correcta'}>
                          <svg viewBox="0 0 24 24" fill={o.esCorrecta ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </button>
                        {p.opciones.length > 2 && (
                          <button type="button" className="opcion-del" onClick={() => eliminarOpcion(pIdx, oIdx)}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button type="button" className="btn-add-opcion" onClick={() => agregarOpcion(pIdx)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Agregar opción
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cq-footer">
          <button type="submit" className="btn-save" disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
}
