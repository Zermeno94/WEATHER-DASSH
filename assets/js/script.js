// API Key
var apiKey = "fde9c903c898c317388e65c683b198c3";

var searchButton =$(".searchButton");

//Fetching api data 
//api url: https://api.openweathermap.org/data/2.5/weather?q=&appid=fde9c903c898c317388e65c683b198c3
function currentWeather() {

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + inputBoxEl.value + "&appid=" + apiKey)
        .then(function (response) {
            if(response.ok) {
            return response.json()
            }
        })
//reference OpenWeather: https://openweathermap.org/api/one-call-api#how

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


