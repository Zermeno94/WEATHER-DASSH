var city="";
//declares a variable to store the searched city 

//variables 
var searchLocation = $("#search-location");
var searchButton = $("#search-button");
var clearHistory = $("#clear-history");
var currentLocation = $("#current-location");
var currentTemperature = $("#temperature");
var currentHumdity = $("#current-humdity");
var currentWindSpeed = $("#current-windspeed");
var currentUvIndex = $("#uv-index");
var sLocation=[];


function find(c){ 
    for (var i=0; i<sLocation.length; i++){
        if(c.toUppercase()===sLocation[i]) //entries entered in the storage
    {
        return -1;
    }
}

// API Key
var apiKey = "c835f5e0d135d1c788e373d4a940d4e0";

//Fetching api data 
//api url: https://api.openweathermap.org/data/2.5/weather?q=&appid=c835f5e0d135d1c788e373d4a940d4e0
function currentWeather() {

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + inputBoxEl.value + "&appid=" + apiKey)
        .then(function (response) {
            if(response.ok) {
            return response.json()
            }
        })
//reference OpenWeather: https://openweathermap.org/api/one-call-api#how

var searchButton = $(".searchButton");

//Forloop for persisting the data onto HMTL page
for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);
    // console.log(localStorage.getItem("City"));
    var cityName = $(".list-group").addClass("list-group-item");

    cityName.append("<li>" + city + "</li>");
} 


// Need to do:

//THEN I am presented with current and future conditions for that city and that city is added to the search history

//WHEN I view current weather conditions for that city

//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index


