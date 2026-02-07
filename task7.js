// Fetch weather data
function getWeather() {
    var cityInput = document.getElementById("cityInput");
    var resultDiv = document.getElementById("result");
    var city = cityInput.value;
    if (city === "") {
        alert("Please enter a city name");
        return;
    }
    var apiKey = "7552018d4e62103cfa20bc199d459ae7";
    var url = "https://api.openweathermap.org/data/2.5/weather?q=".concat(city, "&units=metric&appid=").concat(apiKey);
    fetch(url)
        .then(function (response) {
        if (!response.ok) {
            throw new Error("City not found");
        }
        return response.json();
    })
        .then(function (data) {
        resultDiv.innerHTML = "\n                <p>\uD83D\uDCCD ".concat(data.name, "</p>\n                <p> ").concat(data.main.temp, " \u00B0C</p>\n                <p> ").concat(data.weather[0].description, "</p>\n            ");
    })
        .catch(function (error) {
        resultDiv.innerHTML = "<p>".concat(error.message, "</p>");
    });
}
