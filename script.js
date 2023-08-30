const apiKey = '320ebd23d7f04d8397292903233008'; 

const locationForm = document.getElementById('location-form');
const locationInput = document.getElementById('location-input');
const weatherInfo = document.getElementById('weather-info');

locationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const location = locationInput.value;
    const unit = document.querySelector('input[name="unit"]:checked').value;
    
    try {
        const weatherData = await fetchWeather(location, unit);
        displayWeather(weatherData);
    } catch (error) {
        console.error(error);
    }
});

async function fetchWeather(location, unit) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&unit=${unit}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}

function displayWeather(weatherData) {
    const { location, current } = weatherData;
    
    const weatherHtml = `
        <h2>${location.name}, ${location.country}</h2>
        <p>Temperature: ${current.temp_c}°C (${current.temp_f}°F)</p>
        <p>Condition: ${current.condition.text}</p>
        <img src="${current.condition.icon}" alt="${current.condition.text}">
    `;
    
    weatherInfo.innerHTML = weatherHtml;
}