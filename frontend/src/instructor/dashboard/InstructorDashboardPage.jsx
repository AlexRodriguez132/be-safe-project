import './css/InstructorDashboardPage.css'

export default function InstructorDashboardPage(){
    return(
        <div>
            <div className="navbar-instructor"> 
                <h3>Dashboard</h3>
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

            <div className="container-one-dashboard">
                <div className="cards-top"></div>
                <div className="cards-top"></div>
                <div className="cards-top"></div>
            </div>

            <div className="container-two-dashboard">
                <div className="cards-center"></div>
                <div className="cards-center"></div>
            </div>
            
            <div className="container-three-dashboard">
                <div className="card-bottom">
                    
                </div>
            </div>
        </div>
    )
}