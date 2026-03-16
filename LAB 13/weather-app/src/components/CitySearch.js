import React from "react";

function CitySearch({ cityValue, updateCity, onSearch }) {

  return (

    <div className="search-box">

      <input
        type="text"
        placeholder="Type city name..."
        value={cityValue}
        onChange={(e) => updateCity(e.target.value)}
      />

      <button onClick={onSearch}>
        Get Weather
      </button>

    </div>

  );

}

export default CitySearch;