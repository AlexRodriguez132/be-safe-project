import { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import '../public/AuthPages.css'
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const [paso, setPaso] = useState(1);

    const avanzarPaso = () => {
        if (paso < 3) setPaso(paso + 1);
    };

    const retrocederPaso = () => {
        if (paso > 1) setPaso(paso - 1);
    };

    const [mostrarPassword, setMostrarPassword] = useState(false);

    const [mostrarConfirmPassword, setMostrarConfirmPassword] = useState(false);

    const navigate = useNavigate();

   const handleNavegarLandingPage = () => {
       navigate("/")
   }

   const handleNavegarLogin = () => {
    navigate("/login")
   }

    return (
        <div className="container-register">
            <div className='left-register'>
                <button className="navbarLogo" onClick={handleNavegarLandingPage}>BE SAFE</button>
                <h1 className='title-h1-register'>Un espacio creado para <strong>acompañarte.</strong></h1>
                <p className='text-p-register'>Accede a contenido confiable, recursos prácticos y experiencias de aprendizaje diseñadas para adaptarse a tus necesidades.</p>
                <div className="lottie-container2">
                    <DotLottieReact
                        src="/MentalHealty.lottie"
                        loop
                        autoplay
                    />
                </div>
            </div>
            <div className="right-register">
                <div className="register-card">
                    <h1>Crea tu cuenta</h1>
                    <p>Completa tus datos para comenzar</p>
                    <div class="barra-pasos">
                        <div className="progreso" style={{ width: `${(paso - 1) * 50}%` }}></div>
                        <div className={`paso ${paso >= 1 ? 'activo' : ''}`}>1</div>
                        <div className={`paso ${paso >= 2 ? 'activo' : ''}`}>2</div>
                        <div className={`paso ${paso >= 3 ? 'activo' : ''}`}>3</div>
                    </div>
                    {paso === 1 && (
                        <>
                            <label htmlFor='name-input'>Nombre Completo<span className="asterisco">*</span>:
                                <div className='data'>
                                    <div className="icon-input">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="22" viewBox="0 0 16 22" fill="none">
                                            <path d="M1 21V18.7778C1 17.599 1.48864 16.4686 2.35841 15.6351C3.22819 14.8016 4.40787 14.3333 5.63792 14.3333H10.2758C11.5059 14.3333 12.6856 14.8016 13.5553 15.6351C14.4251 16.4686 14.9138 17.599 14.9138 18.7778V21M3.31896 5.44444C3.31896 6.62318 3.8076 7.75365 4.67737 8.58714C5.54715 9.42064 6.72683 9.88889 7.95688 9.88889C9.18693 9.88889 10.3666 9.42064 11.2364 8.58714C12.1062 7.75365 12.5948 6.62318 12.5948 5.44444C12.5948 4.2657 12.1062 3.13524 11.2364 2.30175C10.3666 1.46825 9.18693 1 7.95688 1C6.72683 1 5.54715 1.46825 4.67737 2.30175C3.8076 3.13524 3.31896 4.2657 3.31896 5.44444Z" stroke="#858585" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <input id="name-input" className='inputs-auth' placeholder='Escribe tu nombre completo' type='text'></input>
                                </div>
                            </label>
                            <br />
                            <label htmlFor='age-input'>Edad<span className="asterisco">*</span>:
                                <div className='data'>
                                    <div className="icon-input">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                                            <path d="M13 1V5M5 1V5M1 9H17M4 12H4.013M7.01001 12H7.01501M10.01 12H10.015M13.0149 12H13.0199M10.0149 15H10.0199M4.01001 15H4.01501M7.01001 15H7.01501M1 5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3H15C15.5304 3 16.0391 3.21071 16.4142 3.58579C16.7893 3.96086 17 4.46957 17 5V17C17 17.5304 16.7893 18.0391 16.4142 18.4142C16.0391 18.7893 15.5304 19 15 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V5Z" stroke="#858585" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <input id="age-input" className='inputs-auth' placeholder='Escribe tu edad. Ej: 20.' type='number'></input>
                                </div>
                            </label>
                            <br />
                            <label htmlFor='city-input'>Ciudad<span className="asterisco">*</span>:
                                <div className='data'>
                                    <div className="icon-input">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
                                            <path d="M6 8.99969C6 9.79534 6.31607 10.5584 6.87868 11.121C7.44129 11.6836 8.20435 11.9997 9 11.9997C9.79565 11.9997 10.5587 11.6836 11.1213 11.121C11.6839 10.5584 12 9.79534 12 8.99969C12 8.20405 11.6839 7.44098 11.1213 6.87837C10.5587 6.31576 9.79565 5.99969 9 5.99969C8.20435 5.99969 7.44129 6.31576 6.87868 6.87837C6.31607 7.44098 6 8.20405 6 8.99969Z" stroke="#858585" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M14.657 14.6567L10.414 18.8997C10.039 19.2743 9.53059 19.4848 9.0005 19.4848C8.47042 19.4848 7.96202 19.2743 7.587 18.8997L3.343 14.6567C2.22422 13.5379 1.46234 12.1124 1.15369 10.5606C0.845043 9.00873 1.00349 7.40022 1.60901 5.93844C2.21452 4.47665 3.2399 3.22725 4.55548 2.34821C5.87107 1.46918 7.41777 1 9 1C10.5822 1 12.1289 1.46918 13.4445 2.34821C14.7601 3.22725 15.7855 4.47665 16.391 5.93844C16.9965 7.40022 17.155 9.00873 16.8463 10.5606C16.5377 12.1124 15.7758 13.5379 14.657 14.6567Z" stroke="#858585" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <select id="city-input" className='inputs-auth' defaultValue="">
                                        <option value="" disabled>Selecciona una opción</option>
                                        <option value="mexico">México</option>
                                        <option value="espana">España</option>
                                        <option value="argentina">Argentina</option>
                                        <option value="colombia">Colombia</option>
                                    </select>
                                </div>
                            </label>
                        </>
                    )}

                    {paso === 2 && (
                        <>
                            <label htmlFor='mail-input'>Correo electrónico<span className="asterisco">*</span>:
                                <div className='data'>
                                    <div className="icon-input">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M3 7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7M3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7M3 7L12 13L21 7" stroke="#858585" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <input id="mail-input" className='inputs-auth' placeholder='Ej: ILove_mang0s@gmail.com' type='number'></input>
                                </div>
                            </label>
                            <br/>
                            <label htmlFor='phone-input'>Teléfono:
                                <div className='data'>
                                    <div className="icon-input">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                            <path d="M7 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3C1.23705 6.90074 2.8935 10.5798 5.65683 13.3432C8.42015 16.1065 12.0993 17.763 16 18C16.5304 18 17.0391 17.7893 17.4142 17.4142C17.7893 17.0391 18 16.5304 18 16V12L13 10L11.5 12.5C9.32847 11.429 7.57096 9.67153 6.5 7.5L9 6L7 1Z" stroke="#858585" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <input id="phone-input" className='inputs-auth' placeholder='Ej: 777 000 0000.' type='number'></input>
                                </div>
                            </label>
                            <br/>
                            <label htmlFor='sexual-input'>Orientación Sexual:
                                <div className='data'>
                                    <div className="icon-input">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M19.5001 12.5721L12.0001 20.0001L4.50006 12.5721C4.00536 12.0907 3.6157 11.5121 3.3556 10.8727C3.09551 10.2333 2.97062 9.54701 2.98879 8.85699C3.00697 8.16697 3.16782 7.48819 3.46121 6.86339C3.75461 6.23859 4.17419 5.68131 4.69354 5.22663C5.21289 4.77196 5.82076 4.42974 6.47887 4.22154C7.13697 4.01333 7.83106 3.94364 8.51743 4.01686C9.20379 4.09007 9.86756 4.30461 10.4669 4.64696C11.0663 4.98931 11.5883 5.45205 12.0001 6.00605C12.4136 5.45608 12.9362 4.99738 13.5352 4.65866C14.1341 4.31994 14.7966 4.1085 15.481 4.03757C16.1654 3.96665 16.8571 4.03775 17.5128 4.24645C18.1685 4.45514 18.7741 4.79693 19.2916 5.25042C19.8091 5.70391 20.2275 6.25934 20.5205 6.88195C20.8135 7.50456 20.9748 8.18094 20.9944 8.86876C21.0139 9.55659 20.8913 10.241 20.6342 10.8793C20.3771 11.5176 19.991 12.0959 19.5001 12.5781M12.0001 6L8.70709 9.293C8.51962 9.48053 8.41431 9.73484 8.41431 10C8.41431 10.2652 8.51962 10.5195 8.70709 10.707L9.25009 11.25C9.94009 11.94 11.0601 11.94 11.7501 11.25L12.7501 10.25C13.3468 9.65327 14.1562 9.31803 15.0001 9.31803C15.844 9.31803 16.6534 9.65327 17.2501 10.25L19.5001 12.5M12.5 15.5L14.5 17.5M15 13L17 15" stroke="#858585" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <select id="sexual-input" className='inputs-auth' defaultValue="">
                                        <option value="" disabled>Selecciona una opción</option>
                                        <option value="Heterosexual">Heterosexual</option>
                                        <option value="Homosexual">Homosexual</option>
                                        <option value="Bisexual">Bisexual</option>
                                        <option value="Transexual">Transexual</option>
                                    </select>
                                </div>
                            </label>
                        </>
                    )}

                    {paso === 3 && (
                        <>
                            <label htmlFor='password-input'>Contraseña<span className="asterisco">*</span>:
                                <div className='data'>
                                    <div className="icon-input" htmlFor="password-input">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" viewBox="0 0 20 25" fill="none">
                                            <path d="M4.85714 11.2222V6.11111C4.85714 4.75556 5.39898 3.45553 6.36345 2.49701C7.32792 1.53849 8.63603 1 10 1C11.364 1 12.6721 1.53849 13.6365 2.49701C14.601 3.45553 15.1429 4.75556 15.1429 6.11111V11.2222M1 13.7778C1 13.1 1.27092 12.45 1.75315 11.9707C2.23539 11.4915 2.88944 11.2222 3.57143 11.2222H16.4286C17.1106 11.2222 17.7646 11.4915 18.2468 11.9707C18.7291 12.45 19 13.1 19 13.7778V21.4444C19 22.1222 18.7291 22.7722 18.2468 23.2515C17.7646 23.7308 17.1106 24 16.4286 24H3.57143C2.88944 24 2.23539 23.7308 1.75315 23.2515C1.27092 22.7722 1 22.1222 1 21.4444V13.7778ZM8.71429 17.6111C8.71429 17.95 8.84974 18.275 9.09086 18.5146C9.33198 18.7543 9.65901 18.8889 10 18.8889C10.341 18.8889 10.668 18.7543 10.9091 18.5146C11.1503 18.275 11.2857 17.95 11.2857 17.6111C11.2857 17.2722 11.1503 16.9472 10.9091 16.7076C10.668 16.468 10.341 16.3333 10 16.3333C9.65901 16.3333 9.33198 16.468 9.09086 16.7076C8.84974 16.9472 8.71429 17.2722 8.71429 17.6111Z" stroke="#858585" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <input id="password-input" className='inputs-auth' placeholder='Escribe tu contraseña' type={mostrarPassword ? 'text' : 'password'}></input>
                                    <div
                                        className="icon-eye"
                                        onClick={() => setMostrarPassword(!mostrarPassword)}
                                        style={{ cursor: 'pointer', paddingRight: '12px' }}
                                    >
                                        {!mostrarPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M21 9C18.6 11.667 15.6 13 12 13C8.4 13 5.4 11.667 3 9M3 15L5.5 11.2M21.0001 14.976L18.5081 11.2M9 17L9.5 13M15 17L14.5 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M21 12C18.6 16 15.6 18 12 18C8.4 18 5.4 16 3 12C5.4 8 8.4 6 12 6C15.6 6 18.6 8 21 12Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            </label>
                            <br/>
                            <label htmlFor='password-input'>Confirmar contraseña<span className="asterisco">*</span>:
                                <div className='data'>
                                    <div className="icon-input" htmlFor="password-input">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" viewBox="0 0 20 25" fill="none">
                                            <path d="M4.85714 11.2222V6.11111C4.85714 4.75556 5.39898 3.45553 6.36345 2.49701C7.32792 1.53849 8.63603 1 10 1C11.364 1 12.6721 1.53849 13.6365 2.49701C14.601 3.45553 15.1429 4.75556 15.1429 6.11111V11.2222M1 13.7778C1 13.1 1.27092 12.45 1.75315 11.9707C2.23539 11.4915 2.88944 11.2222 3.57143 11.2222H16.4286C17.1106 11.2222 17.7646 11.4915 18.2468 11.9707C18.7291 12.45 19 13.1 19 13.7778V21.4444C19 22.1222 18.7291 22.7722 18.2468 23.2515C17.7646 23.7308 17.1106 24 16.4286 24H3.57143C2.88944 24 2.23539 23.7308 1.75315 23.2515C1.27092 22.7722 1 22.1222 1 21.4444V13.7778ZM8.71429 17.6111C8.71429 17.95 8.84974 18.275 9.09086 18.5146C9.33198 18.7543 9.65901 18.8889 10 18.8889C10.341 18.8889 10.668 18.7543 10.9091 18.5146C11.1503 18.275 11.2857 17.95 11.2857 17.6111C11.2857 17.2722 11.1503 16.9472 10.9091 16.7076C10.668 16.468 10.341 16.3333 10 16.3333C9.65901 16.3333 9.33198 16.468 9.09086 16.7076C8.84974 16.9472 8.71429 17.2722 8.71429 17.6111Z" stroke="#858585" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <input id="password-input" className='inputs-auth' placeholder='Escribe tu contraseña' type={mostrarConfirmPassword ? 'text' : 'password'}></input>
                                    <div
                                        className="icon-eye"
                                        onClick={() => setMostrarConfirmPassword(!mostrarConfirmPassword)}
                                        style={{ cursor: 'pointer', paddingRight: '12px' }}
                                    >
                                        {!mostrarConfirmPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M21 9C18.6 11.667 15.6 13 12 13C8.4 13 5.4 11.667 3 9M3 15L5.5 11.2M21.0001 14.976L18.5081 11.2M9 17L9.5 13M15 17L14.5 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg> 
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M21 12C18.6 16 15.6 18 12 18C8.4 18 5.4 16 3 12C5.4 8 8.4 6 12 6C15.6 6 18.6 8 21 12Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            </label>
                        </>
                    )}
                    <div className='div-button-next'>
                        {paso > 1 && (
                            <button type="button" className='btn-back' onClick={retrocederPaso}>
                                Atrás
                            </button>
                        )}

                        {paso < 3 ? (
                            <button type="button" className='btn-next' onClick={avanzarPaso}>
                                Siguiente
                            </button>
                        ) : (
                            <button type="submit" className='btn-next'>
                                Registrarse
                            </button>
                        )}
                    </div>
                    <div className='have-account'>
                        <p>¿Ya tienes una cuenta? - <Link to="/login" className="link-login">Inciar Sesión</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
