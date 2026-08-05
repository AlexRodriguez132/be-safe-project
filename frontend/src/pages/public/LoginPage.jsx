import { Link, useNavigate } from 'react-router-dom';
import '/src/pages/public/AuthPages.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState } from 'react';

export default function LoginPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ correo: '', password: '' });
    const [mostrarPassword, setMostrarPassword] = useState(false);

    const handleNavegarLandingPage = () => {
        navigate("/");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/inicio');
    };

    return (
        <div className='container-login'>
            <div className='left-login'>
                <button className="navbarLogo" onClick={handleNavegarLandingPage}>BE SAFE</button>
                <div className="login-card">
                    <h1 className="login-text">Inicia sesión</h1>
                    <p className="text-indications">Completa tus datos para comenzar</p>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor='mail-input'>Correo electrónico<span className="asterisco">*</span>:
                            <div className='data'>
                                <div className="icon-input">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="22" viewBox="0 0 16 22" fill="none">
                                        <path d="M1 21V18.7778C1 17.599 1.48864 16.4686 2.35841 15.6351C3.22819 14.8016 4.40787 14.3333 5.63792 14.3333H10.2758C11.5059 14.3333 12.6856 14.8016 13.5553 15.6351C14.4251 16.4686 14.9138 17.599 14.9138 18.7778V21M3.31896 5.44444C3.31896 6.62318 3.8076 7.75365 4.67737 8.58714C5.54715 9.42064 6.72683 9.88889 7.95688 9.88889C9.18693 9.88889 10.3666 9.42064 11.2364 8.58714C12.1062 7.75365 12.5948 6.62318 12.5948 5.44444C12.5948 4.2657 12.1062 3.13524 11.2364 2.30175C10.3666 1.46825 9.18693 1 7.95688 1C6.72683 1 5.54715 1.46825 4.67737 2.30175C3.8076 3.13524 3.31896 4.2657 3.31896 5.44444Z" stroke="#858585" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <input
                                    id="mail-input"
                                    type="email"
                                    className='inputs-auth'
                                    placeholder='Escribe el correo electrónico'
                                    value={form.correo}
                                    onChange={e => setForm({ ...form, correo: e.target.value })}
                                    required
                                />
                            </div>
                        </label>
                        <br />
                        <label htmlFor='password-input'>Contraseña<span className="asterisco">*</span>:
                            <div className='data'>
                                <div className="icon-input">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" viewBox="0 0 20 25" fill="none">
                                        <path d="M4.85714 11.2222V6.11111C4.85714 4.75556 5.39898 3.45553 6.36345 2.49701C7.32792 1.53849 8.63603 1 10 1C11.364 1 12.6721 1.53849 13.6365 2.49701C14.601 3.45553 15.1429 4.75556 15.1429 6.11111V11.2222M1 13.7778C1 13.1 1.27092 12.45 1.75315 11.9707C2.23539 11.4915 2.88944 11.2222 3.57143 11.2222H16.4286C17.1106 11.2222 17.7646 11.4915 18.2468 11.9707C18.7291 12.45 19 13.1 19 13.7778V21.4444C19 22.1222 18.7291 22.7722 18.2468 23.2515C17.7646 23.7308 17.1106 24 16.4286 24H3.57143C2.88944 24 2.23539 23.7308 1.75315 23.2515C1.27092 22.7722 1 22.1222 1 21.4444V13.7778ZM8.71429 17.6111C8.71429 17.95 8.84974 18.275 9.09086 18.5146C9.33198 18.7543 9.65901 18.8889 10 18.8889C10.341 18.8889 10.668 18.7543 10.9091 18.5146C11.1503 18.275 11.2857 17.95 11.2857 17.6111C11.2857 17.2722 11.1503 16.9472 10.9091 16.7076C10.668 16.468 10.341 16.3333 10 16.3333C9.65901 16.3333 9.33198 16.468 9.09086 16.7076C8.84974 16.9472 8.71429 17.2722 8.71429 17.6111Z" stroke="#858585" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <input
                                    id="password-input"
                                    className='inputs-auth'
                                    placeholder='Escribe tu contraseña'
                                    type={mostrarPassword ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={e => setForm({ ...form, password: e.target.value })}
                                    required
                                />
                                <div
                                    className="icon-eye"
                                    onClick={() => setMostrarPassword(!mostrarPassword)}
                                    style={{ cursor: 'pointer', paddingRight: '12px' }}
                                >
                                    {!mostrarPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M21 9C18.6 11.667 15.6 13 12 13C8.4 13 5.4 11.667 3 9M3 15L5.5 11.2M21.0001 14.976L18.5081 11.2M9 17L9.5 13M15 17L14.5 13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M21 12C18.6 16 15.6 18 12 18C8.4 18 5.4 16 3 12C5.4 8 8.4 6 12 6C15.6 6 18.6 8 21 12Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </label>

                        <div className='div-button-next'>
                            <button type="submit" className='btn-next'>
                                Siguiente
                            </button>
                        </div>
                    </form>

                    <div className='have-account'>
                        <p>¿No tienes una cuenta? - <Link to="/registro" className="link-login">Crear una cuenta</Link></p>
                    </div>
                </div>
            </div>

            <div className='right-login'>
                <h1 className="text-h1-login">Aprende de personas <strong>comprometidas</strong> con ayudarte.</h1>
                <p className="text-p-login">
                    Nuestros instructores desarrollan contenido accesible y práctico para brindarte las herramientas que puedas aplicar en tu vida diaria.
                </p>
                <div className="lottie-container">
                    <DotLottieReact
                        src="/MentalTherapy.lottie"
                        loop
                        autoplay
                    />
                </div>
            </div>
        </div>
    );
}