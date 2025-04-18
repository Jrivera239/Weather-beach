const API_KEY = '5e4e58e77a2b10b79b859c2ea756ddb1';
let searchHistory = [];

function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found!");
      return response.json();
    })
    .then(data => {
      updateWeatherUI(data);
      updateSearchHistory(city);
    })
    .catch(error => alert(error.message));
}

function updateWeatherUI(data) {
  document.getElementById('cityName').textContent = data.name;
  document.getElementById('temp').textContent = data.main.temp;
  document.getElementById('humidity').textContent = data.main.humidity;
  document.getElementById('wind').textContent = data.wind.speed;
  document.getElementById('description').textContent = data.weather[0].description;
  document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById('weatherResult').classList.remove('hidden');
}

function updateSearchHistory(city) {
  if (!searchHistory.includes(city.toLowerCase())) {
    searchHistory.push(city.toLowerCase());
    const historyList = document.getElementById('historyList');
    const listItem = document.createElement('li');
    listItem.textContent = city;
    listItem.style.cursor = "pointer";
    listItem.onclick = () => {
      document.getElementById('cityInput').value = city;
      getWeather();
    };
    historyList.appendChild(listItem);
  }
}