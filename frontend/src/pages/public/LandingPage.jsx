import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const IconHeart = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const IconShield = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IconLock = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const IconUsers = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;

const FEATURES = [
  { Icon: IconHeart, title: 'Hecho con propósito', desc: 'Creado para acompañarte con empatía y respeto', color: '#59CBA5' },
  { Icon: IconShield, title: 'Contenido confiable', desc: 'Material desarrollado por profesionales especializados', color: '#59CBA5' },
  { Icon: IconLock, title: 'Privacidad primero', desc: 'Tu información está protegida y nunca será compartida', color: '#59CBA5' },
  { Icon: IconUsers, title: 'Comunidad que escucha', desc: 'Un espacio seguro para compartir, aprender y crecer.', color: '#59CBA5' },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-logo">BE SAFE</div>
        <nav className="landing-nav">
          <a href="#inicio">Inicio</a>
          <a href="#recursos">Recursos</a>
          <a href="#precios">Precios</a>
        </nav>
        <div className="landing-header__actions">
          <button className="btn-link" onClick={() => navigate('/login')}>Iniciar sesión</button>
          <button className="btn-primary" onClick={() => navigate('/registro')}>Registrarse</button>
        </div>
      </header>

      <main>
        <section className="landing-hero">
          <div className="landing-hero__text">
            <h1>
              Tu espacio seguro para{' '}
              <span className="highlight">aprender,</span>{' '}
              <span className="highlight">sanar</span>{' '}
              y crecer.
            </h1>
            <p>
              Cursos y recursos diseñados para acompañarte en momentos difíciles.
              Aprende a tu ritmo, con herramientas prácticas y apoyo real.
            </p>
            <div className="landing-hero__btns">
              <button className="btn-primary btn-large" onClick={() => navigate('/registro')}>
                Comenzar gratis
              </button>
              <button className="btn-outline btn-large" onClick={() => navigate('/login')}>
                Iniciar sesión
              </button>
            </div>
          </div>

          <div className="landing-hero__mockup">
            <div className="mockup-card">
              <div className="mockup-sidebar">
                <div className="mockup-logo">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#59CBA5" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span>BE SAFE</span>
                </div>
                {['Inicio','Mis cursos','Grupos de apoyo','Clases en vivo','Asesorias','Calendario','Mensajes','Recursos','Configuración'].map(item => (
                  <div key={item} className="mockup-nav-item">{item}</div>
                ))}
              </div>
              <div className="mockup-content">
                <div className="mockup-greeting">Hola, Karina</div>
                <div className="mockup-mood-title">¿Cómo te sientes hoy?</div>
                <div className="mockup-moods">
                  {['#E8B4C9','#F4D89F','#C8D9AB','#ABC9E3','#9FC9B3'].map((c,i) => (
                    <div key={i} className="mockup-mood" style={{ background: c }} />
                  ))}
                </div>
                <div className="mockup-section-title">Continua aprendiendo</div>
                <div className="mockup-courses">
                  {[{c:'#DFEBFA',label:'Violencia de\ngénero'},{c:'#FDF4E8',label:'Finanzas\nbásicas'},{c:'#FEEFF5',label:'Defensa\npersonal'}].map((item,i) => (
                    <div key={i} className="mockup-course" style={{ background: item.c }}>
                      <div className="mockup-course-img" />
                      <div className="mockup-course-label">{item.label}</div>
                      <div className="mockup-progress"><div className="mockup-progress-bar" style={{ width: `${[60,25,33][i]}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-features">
          {FEATURES.map(({ Icon, title, desc, color }) => (
            <div key={title} className="feature-card">
              <div className="feature-icon" style={{ color }}>
                <Icon />
              </div>
              <h3 style={{ color }}>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
