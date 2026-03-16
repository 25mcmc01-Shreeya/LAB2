import React from "react";

function ForecastList({ items }) {

  if (!items || items.length === 0) return null;

  return (

    <div className="forecast-container">

      <h2>Next Weather Updates</h2>

      {items.map((entry, idx) => (

        <div key={idx} className="forecast-card">

          <p>{entry.dt_txt}</p>

          <p>Temp: {entry.main.temp} °C</p>

          <p>{entry.weather[0].description}</p>

        </div>

      ))}

    </div>

  );

}

export default ForecastList;