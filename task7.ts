// Interface for weather API response
interface WeatherData {
    name: string;
    main: {
        temp: number;
    };
    weather: {
        description: string;
    }[];
}

// Fetch weather data
function getWeather(): void {
    const cityInput = document.getElementById("cityInput") as HTMLInputElement;
    const resultDiv = document.getElementById("result") as HTMLDivElement;

    const city = cityInput.value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const apiKey = "7552018d4e62103cfa20bc199d459ae7";
    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then((data: WeatherData) => {
            resultDiv.innerHTML = `
                <p>📍 ${data.name}</p>
                <p> ${data.main.temp} °C</p>
                <p> ${data.weather[0].description}</p>
            `;
        })
        .catch(error => {
            resultDiv.innerHTML = `<p>${error.message}</p>`;
        });
}
