import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cursoService, categoriaService } from '../../services/cursoService';
import './NuevoCursoPage.css';

const COLORES = ['#59CBA5', '#fbbf24', '#93c5fd', '#f9a8d4'];

const CATEGORIAS_DEFAULT = [
  { idCategoria: 1, nombreCategoria: 'Psicología' },
  { idCategoria: 2, nombreCategoria: 'Finanzas' },
  { idCategoria: 3, nombreCategoria: 'Jurídico' },
  { idCategoria: 4, nombreCategoria: 'Defensa personal' },
];

const PORTADAS_ESTATICAS = [
  '/covers/cover-1.svg',
  '/covers/cover-2.svg',
  '/covers/cover-3.svg',
  '/covers/cover-4.svg',
  '/covers/cover-5.svg',
  '/covers/cover-6.svg',
];

const EMPTY_FORM = {
  titulo: '',
  descripcion: '',
  url: 'https://ejemplobesafe/cursos/',
  color: '#59CBA5',
  portada: '',
  estado: true,
  idInstructor: null,
  idsCategorias: [],
};

export default function NuevoCursoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);

  const [form, setForm] = useState(EMPTY_FORM);
  const [categorias, setCategorias] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    categoriaService.listarTodas()
      .then(data => setCategorias(data.length > 0 ? data : CATEGORIAS_DEFAULT))
      .catch(() => setCategorias(CATEGORIAS_DEFAULT));
    if (esEdicion) {
      cursoService.obtenerPorId(id).then(c => {
        setForm({
          titulo: c.titulo,
          descripcion: c.descripcion || '',
          url: c.url || '',
          color: c.color || '#59CBA5',
          portada: c.portada || '',
          estado: c.estado,
          idInstructor: c.instructorId || null,
          idsCategorias: c.categorias ? [...c.categorias].map(cat => cat.idCategoria) : [],
        });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const toggleCategoria = (idCat) => {
    setForm(f => ({
      ...f,
      idsCategorias: f.idsCategorias.includes(idCat)
        ? f.idsCategorias.filter(x => x !== idCat)
        : [...f.idsCategorias, idCat],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.titulo.trim()) { setError('El título es obligatorio.'); return; }
    setSaving(true);
    setError('');
    try {
      if (esEdicion) {
        await cursoService.actualizar(id, form);
      } else {
        await cursoService.crear(form);
      }
      navigate('/admin/cursos');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="nuevo-curso">
      <div className="nuevo-curso__card">
        <div className="nuevo-curso__top">
          <button className="back-btn" onClick={() => navigate(-1)}>←</button>
          <div>
            <h1>{esEdicion ? 'Editar curso' : 'Nuevo curso'}</h1>
            <p>Completa la información para {esEdicion ? 'actualizar' : 'crear'} el curso.</p>
          </div>
        </div>

        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit} className="curso-form">
          <div className="form-row">
            <div className="form-group">
              <label>Título del curso *</label>
              <input name="titulo" value={form.titulo} onChange={handleChange}
                placeholder="Escribe el título de tu curso" />
            </div>
            <div className="form-group">
              <label>Instructor</label>
              <select name="idInstructor" value={form.idInstructor || ''} onChange={handleChange}>
                <option value="">Selecciona el instructor</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Descripción *</label>
            <textarea name="descripcion" value={form.descripcion} onChange={handleChange}
              placeholder="Escribe una descripción breve de tu curso" rows={4} />
          </div>

          <div className="form-group">
            <label>Ruta URL</label>
            <input name="url" value={form.url} onChange={handleChange} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Color del curso</label>
              <div className="color-picker">
                {COLORES.map(c => (
                  <button type="button" key={c}
                    className={`color-swatch ${form.color === c ? 'color-swatch--active' : ''}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setForm(f => ({ ...f, color: c }))}
                  />
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Estado del curso</label>
              <div className="radio-group">
                <label>
                  <input type="radio" name="estado" checked={form.estado === true}
                    onChange={() => setForm(f => ({ ...f, estado: true }))} />
                  Activo
                </label>
                <label>
                  <input type="radio" name="estado" checked={form.estado === false}
                    onChange={() => setForm(f => ({ ...f, estado: false }))} />
                  Borrador
                </label>
              </div>
            </div>
          </div>

          <div className="form-row form-row--top">
            <div className="form-group">
              <label>Portada del curso</label>
              <div className="portada-picker">
                {PORTADAS_ESTATICAS.map(src => (
                  <button
                    key={src}
                    type="button"
                    className={`portada-option${form.portada === src ? ' portada-option--active' : ''}`}
                    onClick={() => setForm(f => ({ ...f, portada: src }))}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
              {form.portada && (
                <p className="portada-selected">Portada seleccionada</p>
              )}
            </div>

            <div className="form-group">
              <label>Categoría</label>
              <div className="categorias-list">
                {categorias.map(cat => (
                  <label key={cat.idCategoria} className="cat-check">
                    <input type="checkbox"
                      checked={form.idsCategorias.includes(cat.idCategoria)}
                      onChange={() => toggleCategoria(cat.idCategoria)} />
                    {cat.nombreCategoria}
                  </label>
                ))}
                {categorias.length === 0 && <span className="empty-cat">Sin categorías</span>}
              </div>
            </div>
          </div>

          <div className="form-footer">
            <button type="submit" className="btn-save" disabled={saving}>
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

