import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPages.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ correo: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/inicio');
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
        <div className="auth-form-col">
          <div className="auth-card">
            <h1>Inicia sesión</h1>
            <p className="auth-subtitle">Completa tus datos para comenzar</p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-field">
                <label>Correo Electrónico<span className="required">*</span>:</label>
                <div className="auth-input-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input
                    type="email"
                    placeholder="Escribe tu correo electronico"
                    value={form.correo}
                    onChange={e => setForm({ ...form, correo: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="auth-field">
                <label>Contraseña<span className="required">*</span>:</label>
                <div className="auth-input-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <input
                    type="password"
                    placeholder="Escribe tu contraseña"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="auth-btn">Siguiente</button>
            </form>

            <p className="auth-link">
              ¿No tienes cuenta?{' '}
              <span onClick={() => navigate('/registro')}>Regístrate</span>
            </p>
          </div>
        </div>

        <div className="auth-promo-col">
          <h2>Aprende de personas <span className="highlight">comprometidas</span> con ayudarte</h2>
          <p>Nuestros instructores desarrollan contenido accesible y práctico para brindarte herramientas que puedas aplicar en tu vida diaria.</p>
          <div className="auth-illustration">
            <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="40" width="70" height="90" rx="8" fill="#EEFAF6"/>
              <circle cx="55" cy="30" r="18" fill="#C8D9AB"/>
              <rect x="30" y="60" width="50" height="6" rx="3" fill="#59CBA5" opacity="0.5"/>
              <rect x="30" y="72" width="38" height="6" rx="3" fill="#59CBA5" opacity="0.3"/>
              <rect x="110" y="50" width="70" height="80" rx="8" fill="#EEFAF6"/>
              <circle cx="145" cy="40" r="18" fill="#E8B4C9"/>
              <rect x="120" y="70" width="50" height="6" rx="3" fill="#E8B4C9" opacity="0.5"/>
              <rect x="120" y="82" width="38" height="6" rx="3" fill="#E8B4C9" opacity="0.3"/>
              <line x1="90" y1="90" x2="110" y2="90" stroke="#59CBA5" strokeWidth="2" strokeDasharray="4 2"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
