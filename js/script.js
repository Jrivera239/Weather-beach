
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
const ForecastDays = document.querySelectorAll(".forecastDays");
const fiveDate = document.querySelectorAll(".dateF");
console.log(ForecastDays);

var seachArray = function (city) {
    for (var i = 0; i < cityArray.length;i++) {
        if (city.toUpperCase() === cityArray[i]) {
            return -1;
        }
    }
    return 1;
};

// calls weather API //
var getWeatherAPI = function (lat, lon) {
const openweathermap = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,alerts,minutely&appid=a22fcda0659e95b539385ad289716ca4`;

fetch (openweathermap) 
.then ((res) => res.json())
.then ((data) => {
    console.log(data);
    displayForecastDays(data.daily);
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

// shows current day data //

var displayToday = function (today) {
  let todayWeather = today.today;
  let todayDate = new Date(todayWeather.dt * 1000).toLocaleDateString();

  todayName.innerHTML = `${city}:`.toUpperCase() + ` ${todayDate}`;
  todayTemp.innerHTML = ` ${todaytWeather.temp}`;
  todayHumid.innerHTML = ` ${todayWeather.humidity} %`;
  todayWinds.innerHTML = ` ${todayWeather.wind_speed} MPH`;
  todayIndex.innerHTML = ` ${todayWeather.uvi}`;

  // allows image to appear //

  let todayIcon = `${todayWeather.weather[0].icon}`;
  let iconUrl = `https://openweathermap.org/img/wn/${todayIcon}@2x.png`;
  todayIcon.innerHTML = "<img src=" + iconUrl + ">";
};

//displays forecast for 5 days

var displaCurrent = function (fiveday) {
    for (var i = 0; i < 5; i++) {

      let dailyDate = new Date(fiveday[i].dt * 1000).toLocaleDateString();
      console.log(dailyDate);

      let tempFive = fiveday[i].temp.day;
      let dailyIcon = `${fiveday[i].weather[0].icon}`;
      let dailyIconUrl = `https://openweathermap.org/img/wn/${dailyIcon}@2x.png`;
  

    //places temp, wind and humidity, in their respective places
    document.querySelector(`#statustemp${[i]}`).innerHTML = " " + tempFive;
    document.querySelector(`#statuswind${[i]}`).innerHTML =
      " " + fiveday[i].wind_speed + " MPH";
    document.querySelector(`#statushumid${[i]}`).innerHTML =
      " " + fiveday[i].humidity + "%";
    document.querySelector(`#statusimage${[i]}`).innerHTML =
      "<img src=" + dailyIconUrl + ">";
    document.querySelector(`#statusdate${[i]}`).innerHTML = dailyDate;
  }
};
// saves the searched cities on search history //
var saveCityName = function (city) {
  cityArray = JSON.parse(localStorage.getItem("city"));
  if (cityArray == null) {
    cityArray = [];
    cityArray.push(city.toUpperCase());
    localStorage.setItem("city", JSON.stringify(cityArray));
    appendToList(city.toUpperCase());
  } else {
    if (searchArray(city) > 0) {
      cityArray.push(city.toUpperCase());
      localStorage.setItem("city", JSON.stringify(cityArray));
      appendToList(city.toUpperCase());
    }
  }
  userInput.value = "";
};




