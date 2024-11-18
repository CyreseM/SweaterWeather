
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud } from '@fortawesome/free-solid-svg-icons'
import './App.css'

function App() {

  return (
    <>
      <header>
        <p><FontAwesomeIcon icon={faCloud}/> MayWeather</p>
      </header>
      <div className="hero">
        <div>
          <h2>MayWeather</h2>
          <p>Up to date weather forecasts and history brought to you in an elegant comprehensible way.</p>
        </div>   
      </div>
      <div className='weatherdisplay'>

      </div>
    </>
  )
}

export default App
