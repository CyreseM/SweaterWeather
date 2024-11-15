import React, { useEffect } from 'react'
import weather from './assets/rainy.mp4'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud } from '@fortawesome/free-solid-svg-icons'
import { Outlet, useNavigate } from 'react-router-dom'

const LogIn = () => {
  const navigate = useNavigate('')
  useEffect(()=>{
    navigate('signin')
  }, [])
 
  return (
    <div style={{boxSizing: "border-box"}}>
      <header>
        <p><FontAwesomeIcon icon={faCloud}/> MayWeather</p>
      </header>
      <div className="video-container">
        <video autoPlay loop muted playsInline>
          <source src={weather} type="video/mp4" />
        </video>
        <section className="logpage">
           <Outlet/>
       </section>
      </div>
       
    </div>
  )
}

export default LogIn
