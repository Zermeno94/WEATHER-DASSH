// API Key
var apiKey = "fde9c903c898c317388e65c683b198c3";

//api url: https://api.openweathermap.org/data/2.5/weather?q=&appid=fde9c903c898c317388e65c683b198c3

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

var queryURLFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey;


//reference OpenWeather: https://openweathermap.org/api/one-call-api#how

//Forloop for persisting the data onto HMTL page

for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);
    // console.log(localStorage.getItem("City"));
    var cityName = $(".list-group").addClass("list-group-item");

    cityName.append("<li>" + city + "</li>");
}

//NEED TO DO: 
//GIVEN a weather dashboard with form inputs
//WHEN I search for a city
//THEN I am presented with current and future conditions for that city and that city is added to the search history
//WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//WHEN I view the UV index
//THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
//WHEN I view future weather conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//WHEN I click on a city in the search history
//THEN I am again presented with current and future conditions for that city
//