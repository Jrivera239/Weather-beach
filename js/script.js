//vars query

var add = document.querySelector('#add');
var info = document.querySelector('#description');
var input = document.querySelector('#input');
var inputStorage = document.querySelector('#inputs');
var output = document.querySelector('#output');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');
API = "c3ed635e20e129bc3f138cc61aabb462"

function weatherTep(val)
{
    return (val - 273).temp(2)
}
    btn.addEventListener('click', function()
{
        fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid='+API)
        .then(res => res.json()).then(data => {
            var name = data['name'];
            var humidity = data['main'] ['humidity']  ;
            var temp = data['main'] ['temperature'];
            var windspeed = data['speed'] ['wind'];