import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'




const DashFooter = () => {

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const handleDashButton = () => navigate('/dash')

    let goDashButton = null
    if (pathname !== '/dash') {
        goDashButton = (
            <button
                className='dash-footer__button icon-button'
                title='Home'
                onClick={handleDashButton}
            >
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
    }


    const content = (
        <footer className='dash-footer'>
            {goDashButton}
            <p>User: </p>
            <p>Status: </p>
        </footer>
    )

  return content
}




export default DashFooter