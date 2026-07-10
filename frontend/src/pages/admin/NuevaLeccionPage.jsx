import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cursoService, moduloService } from '../../services/cursoService';
import './NuevaLeccionPage.css';

const TIPOS_BLOQUE = [
  { tipo: 'VIDEO', label: 'Video', desc: 'Insertar un video', color: '#59CBA5' },
  { tipo: 'IMAGEN', label: 'Imagen', desc: 'Agrega imágenes', color: '#8b5cf6' },
  { tipo: 'ARCHIVO', label: 'Archivo', desc: 'Adjunta archivos', color: '#f59e0b' },
  { tipo: 'ENLACE', label: 'Enlace', desc: 'Adjunta algún enlace', color: '#ec4899' },
];

export default function NuevaLeccionPage() {
  const { id, idModulo, idLeccion } = useParams();
  const navigate = useNavigate();
  const esEdicion = Boolean(idLeccion);

  const [cursotitulo, setCursoTitulo] = useState('');
  const [modulotitulo, setModuloTitulo] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [bloques, setBloques] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const menuRef = useRef(null);

  useEffect(() => {
    cursoService.obtenerPorId(id).then(c => {
      setCursoTitulo(c.titulo);
      const m = c.modulos?.find(m => String(m.idModulo) === String(idModulo));
      setModuloTitulo(m?.titulo || '');
      if (esEdicion) {
        const l = m?.lecciones?.find(l => String(l.idLeccion) === String(idLeccion));
        if (l) {
          setTitulo(l.titulo);
          setDescripcion(l.descripcion || '');
          setBloques(l.bloques || []);
        }
      }
    });
  }, [id, idModulo, idLeccion]);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const agregarBloque = (tipo) => {
    setBloques(b => [...b, { idBloque: Date.now(), tipo, contenido: '', descripcion: '' }]);
    setShowMenu(false);
  };

  const actualizarBloque = (idBloque, field, value) => {
    setBloques(b => b.map(bl => bl.idBloque === idBloque ? { ...bl, [field]: value } : bl));
  };

  const eliminarBloque = (idBloque) => {
    setBloques(b => b.filter(bl => bl.idBloque !== idBloque));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo.trim()) { setError('El título es obligatorio.'); return; }
    setSaving(true);
    setError('');
    try {
      const data = { titulo, descripcion, bloques };
      if (esEdicion) {
        await moduloService.actualizarLeccion(id, idModulo, idLeccion, data);
      } else {
        await moduloService.crearLeccion(id, idModulo, data);
      }
      navigate(`/admin/cursos/${id}/modulos/${idModulo}/editar`);
    } catch {
      setError('Error al guardar.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="nueva-leccion">
      <div className="breadcrumb">
        <span className="breadcrumb__link" onClick={() => navigate('/admin/cursos')}>Cursos</span>
        <span> &gt; </span>
        <span className="breadcrumb__link" onClick={() => navigate(`/admin/cursos/${id}/detalle`)}>{cursotitulo}</span>
        <span> &gt; </span>
        <span className="breadcrumb__link" onClick={() => navigate(`/admin/cursos/${id}/modulos/${idModulo}/editar`)}>{modulotitulo}</span>
        <span> &gt; </span>
        <strong>{esEdicion ? 'Editar lección' : 'Nueva lección'}</strong>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="leccion-card">
          <div className="leccion-card__header">
            <button type="button" className="back-btn" onClick={() => navigate(`/admin/cursos/${id}/modulos/${idModulo}/editar`)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div>
              <h1>{esEdicion ? 'Editar lección' : 'Nueva lección'}</h1>
              <p>Crea contenido educativo completo y estructurado para tus estudiantes</p>
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="form-group">
            <label>Título de la lección *</label>
            <input value={titulo} onChange={e => setTitulo(e.target.value)}
              placeholder="Escribe el título de la lección" />
          </div>

          <div className="form-group">
            <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)}
              placeholder="Escribe una breve descripción" rows={4} />
          </div>
        </div>

        <div className="contenido-card">
          <div className="contenido-card__header">
            <div>
              <h2>Contenido de la lección</h2>
              <p>Organiza el contenido de tu curso en módulos y lecciones</p>
            </div>
            <div className="agregar-bloque-wrap" ref={menuRef}>
              <button type="button" className="btn-crear" onClick={() => setShowMenu(s => !s)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                Agregar bloque
              </button>
              {showMenu && (
                <div className="bloque-menu">
                  {TIPOS_BLOQUE.map(t => (
                    <button key={t.tipo} type="button" className="bloque-menu__item"
                      onClick={() => agregarBloque(t.tipo)}>
                      <span className="bloque-menu__dot" style={{ background: t.color }} />
                      <div>
                        <strong>{t.label}</strong>
                        <span>{t.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {bloques.length === 0 ? (
            <div className="contenido-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="#59CBA5" strokeWidth="1.5" className="empty-icon">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 3H8L2 7h20L16 3z"/>
                <line x1="12" y1="11" x2="12" y2="17"/>
              </svg>
              <p>Aún no hay contenido</p>
              <span>Agrega algún bloque</span>
            </div>
          ) : (
            <div className="bloques-list">
              {bloques.map(b => {
                const def = TIPOS_BLOQUE.find(t => t.tipo === b.tipo);
                return (
                  <div key={b.idBloque} className="bloque-item">
                    <span className="bloque-item__dot" style={{ background: def?.color || '#9ca3af' }} />
                    <div className="bloque-item__body">
                      <strong>{def?.label}</strong>
                      <input
                        placeholder={def?.tipo === 'VIDEO' ? 'URL del video' : def?.tipo === 'ENLACE' ? 'URL' : 'Nombre del archivo'}
                        value={b.contenido}
                        onChange={e => actualizarBloque(b.idBloque, 'contenido', e.target.value)}
                      />
                    </div>
                    <button type="button" className="icon-btn icon-btn--danger"
                      onClick={() => eliminarBloque(b.idBloque)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="leccion-footer">
          <button type="submit" className="btn-save" disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
}

