
// joining ids selectors

const today = document.querySelector("#today");
const saveCity = document.querySelector("#saveCity");
const fiveDayCast = document.querySelector("#fiveDayCast");
const searchBtn = document.querySelector("#userBTN");
let userInput = document.querySelector("#userInput");
let city = "";
let cityArray = [];
let clearHistory = document.querySelector("#clearHistory");

// shows today's day //

const todayTemp = document.querySelector("#todayTemp");
const todayHumid = document.querySelector("#todayHumid");
const todayWinds = document.querySelector("#todayWind");
const todayIcon = document.querySelector("#todayIcon");
const todayIndex = document.querySelector("#todayIndex");
const todayName = document.querySelector("#todayName");

// five day forecast //

const fiveDay = document.querySelector("#fiveDayCast");
const forecastDays = document.querySelectorAll(".forecastDays");
const fiveDate = document.querySelectorAll(".dateF");
console.log(forecastDays);

var seachArray = function (city) {
    for (var i = 0; i < cityArray.length;i++) {
        if (city.toUpperCase() === cityArray[i]) {
            return -1;
        }
    }
    return 1;
};

// calls weather API 
var getWeatherAPI = function (lat, lon) {
const openweathermap = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,alerts,minutely&appid=a22fcda0659e95b539385ad289716ca4`;

fetch (openweatheramp) 
.then ((res) => res.json())
.then ((data) => {
    console.log(data);
    displayFuture(data.daily);
});
}

var convertnputApi = function (city) {
    var convertApi = 
    "https://api.openweathermap.org/geo/1.0/direct?q=" + city +"&appid=a22fcda0659e95b539385ad289716ca4";
  fetch(convertApi).then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        const LData = data[0];
        const lat = LData.lat;
        const lon = LData.lon;
        saveCityName(city);
        getWeatherApi(lat, lon);
      });
    } else {
      alert("Please enter a city");
    }
  });
};

//shows data pulled for current day

var displayToday = function (today) {
  let todayWeather = today.today;
  let todayDate = new Date(todayWeather.dt * 1000).toLocaleDateString();

  todayName.innerHTML = `${city}:`.toUpperCase() + ` ${todayDate}`;
  todayTemp.innerHTML = ` ${todaytWeather.temp}`;
  todayHumid.innerHTML = ` ${todayWeather.humidity} %`;
  todayWinds.innerHTML = ` ${todayWeather.wind_speed} MPH`;
  todayIndex.innerHTML = ` ${todayWeather.uvi}`;

  //need image to appear instead
  let todayIcon = `${todayWeather.weather[0].icon}`;
  let iconUrl = `https://openweathermap.org/img/wn/${todayIcon}@2x.png`;
  todayIcon.innerHTML = "<img src=" + iconUrl + ">";
};
