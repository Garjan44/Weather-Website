
const apiKey = "3d81cd7c08cf2bef5e365517412a4530";
const apiUrl = "https://api.openweathermap.org/geo/1.0/direct?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector("#weatherIcon");

async function checkWeather(city) {
    try {
        const geoResponse = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const geoData = await geoResponse.json();

        if (geoData.length === 0) {
            throw new Error("City not found");
        }

        const { lat, lon } = geoData[0];
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        document.querySelector(".city").innerHTML = weatherData.name;
        document.querySelector(".temp").innerHTML = Math.round(weatherData.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = weatherData.main.humidity + "%";
        document.querySelector(".wind").innerHTML = weatherData.wind.speed + " km/h";

        switch (weatherData.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "images/clouds.png";
                break;
            case "Rain":
                weatherIcon.src = "images/rain.png";
                break;
            case "Clear":
                weatherIcon.src = "images/clear.png";
                break;
            case "Drizzle":
                weatherIcon.src = "images/drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "images/mist.png";
                break;
            default:
                weatherIcon.src = "images/default.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});