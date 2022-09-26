$(document).ready(function(){
// vars for JS
const APIK = "3dfaebbcd9a14c3ef80eefe16f4c68de"

var cityInput = $('#city-input');
var cityTitle = $('#city-title');
var searchBTN = $('#search-button');  
var humidifier = $('#today-humidity');
var temperature = $('#today-temp');
var windy = $('#today-wind');
var uvindex = $('#today-uvindex');
var SevenDaysForecast = $('#SevenDays');
var PreviousSearches = $('#previous-searches');
var modalText = $('#modal-message');

var APIUrl = "";
var iconUrl = "";
var searchHistory = [];
var city;
var date;
var temp;
var wind;
var humidity;
var uvi;
var icon;
var SevenDaysForecast = [];

$('.modal').modal();
    // calling API Key //
    function Url(city) {
        APIUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&exclude=minutely,hourly,daily,alerts" + APIK;
        let response = fetch(APIUrl).then(function(response){
           if(response.ok) {
               response.json().then(function(data) {
                  APIUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon +"&exclude=minutely,hourly,alerts&units=imperial" + APIK;
             }).then(function() {
                setValues(APIUrl);
             });
        } else {
            Modal("Please try again. " + response.status);
            return;
        return;
     }
 });

        // Values (temp,humidiy,wind,uvi,etc) //
function setValues(APIUrl) {
let response = fetch(APIUrl).then(function(response) {
    if(response.ok) {
        response.json().then(function(data) {
        icon = data.today.weather[0].icon;    
        temp = data.today.temp;
         humidity = data.today.humidity;
        wind = data.today.wind_speed;
        uvi = data.today.uvi;
        SevenDay = [];
        for(var i = 0; i < 7; i++) {
        SevenDay.push(data.daily[i]);
         }
        }).then(function() {
        produceCurrent();
        produceSevenDays();
        });
        } else {
            showModal("Please try again. " + response.status);
            }
            return;
        }
    });
        

 function producecurrent() {
    date = new Date().toLocaleDateString('en-US');
    iconUrl = "http://openweathermap.org/img/wn/" + icon + ".png";
    var img = $('<img>');
    img.attr('src', iconUrl);
    cityTitle.text(city + "  (" + date + ")  ");
    cityTitle.append(img);
    temperature.text(temp + "\u00B0F");
    windy.text(windy + " MPH");
    humidifier.text(humidifier + "%");
    uvindex.text(uvi);
    cityInput.val("");
    }
function SevenDays() {
    date = new Date();
    $('#SevenDays').empty();
    for(var i = 0; i < 7; i++) {
        icon = SevenDaysForecast[i].weather[0].icon;
        temperature = SevenDaysForecast[i].temperature.day;
        humidifier = SevenDaysForecast[i].humidifier;
        windy = SevenDaysForecast[i].windy_speed;
        
        iconUrl = "http://openweathermap.org/img/wn/" + icon + ".png";
        date.setDate(date.getDate() + 1);

var divCard = $('<div>').addClass("col s6 m4 l2 single-day-forecast white white-text center forecast");
var title = $('<h5>').addClass("flow-text").text(date.toLocaleDateString('en-US'));
var img = $('<img>').attr('src', iconUrl);
var cardTemp = $('<p>').text("Temp: " + temperature + "\u00B0F");
var cardWindy = $('<p>').text("Wind: " + windy + " MPH");
var cardHumidity = $('<p>').text("Humidity: " + humidifier + "%");

        divColumn.append(title);
        divColumn.append(img);
        divColumn.append(cardTemp);
        divColumn.append(cardWindy);
        divColumn.append(cardHumidity);
        SevenDaysForecast.append(divCard);
    }
}

function SearchHistory() {
    if(!searchHistory.includes(city)) {
        searchHistory.push(city);
        console.log(searchHistory);
        localStorage.setItem("searches", JSON.stringify(searchHistory));
        var preBTN = $('<a>').addClass("btn black black-text hoverable").text(city);
        PreviousSearches.append(preBTN);
    }  
}

function BeginSearches() {
    for(var i = 0; i < searchHistory.length; i++) {
        var preBTN = $('<a>').addClass("btn black black-text hoverable").text(searchHistory[i]);
        PreviousSearches.append(preBTN);
    }
}

function LoadSearches() {
    var savedSearches = localStorage.getItem("searches");
    if(!savedSearches) {
        searchHistory = [];
    } else {
        searchHistory = JSON.parse(savedSearches);
        city = searchHistory[0];
        Url(city);
    }

    BeginSearches();
}

function showModal(text) {
    var modal = M.Modal.getInstance($('.modal'));
    cityInput.val("");
    modalText.text(text);
    modal.open();
}

function Values() {
icon = "";
iconUrl = "";
apiUrl = "";
city = "";    
temp = "";
wind = "";
humidity = "";
uvi = "";
SevenDaysForecast = [];
SevenDaysForecast.empty();
cityInput.val("");
}

searchBTN.click(function() {
    cities = cityInput.val().trim();
    if(cities) {
        Url(cities);
        SearchHistory();
    } else {
        showModal("Try adding a ciy, perhaps?");
        return;
    }
});   

previousSearches.click(function(event) {
    Values();
    cities = event.target.textContent;
    Url(cities);
});

LoadSearches();
});



















