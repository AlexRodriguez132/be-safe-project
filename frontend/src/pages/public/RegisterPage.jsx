import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPages.css';

const CIUDADES = ['Bogotá','Medellín','Cali','Barranquilla','Cartagena','Bucaramanga','Pereira','Manizales'];
const STEPS = 3;

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nombre: '', edad: '', ciudad: '',
    correo: '', password: '', confirmar: '',
    intereses: [],
  });

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const next = (e) => {
    e.preventDefault();
    if (step < STEPS) setStep(s => s + 1);
    else navigate('/inicio');
  };

  return (
    <div className="auth-page">
      <div className="auth-blobs">
        <div className="blob blob--blue" />
        <div className="blob blob--pink" />
        <div className="blob blob--peach" />
      </div>

      <div className="auth-logo" onClick={() => navigate('/')}>BE SAFE</div>

      <div className="auth-layout">
        <div className="auth-promo-col">
          <h2>Un espacio creado para <span className="highlight">acompañarte.</span></h2>
          <p>Accede a contenido confiable, recursos prácticos y experiencias de aprendizaje diseñadas para adaptarse a tus necesidades.</p>
          <div className="auth-illustration auth-illustration--big">
            <svg viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="90" cy="60" r="40" fill="#EEFAF6"/>
              <circle cx="90" cy="45" r="16" fill="#C8D9AB"/>
              <path d="M60 80 Q90 110 120 80" stroke="#59CBA5" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <ellipse cx="90" cy="140" rx="35" ry="45" fill="#DFEBFA"/>
              <circle cx="68" cy="100" r="10" fill="#EEFAF6"/>
              <circle cx="112" cy="100" r="10" fill="#EEFAF6"/>
              {[30,50,70,90,110,130,150].map((x,i) => (
                <circle key={i} cx={x} cy={185} r={4} fill="#59CBA5" opacity="0.4"/>
              ))}
            </svg>
          </div>
        </div>

        <div className="auth-form-col">
          <div className="auth-card">
            <h1>Crea tu cuenta</h1>
            <p className="auth-subtitle">Completa tus datos para comenzar</p>

            <div className="auth-steps">
              {[1,2,3].map(n => (
                <div key={n} className="auth-step-wrap">
                  <div className={`auth-step ${step === n ? 'auth-step--active' : step > n ? 'auth-step--done' : ''}`}>
                    {step > n
                      ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      : n}
                  </div>
                  {n < 3 && <div className={`auth-step-line ${step > n ? 'auth-step-line--done' : ''}`} />}
                </div>
              ))}
            </div>

            <form onSubmit={next} className="auth-form">
              {step === 1 && <>
                <div className="auth-field">
                  <label>Nombre completo<span className="required">*</span>:</label>
                  <div className="auth-input-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <input placeholder="Escribe tu nombre completo" value={form.nombre} onChange={e => set('nombre', e.target.value)} required />
                  </div>
                </div>
                <div className="auth-field">
                  <label>Edad<span className="required">*</span>:</label>
                  <div className="auth-input-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    <input type="number" placeholder="Ej. 25" min="10" max="100" value={form.edad} onChange={e => set('edad', e.target.value)} required />
                  </div>
                </div>
                <div className="auth-field">
                  <label>Ciudad:</label>
                  <div className="auth-input-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 1 8 8c0 5.5-8 13-8 13S4 15.5 4 10a8 8 0 0 1 8-8z"/></svg>
                    <select value={form.ciudad} onChange={e => set('ciudad', e.target.value)}>
                      <option value="">Selecciona tu ciudad</option>
                      {CIUDADES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </>}

              {step === 2 && <>
                <div className="auth-field">
                  <label>Correo electrónico<span className="required">*</span>:</label>
                  <div className="auth-input-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <input type="email" placeholder="Escribe tu correo" value={form.correo} onChange={e => set('correo', e.target.value)} required />
                  </div>
                </div>
                <div className="auth-field">
                  <label>Contraseña<span className="required">*</span>:</label>
                  <div className="auth-input-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <input type="password" placeholder="Mínimo 8 caracteres" value={form.password} onChange={e => set('password', e.target.value)} required minLength={8} />
                  </div>
                </div>
                <div className="auth-field">
                  <label>Confirmar contraseña<span className="required">*</span>:</label>
                  <div className="auth-input-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <input type="password" placeholder="Repite tu contraseña" value={form.confirmar} onChange={e => set('confirmar', e.target.value)} required />
                  </div>
                </div>
              </>}

              {step === 3 && <>
                <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: 16 }}>
                  ¡Ya casi! Cuéntanos qué temas te interesan para personalizar tu experiencia.
                </p>
                <div className="auth-intereses">
                  {['Violencia de género','Finanzas','Salud mental','Defensa personal','Autoestima','Relaciones sanas','Crianza','Emprendimiento'].map(t => (
                    <button
                      key={t}
                      type="button"
                      className={`interes-tag ${form.intereses.includes(t) ? 'interes-tag--active' : ''}`}
                      onClick={() => set('intereses', form.intereses.includes(t) ? form.intereses.filter(x => x !== t) : [...form.intereses, t])}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </>}

              <button type="submit" className="auth-btn">
                {step < STEPS ? 'Siguiente' : 'Crear cuenta'}
              </button>
            </form>

            {step === 1 && (
              <p className="auth-link">
                ¿Ya tienes cuenta?{' '}
                <span onClick={() => navigate('/login')}>Inicia sesión</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
