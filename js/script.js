$(document).ready(function(){

const API = "3dfaebbcd9a14c3ef80eefe16f4c68de"

var cityInput = $('#city-input');
var cityTitle = $('#city-title');
var searchBTN = $('#search-button');  
var humidifier = $('#today-humidity');
var windy = $('#today-wind');
var uvindex = $('#today-uvindex');
var fiveDayForecast = $('#FiveDay');

var apiUrl = "";
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

