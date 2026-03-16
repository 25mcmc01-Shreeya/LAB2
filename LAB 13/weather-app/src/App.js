import React, { useState, useEffect } from "react";
import CitySearch from "./components/CitySearch";
import WeatherInfo from "./components/WeatherInfo";
import ForecastList from "./components/ForecastList";
import "./styles/weather.css";

function App() {

  const [location, setLocation] = useState("Delhi");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [futureWeather, setFutureWeather] = useState([]);
  const [message, setMessage] = useState("");

  const API = "0198d6140c3345c06385cdf1e5fb895d";

  const loadWeatherData = async (cityName) => {

    try {

      setMessage("");

      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API}&units=metric`
      );

      if (!currentRes.ok) {
        throw new Error("Invalid city name");
      }

      const currentData = await currentRes.json();
      setCurrentWeather(currentData);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API}&units=metric`
      );

      const forecastData = await forecastRes.json();

      const shortForecast = forecastData.list.slice(0, 5);

      setFutureWeather(shortForecast);

    } catch (error) {

      setMessage(error.message);
      setCurrentWeather(null);
      setFutureWeather([]);

    }

  };

  useEffect(() => {
    loadWeatherData(location);
  }, []);

  return (

    <div className="main-container">

      <h1 className="title">City Weather Dashboard</h1>

      <CitySearch
        cityValue={location}
        updateCity={setLocation}
        onSearch={() => loadWeatherData(location)}
      />

      {message && <p className="error-text">{message}</p>}

      <WeatherInfo data={currentWeather} />

      <ForecastList items={futureWeather} />

    </div>

  );

}

export default App;