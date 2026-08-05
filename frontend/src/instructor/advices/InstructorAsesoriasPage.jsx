import './css/InstructorAsesoriasPage.css'

export default function InstructorAsesoriasPage() {
    return (
        <div>
            <div className="navbar-instructor">
                <h3>Asesorias</h3>
                <div className="btns-right">
                    <button className="btn-notifications">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="26" viewBox="0 0 26 29" fill="none">
                            <path d="M8.29167 21.4167V22.875C8.29167 24.0353 8.7526 25.1481 9.57307 25.9686C10.3935 26.7891 11.5063 27.25 12.6667 27.25C13.827 27.25 14.9398 26.7891 15.7603 25.9686C16.5807 25.1481 17.0417 24.0353 17.0417 22.875V21.4167M9.75 3.91667C9.75 3.14312 10.0573 2.40125 10.6043 1.85427C11.1513 1.30729 11.8931 1 12.6667 1C13.4402 1 14.1821 1.30729 14.7291 1.85427C15.276 2.40125 15.5833 3.14312 15.5833 3.91667C17.2581 4.70858 18.6858 5.94131 19.7134 7.48273C20.741 9.02415 21.3298 10.8161 21.4167 12.6667V17.0417C21.5264 17.9483 21.8475 18.8165 22.3541 19.5764C22.8607 20.3363 23.5386 20.9666 24.3333 21.4167H1C1.7947 20.9666 2.47264 20.3363 2.97923 19.5764C3.48582 18.8165 3.80692 17.9483 3.91667 17.0417V12.6667C4.00353 10.8161 4.59231 9.02415 5.61993 7.48273C6.64754 5.94131 8.07524 4.70858 9.75 3.91667Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                    <button className="btn-profile">

                    </button>
                </div>
            </div>
            <div className="menu-advices-table">
                <button className="btn-menu-advices">Todas</button>
                <button className="btn-menu-advices">Hoy</button>
                <button className="btn-menu-advices">Esta semana</button>
                <button className="btn-menu-advices">Solicitudes</button>
                <button className="btn-menu-advices">Archivadas</button>
                <div>
                    <label className="label-search-advice">
                        <div className="div-search-advice">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                                <path d="M18.0715 18L12.381 12.3333M1 7.61111C1 8.4793 1.17172 9.33898 1.50536 10.1411C1.83899 10.9432 2.32801 11.672 2.94449 12.2859C3.56097 12.8998 4.29284 13.3867 5.09831 13.719C5.90379 14.0512 6.76708 14.2222 7.63892 14.2222C8.51075 14.2222 9.37405 14.0512 10.1795 13.719C10.985 13.3867 11.7169 12.8998 12.3333 12.2859C12.9498 11.672 13.4388 10.9432 13.7725 10.1411C14.1061 9.33898 14.2778 8.4793 14.2778 7.61111C14.2778 6.74293 14.1061 5.88325 13.7725 5.08115C13.4388 4.27905 12.9498 3.55025 12.3333 2.93635C11.7169 2.32245 10.985 1.83548 10.1795 1.50324C9.37405 1.171 8.51075 1 7.63892 1C6.76708 1 5.90379 1.171 5.09831 1.50324C4.29284 1.83548 3.56097 2.32245 2.94449 2.93635C2.32801 3.55025 1.83899 4.27905 1.50536 5.08115C1.17172 5.88325 1 6.74293 1 7.61111Z" stroke="#858585" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <input className="input-search-advice" placeholder='Buscar asesoria'></input>
                        </div>
                    </label>
                </div>
            </div>
            <div className="advices-table-container">
                <table className="instructor-advices-table">
                    <thead className="table-head-advices">
                        <th>Alumno</th>
                        <th>Tema</th>
                        <th>Fecha y hora</th>
                        <th>Duración</th>
                        <th>Duración</th>
                        <th>Acciones</th>
                    </thead>
                    <tbody className="table-body-advices">
                        <tr>
                            <td>Luis Hernandez</td>
                            <td>Defensa personal</td>
                            <td>22/07/2026</td>
                            <td>1 hora</td>
                            <td>1 hora</td>
                            <td><div className='action-advices-container'><button className="btn-actions-advices"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M21 12C18.6 16 15.6 18 12 18C8.4 18 5.4 16 3 12C5.4 8 8.4 6 12 6C15.6 6 18.6 8 21 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg></button><button className="btn-actions-advices"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M13.5 6.5L17.5 10.5M4 20H8L18.5 9.5C18.7626 9.23735 18.971 8.92555 19.1131 8.58239C19.2553 8.23923 19.3284 7.87143 19.3284 7.5C19.3284 7.12856 19.2553 6.76077 19.1131 6.4176C18.971 6.07444 18.7626 5.76264 18.5 5.5C18.2374 5.23735 17.9256 5.02901 17.5824 4.88687C17.2392 4.74473 16.8714 4.67157 16.5 4.67157C16.1286 4.67157 15.7608 4.74473 15.4176 4.88687C15.0744 5.02901 14.7626 5.23735 14.5 5.5L4 16V20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg></button><button className="btn-actions-advices"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M11 12C11 12.2652 11.1054 12.5196 11.2929 12.7071C11.4804 12.8946 11.7348 13 12 13C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11 19C11 19.2652 11.1054 19.5196 11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19C13 18.7348 12.8946 18.4804 12.7071 18.2929C12.5196 18.1054 12.2652 18 12 18C11.7348 18 11.4804 18.1054 11.2929 18.2929C11.1054 18.4804 11 18.7348 11 19Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11 5C11 5.26522 11.1054 5.51957 11.2929 5.70711C11.4804 5.89464 11.7348 6 12 6C12.2652 6 12.5196 5.89464 12.7071 5.70711C12.8946 5.51957 13 5.26522 13 5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4C11.7348 4 11.4804 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg></button></div></td>
                        </tr>
                        <tr>
                            <td>Luis Fernando Hernandez Gomez De La Cruz </td>
                            <td>Defensa personal</td>
                            <td>22/07/2026</td>
                            <td>1 hora</td>
                            <td>1 hora</td>
                            <td>Ver</td>
                        </tr>
                        <tr>
                            <td>Luis Hernandez</td>
                            <td>Defensa personal</td>
                            <td>22/07/2026</td>
                            <td>1 hora</td>
                            <td>1 hora</td>
                            <td>Ver</td>
                        </tr>
                        <tr>
                            <td>Luis Hernandez</td>
                            <td>Defensa personal</td>
                            <td>22/07/2026</td>
                            <td>1 hora</td>
                            <td>1 hora</td>
                            <td>Ver</td>
                        </tr>
                        <tr>
                            <td>Luis Hernandez</td>
                            <td>Defensa personal</td>
                            <td>22/07/2026</td>
                            <td>1 hora</td>
                            <td>1 hora</td>
                            <td>Ver</td>
                        </tr>
                        <tr>
                            <td>Luis Hernandez</td>
                            <td>Defensa personal</td>
                            <td>22/07/2026</td>
                            <td>1 hora</td>
                            <td>1 hora</td>
                            <td>Ver</td>
                        </tr>
                        <tr>
                            <td>Luis Hernandez</td>
                            <td>Defensa personal</td>
                            <td>22/07/2026</td>
                            <td>1 hora</td>
                            <td>1 hora</td>
                            <td>Ver</td>
                        </tr>
                        <tr>
                            <td>Luis Hernandez</td>
                            <td>Defensa personal</td>
                            <td>22/07/2026</td>
                            <td>1 hora</td>
                            <td>1 hora</td>
                            <td>Ver</td>
                        </tr>
                        <tr>
                            <td>Luis Hernandez</td>
                            <td>Defensa personal</td>
                            <td>22/07/2026</td>
                            <td>1 hora</td>
                            <td>1 hora</td>
                            <td>Ver</td>
                        </tr>
                        <tr>
                            <td>Luis Hernandez</td>
                            <td>Defensa personalDefensa personalDefensa personal</td>
                            <td>22/07/2026</td>
                            <td>1 hora</td>
                            <td>1 hora</td>
                            <td>Ver</td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
            <div className="div-pagination">
                <div>
                <p>Pagina 1/20</p>
                </div>
                <div className='div-btns-pagination'>
                <button className='btns-pagination'>Anterior</button>
                <button className='btns-pagination-numbers-focus'>1</button>
                <button className='btns-pagination-numbers'>2</button>
                <button className='btns-pagination-numbers'>3</button>
                <button className='btns-pagination-numbers'>4</button>
                <button className='btns-pagination-numbers'>5</button>
                <button className='span-dots'>...</button>
                <button className='btns-pagination-numbers'>20</button>
                <button className='btns-pagination'>Siguiente</button>
                </div>
            </div>
        </div>
    )
}