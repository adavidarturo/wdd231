
// Selectors 
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// API variables
const lat = "49.7631";       
const lon = "6.670317";      
const apiKey = "47dde5fb2df3f6d36c9512b742ddb837"; 

// URL
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

// Función asincrónica para obtener los datos
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // Para verificar en consola
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

// Función para mostrar los resultados en tu HTML
function displayResults(data) {
  currentTemp.textContent = `${data.main.temp.toFixed(1)} °C`;
  
  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const desc = data.weather[0].description;

  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc;
}

// Invoca la función
apiFetch();

