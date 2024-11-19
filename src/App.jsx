import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faRotate } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import { useNavigate} from "react-router-dom";
import { useState } from "react";

function App() {
  const API_KEY = "2b03189ba6f413149db50570d19ea8ae";
  const [city, setCity] = useState("");
  const [displayName, setDisplayName] = useState(null);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  const navigate = useNavigate();
  return (
    <>
      <header>
        <p onClick={()=>navigate('/')}>
          <FontAwesomeIcon icon={faCloud} /> MayWeather
        </p>
      </header>
      <div className="hero">
        <div>
          <h2>MayWeather</h2>
          <p>
            Up to date weather forecasts and history brought to you in an
            elegant comprehensible way.
          </p>
        </div>
      </div>
      <div className="weatherdisplay">
        <div>
          <div className="searchbox" placeholder="Search City">
            <input type="search" value={city} onChange={(e)=>setCity(e.target.value)}/>
            <button>Search</button>
          </div>
          <div className="metric">
            <p><FontAwesomeIcon icon={faRotate} /></p>
            <p>Metric: °C, m/s</p>
            <p>Imperial: °F, mph</p>
          </div>
        </div>

        <div className="weatherinfo">
          <div>
            <p>Date</p>
            <h2>{displayName??"Accra" }</h2>
            <p>Temperature</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
