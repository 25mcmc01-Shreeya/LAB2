import React from "react";

function WeatherInfo({ data }) {

  if (!data) return null;

  return (
    <div className="weather-card">

      <h2>{data.name}</h2>

      <p>Temperature: {data.main.temp} °C</p>

      <p>Humidity: {data.main.humidity}%</p>

      <p>Condition: {data.weather[0].description}</p>

    </div>
  );
}

export default WeatherInfo;