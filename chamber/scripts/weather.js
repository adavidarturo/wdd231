// API_KEY
const WEATHER_API_KEY = 'b358bf450882791483c31462884229ee';
const LATITUDE = '-16.4006755';
const LONGITUDE = '-71.5347201';

async function fetchWeather() {
    try {
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${WEATHER_API_KEY}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${WEATHER_API_KEY}`;

        const currentResponse = await fetch(currentWeatherUrl);
        const currentData = await currentResponse.json();

        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('weather-description').textContent = 'Unable to load weather data';
    }
}

function displayCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;

    document.getElementById('current-temp').textContent = temp;
    document.getElementById('weather-description').textContent = description;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';

    // Group forecast by day and get one entry per day (every 24 hours)
    const dailyForecasts = {};
    data.list.forEach(forecast => {
        const date = new Date(forecast.dt * 1000).toLocaleDateString();
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = forecast;
        }
    });

    // Get 3 days
    Object.values(dailyForecasts).slice(0, 3).forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(forecast.main.temp);
        const description = forecast.weather[0].description;

        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-day';
        forecastCard.innerHTML = `
            <p><strong>${dayName}</strong></p>
            <p class="forecast-temp">${temp}°C</p>
            <p>${description}</p>
        `;
        forecastContainer.appendChild(forecastCard);
    });
}

// Load weather when page loads
document.addEventListener('DOMContentLoaded', fetchWeather);
