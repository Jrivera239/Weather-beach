$(document).ready(function(){

const APIK = "3dfaebbcd9a14c3ef80eefe16f4c68de"

var cityInput = $('#city-input');
var cityTitle = $('#city-title');
var searchBTN = $('#search-button');  
var humidifier = $('#today-humidity');
var windy = $('#today-wind');
var uvindex = $('#today-uvindex');
var fiveDayForecast = $('#FiveDay');
var previousSearchesEl = $('#previous-searches');

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
var fiveDayForecast = [];

$('.modal').modal();
    // calling API Key //
    function Url(city) {
        APIUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&exclude=minutely,hourly,daily,alerts" + APIK;
        let response = fetch(APIUrl).then(function(response){
            if(response.ok) {
                response.json().then(function(data) {
                    APIUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=minutely,hourly,alerts&units=imperial" + APIK;
                }).then(function() {
                    setValues(APIUrl);
                });
            } else {
                return;
            }
        });

        // Values (temp,humidiy,wind,uvi,etc) //
        function setValues(apiUrl) {
            let response = fetch(apiUrl).then(function(response) {
                if(response.ok) {
                    response.json().then(function(data) {
                      
                        temp = data.today.temp;
                        humidity = data.today.humidity;
                        wind = data.today.wind_speed;
                        uvi = data.today.uvi;
                        icon = data.today.weather[0].icon;
                        fiveDay = [];
                        for(var i = 0; i < 5; i++) {
                            fiveDayForecast.push(data.daily[i]);
                            