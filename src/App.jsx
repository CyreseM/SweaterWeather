import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faRotate } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useReducer, useRef, useState } from "react";
import Reducer from "./Reducer";

function App() {
  const initialState = {
    displayName: "Accra",
    rotationAngle: 0,
    units: "metric",
    weatherData: {},
  };
  const [state, dispatch] = useReducer(Reducer, initialState);
  const API_KEY = "2b03189ba6f413149db50570d19ea8ae";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${state.displayName}&appid=${API_KEY}&units=${state.units}`;
  const handleRotate = () => {
    dispatch({ type: "rotate" });
  };
  const cityRef = useRef();
  const navigate = useNavigate();
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${months[month]} ${day}`;
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [tabPosition, setTabPosition] = useState("metric"); // Tracks tab position

  const handleUnitChange = (unitType) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTabPosition(unitType); // Move tab visually first
      setTimeout(() => {
        dispatch({ type: unitType });
        setIsTransitioning(false);
      }, 600); // Match the CSS transition duration (0.6s)
    }
  };

  useEffect(() => {
    async function fetchWeather() {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          dispatch({ type: "updateweather", payload: data });
        })
        .catch((error) => console.error("Error:", error));
    }
    fetchWeather();
  }, [state.displayName, state.units]);
  console.log(state.weatherData);
  return (
    <>
      <header>
        <p onClick={() => navigate("/")}>
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
          <div className="searchbox">
            <input type="search" ref={cityRef} placeholder="Search City" />
            <button
              onClick={() =>
                dispatch({
                  type: "displayname",
                  payload: cityRef.current.value,
                })
              }
            >
              Search
            </button>
          </div>
          <div className="metric">
            <p
              onClick={handleRotate}
              style={{
                transform: `rotate(${state.rotationAngle}deg)`,
                transition: "transform 0.6s ease-in-out",
              }}
            >
              <FontAwesomeIcon icon={faRotate} />
            </p>
            <div className="wrapper">
              <input
                type="radio"
                name="tab"
                id="metric"
                readOnly
                checked={tabPosition === "metric"}
              />
              <input
                type="radio"
                name="tab"
                id="imperial"
                readOnly
                checked={tabPosition === "imperial"}
              />
              <div className="tab"></div>
              <label
                htmlFor="metric"
                onClick={() => handleUnitChange("metric")}
              >
                Metric: °C, m/s
              </label>
              <label
                htmlFor="imperial"
                onClick={() => handleUnitChange("imperial")}
              >
                Imperial: °F, mph
              </label>
            </div>
          </div>
        </div>

        <div className="weatherinfo">
          <div>
            <p>{currentDate}</p>
            {state.weatherData?.sys ? (
              <h2>
                {state.displayName}, {state.weatherData.sys.country}
              </h2>
            ) : (
              <h2>Loading city name...</h2>
            )}

            {state.weatherData.main ? (
              <p>
                <img
                  src={`https://openweathermap.org/img/wn/${state.weatherData.weather[0].icon}@2x.png`}
                  alt={state.weatherData.weather[0].description}
                  style={{ verticalAlign: "middle", display: "inline" }}
                />
                {state.weatherData.main.temp}°
                {state.units === "metric" ? "C" : "F"}
              </p>
            ) : (
              <p>Loading weather data...</p>
            )}

            {state.weatherData.weather ? (
              <p>{state.weatherData.weather[0].description}</p>
            ) : (
              <p>Loading weather description...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
