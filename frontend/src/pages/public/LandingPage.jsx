import { useNavigate } from 'react-router-dom';
import '/src/pages/public/LandingPage.css';

export default function LandingPage() {

    const navigate = useNavigate();

    const handleNavegarLogin = () => {
        navigate("/login")
    }

    const handleNavegarRegistro = () => {
        navigate("/registro")
    }

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
                    <button className="btn-login" onClick={handleNavegarLogin}> Iniciar Sesión</button>
                    <button className="btn-register" onClick={handleNavegarRegistro}>Registrarse</button>
                </div>
            </div>
            <div className="container-one">
                <div className="left-landingpage">
                    <h1 className="title">Tu espacio seguro para <strong className="green">aprender, sanar</strong> y <strong>crecer.</strong></h1>
                    <p className="text-title">Cursos y recursos diseñados para acompañarte en momentos dificiles. Aprende a tu ritmo, con herramientas prácticas y apoyo real.</p>
                    <div className="buttons-2">
                        <button className="btn-start-free" onClick={handleNavegarRegistro}>Comenzar gratis</button>
                        <button className="btn-login2" onClick={handleNavegarLogin}>Iniciar sesión</button>
                    </div>
                </div>
                <div>
                    <img className="image" src="src/pages/public/img/ImagenLandingPage.png" alt="Pagina BeSafe" />
                </div>
            </div>
            <div className="container-two">
                <div className='card'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 70 70" fill="none">
                        <path d="M29.844 21.1977C28.4766 19.8302 27.7083 17.9755 27.7083 16.0417C27.7083 14.1078 28.4766 12.2531 29.844 10.8857C31.2115 9.51823 33.0661 8.75 35 8.75C36.9339 8.75 38.7885 9.51823 40.156 10.8857C41.5234 12.2531 42.2917 14.1078 42.2917 16.0417C42.2917 17.9755 41.5234 19.8302 40.156 21.1977C38.7885 22.5651 36.9339 23.3333 35 23.3333C33.0661 23.3333 31.2115 22.5651 29.844 21.1977Z" stroke="#59C9A5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M35.0001 62.3234L49.8605 47.4601C50.7057 46.6257 51.3776 45.6324 51.8374 44.5374C52.2972 43.4423 52.5359 42.2671 52.5398 41.0794C52.5436 39.8918 52.3125 38.7151 51.8598 37.6171C51.4071 36.5191 50.7416 35.5214 49.9018 34.6816C49.062 33.8418 48.0644 33.1764 46.9664 32.7237C45.8684 32.2709 44.6917 32.0398 43.504 32.0437C42.3163 32.0475 41.1412 32.2862 40.0461 32.7461C38.951 33.2059 37.9578 33.8777 37.1234 34.723L35.0001 36.8434L32.8767 34.723C32.0424 33.8777 31.0491 33.2059 29.954 32.7461C28.859 32.2862 27.6838 32.0475 26.4961 32.0437C25.3084 32.0398 24.1317 32.2709 23.0337 32.7237C21.9357 33.1764 20.9381 33.8418 20.0983 34.6816C19.2585 35.5214 18.593 36.5191 18.1403 37.6171C17.6876 38.7151 17.4565 39.8918 17.4603 41.0794C17.4642 42.2671 17.7029 43.4423 18.1627 44.5374C18.6225 45.6324 19.2944 46.6257 20.1396 47.4601L35.0001 62.3234Z" stroke="#59C9A5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h3 className="card-title">Hecho con propósito</h3>
                    <p className="card-text">
                        Creado para acompañarte con empatía y respeto
                    </p>
                </div>
                <div className='card'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 70 70" fill="none">
                        <path d="M33.425 60.8008C24.6438 58.0788 17.2861 52.0111 12.9419 43.9088C8.59766 35.8065 7.61576 26.3203 10.2083 17.5C19.2953 17.9158 28.1872 14.7775 35 8.75C41.8128 14.7775 50.7047 17.9158 59.7917 17.5C61.7711 24.2349 61.6797 31.4094 59.5292 38.0917M43.75 55.4167L49.5833 61.25L61.25 49.5833" stroke="#59C9A5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h3 className="card-title">Contenido confiable</h3>
                    <p className="card-text">
                        Material desarollado por profesionales especializados
                    </p>
                </div>
                <div className='card'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 70 70" fill="none">
                        <path d="M23.3333 32.0833V20.4167C23.3333 17.3225 24.5625 14.355 26.7504 12.1671C28.9383 9.97916 31.9058 8.75 35 8.75C38.0942 8.75 41.0616 9.97916 43.2496 12.1671C45.4375 14.355 46.6666 17.3225 46.6666 20.4167V32.0833M14.5833 37.9167C14.5833 36.3696 15.1979 34.8858 16.2919 33.7919C17.3858 32.6979 18.8695 32.0833 20.4166 32.0833H49.5833C51.1304 32.0833 52.6141 32.6979 53.7081 33.7919C54.8021 34.8858 55.4166 36.3696 55.4166 37.9167V55.4167C55.4166 56.9638 54.8021 58.4475 53.7081 59.5415C52.6141 60.6354 51.1304 61.25 49.5833 61.25H20.4166C18.8695 61.25 17.3858 60.6354 16.2919 59.5415C15.1979 58.4475 14.5833 56.9638 14.5833 55.4167V37.9167ZM32.0833 46.6667C32.0833 47.4402 32.3906 48.1821 32.9376 48.7291C33.4846 49.276 34.2264 49.5833 35 49.5833C35.7735 49.5833 36.5154 49.276 37.0624 48.7291C37.6094 48.1821 37.9166 47.4402 37.9166 46.6667C37.9166 45.8931 37.6094 45.1513 37.0624 44.6043C36.5154 44.0573 35.7735 43.75 35 43.75C34.2264 43.75 33.4846 44.0573 32.9376 44.6043C32.3906 45.1513 32.0833 45.8931 32.0833 46.6667Z" stroke="#59C9A5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h3 className="card-title">Privacidad primero</h3>
                    <p className="card-text">
                        Tu información está protegida y nunca será compartida
                    </p>
                </div>
                <div className='card'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 70 70" fill="none">
                        <path d="M8.75 61.25V55.4167C8.75 52.3225 9.97916 49.355 12.1671 47.1671C14.355 44.9792 17.3225 43.75 20.4167 43.75H32.0833C35.1775 43.75 38.145 44.9792 40.3329 47.1671C42.5208 49.355 43.75 52.3225 43.75 55.4167V61.25M46.6667 9.12918C49.1762 9.77173 51.4005 11.2312 52.9889 13.2776C54.5774 15.3239 55.4395 17.8408 55.4395 20.4313C55.4395 23.0218 54.5774 25.5386 52.9889 27.5849C51.4005 29.6313 49.1762 31.0908 46.6667 31.7333M61.25 61.2501V55.4167C61.2352 52.8418 60.3689 50.3441 58.7862 48.3129C57.2035 46.2818 54.9932 44.8313 52.5 44.1876M14.5833 20.4167C14.5833 23.5109 15.8125 26.4783 18.0004 28.6662C20.1883 30.8542 23.1558 32.0833 26.25 32.0833C29.3442 32.0833 32.3117 30.8542 34.4996 28.6662C36.6875 26.4783 37.9167 23.5109 37.9167 20.4167C37.9167 17.3225 36.6875 14.355 34.4996 12.1671C32.3117 9.97916 29.3442 8.75 26.25 8.75C23.1558 8.75 20.1883 9.97916 18.0004 12.1671C15.8125 14.355 14.5833 17.3225 14.5833 20.4167Z" stroke="#59C9A5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h3 className="card-title">Comunidad que escucha</h3>
                    <p className="card-text">
                        Un espacio seguro para, compartir, aprender y crecer
                    </p>
                </div>
            </div>
        </div>
    );
}
