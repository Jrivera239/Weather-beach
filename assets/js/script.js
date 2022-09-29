const saveCity = document.querySelector("#saveCity");
const userBTN = document.querySelector("#userBtn");

//current day //

const currentTemp = document.querySelector("#currentTemp");
const currentHumid = document.querySelector("#currentHumid");
const currentWinds = document.querySelector("#currentWind");
const currentIcon = document.querySelector("#currentIcon");
const currentIndex = document.querySelector("#currentIndex");
const currentName = document.querySelector("#cityName");
const ForeCast = document.querySelectorAll(".ForeCast");

let city = "";
let cityArray = [];
let userInput = document.querySelector("#userInput");
let clearHistory = document.querySelector("#clearHistory");

var searchArray = function (city) {
  for (var i = 0; i < cityArray.length; i++) {
    if (city.toUpperCase() === cityArray[i]) {
      return -1;
    }
  }
  return 1;
};

var formatCityName = function (event) {
  event.preventDefault();
  if (userInput.value !== "") {
    city = userInput.value.split(" ").join("");
    convertInputApi(city);
  } else {
    alert("Please Type in a City Name");
  }
};

//grab openweather api //
var getOpenWeatherApi = function (lat, lon) {
  
  const weathApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,alerts,minutely&appid=3dfaebbcd9a14c3ef80eefe16f4c68de`;

  fetch(weathApi)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayCurrent(data);
      displayForeCast(data.daily);
    }
  );
};

//grabs API LAT and LON from cities//

var convertInputApi = function (city) {
  var convertApi =
    "https://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid=3dfaebbcd9a14c3ef80eefe16f4c68de";
  fetch(convertApi).then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        const LData = data[0];
        const lat = LData.lat;
        const lon = LData.lon;
        saveCityName(city);
        getOpenWeatherApi(lat, lon);
      });
    } 
    else 
    {
      alert("Enter city name");
    }
  }
  );
};

//displays weather API current day //

var displayCurrent = function (current) {
  let currentWeather = current.current;
  let currentDate = new Date(currentWeather.dt * 2000)
  .toLocaleDateString();
//current day weather //
  currentName.innerHTML = `${city}:`.toUpperCase() + ` ${currentDate}`;
  currentTemp.innerHTML = ` ${currentWeather.temp}`;
  currentHumid.innerHTML = ` ${currentWeather.humidity} %`;
  currentWinds.innerHTML = ` ${currentWeather.wind_speed} MPH`;
  currentIndex.innerHTML = ` ${currentWeather.uvi}`;

  //need image to appear instead //

  let currentIcon = `${currentWeather.weather[0].icon}`;
  let iconUrl = `https://openweathermap.org/img/wn/${currentIcon}@2x.png`;
  currentIcon.innerHTML = "<img src=" + iconUrl + ">";
};

//displays five day cast //

var displayForeCast = function (five) {
  for (var i = 0; i < 5; i++) {

  let dailyDate = new Date(five[i].dt * 1000).toLocaleDateString();
  console.log(dailyDate);
  let tempFive = five[i].temp.day;
  let dailyIcon = `${five[i].weather[0].icon}`;
  let dailyIconUrl = `https://openweathermap.org/img/wn/${dailyIcon}@2x.png`;

  // places temp, wind and humidity //

    document.querySelector(`#ForeCasttemp${[i]}`).innerHTML = " " + tempFive;
    document.querySelector(`#ForeCastwind${[i]}`).innerHTML =
      " " + five[i].wind_speed + " MPH";
    document.querySelector(`#ForeCasthumid${[i]}`).innerHTML =
      " " + five[i].humidity + "%";
    document.querySelector(`#ForeCastimage${[i]}`).innerHTML =
      "<img src=" + dailyIconUrl + ">";
    document.querySelector(`#ForeCastdate${[i]}`).innerHTML = dailyDate;
  }
};

var saveCityName = function (city) {
  cityArray = JSON.parse(localStorage.getItem("city")
  );
  if (cityArray == null) {
    cityArray = [];
    cityArray.push(city.toUpperCase()
    );
    localStorage.setItem("city", JSON.stringify(cityArray)
    );
    appendToList(city.toUpperCase()
    );
  } 
  else 
  {
    if (searchArray(city) > 0) {
      cityArray.push(city.toUpperCase()
      );
      localStorage.setItem("city", JSON.stringify(cityArray));
      appendToList(city.toUpperCase());
    }
  }
userInput.value = "";
};

var appendToList = function (city, listItem) 
  {
    
var listItem = document.createElement("li");
  listItem.setAttribute("class", "list-group-item");
  listItem.setAttribute("data-value", city);
  listItem.innerHTML = city;
  document.querySelector(".list-group").appendChild(listItem);
};

var loadCityName = function (listCity) 
{
  document.querySelector(".list-group").innerHTML = "";
  cityArray = JSON.parse(localStorage.getItem("city"));
  if (cityArray !== null) {
  cityArray = JSON.parse(localStorage.getItem("city"));
  for (i = 0; i < cityArray.length; i++) {
    appendToList(cityArray[i]);
  }
  city = cityArray[i - 1];
  convertInputApi(city);
  }
};

var loadCityClick = function (event) {
  let savedList = event.target.innerHTML;
  if (event.target.matches("li")) {
    city = savedList;
    console.log(city);
    console.log(event.target);
    convertInputApi(city);
  }
};

//saves city searched from API //

userBTN.addEventListener("click", formatCityName);
document.addEventListener("click", loadCityClick);
window.addEventListener("load", loadCityName);
clearHistory.addEventListener("click", function (event) {
event.preventDefault();
cityArray = [];
localStorage.removeItem("city");
document.location.reload();
}
);
