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
      <div className="container">
          <div className="navbar">
              <div className="navbarLogo">BE SAFE</div>
              <div className="navigation">
                  <a>Inicio</a>
                  <a>Recursos</a>
                  <a>Precios</a>
              </div>
              <div className="buttons">
                  <button className="btn-login">Iniciar Sesión</button>
                  <button className="btn-register">Registrarse</button>
              </div>
          </div>
          <div className="container-one">
              <div className="left">
                  <h1 className="title">Tu espacio seguro para <strong className="green">aprender, sanar</strong> y <strong>crecer.</strong></h1>
                  <p className="text">Cursos y recursos diseñados para acompañarte en momentos dificiles. Aprende a tu ritmo, con herramientas prácticas y apoyo real.</p>
                  <div className="buttons-2">
                      <button className="btn-start-free">Comenzar gratis</button>
                      <button className="btn-login2">Iniciar sesión</button>
                  </div>
              </div>
              <div className="right">
                  <img className="image" src="src/pages/auth/img/ImagenLandingPage.png" alt="Pagina BeSafe" />
              </div>
          </div>
      </div>
  );
}
