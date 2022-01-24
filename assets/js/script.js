var APIKey = "fff5fbbef22e4f2a26a024f03d625dd6"; // Weather API Key (OpenWeather)

var cityInput = document.querySelector('#City-input'); //CityInput allows users to enter in city search
var searchButton = document.querySelector('#search-Btn'); // Enbles search
var currentForecast = document.querySelector('.current-forecast'); // GET current forcast in browser 
var fiveDayForecast = document.querySelector('.FiveDay'); // GET weather dat for 5 day forecast
var searchHistory = []; // City search array
var clearHistory = document.querySelector('#clear-history'); // Allows to clear out searches 

function getWeather(city) { // This functions fetches the weather data for city

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`, {  // Fetches city weather
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'follow'
    })

        .then(function (response) {
            return response.json();
        })
        .then(function (data) { // This function gets lat and lon data through Open Weather One Call API
            console.log(data);
            var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude={part}&appid=${APIKey}&units=imperial`

            fetch(oneCall)
                .then(function (response) {
                    return response.json();
                })
                .then(function (oneCallData) {
                    console.log(oneCallData);

                    var iconurl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

                    // This will display current city weather on the browser
                    // Includes Name of City, Date, and icon (Openweather)
                    // Includes UV,Wind Speed, and Humdity
                    currentForecast.innerHTML = `
                    <div class="cityName"><h3 id="city">${data.name} </h3>
                        <div id="current-date">(${moment(data.dt, 'X').format('MM/DD/YYYY')})
                        <img id="weather-icon" src='${iconurl}'>    
                        </div>                    
                    </div>
                    
                
                    <p class="current-city">Temp: <span id="temp-info">${data.main.temp} ${"&#176F"}</span></hp></p>
                    <p class="current-city">Wind Speed: <span id="wind-info">${data.wind.speed} MPH</span></p>
                    <p class="current-city">Humidity: <span id="humidity-info">${data.main.humidity} %</span></p>
                    <p class="current-city">UV Index: <span id="uv-index">${oneCallData.current.uvi}</span></p>
                    `
                    // Display city's forcast
                    //Includes city name, date, UV, wind speed, Humdity 
                    fiveDayForecast.innerHTML = ' '
                    for (let i = 1; i < 6; i++) {
                        var iconurl = "http://openweathermap.org/img/w/" + oneCallData.daily[i].weather[0].icon + ".png";

                        fiveDayForecast.innerHTML = fiveDayForecast.innerHTML + `<div class="day" id="box1">
                <p>${moment(oneCallData.daily[i].dt, 'X').format('MM/DD/YYYY')}</p>
                <img class="weather-img" src='${iconurl}'>
                </br>
                <p class="5day">Temp: <span class="5Day-temp">${oneCallData.daily[i].temp.day} ${"&#176F"} </span></p>
                <p class="5day">Wind Speed: <span class="5Day-wind">${oneCallData.daily[i].wind_speed} MPH</span></p>
                <p class="5day">Humidity: <span class="5Day-humid">${oneCallData.daily[i].humidity} %</span></p>
            
                </div>`
                    }
                    let uvIndexColor = document.querySelector('#uv-index');
                    if (oneCallData.current.uvi <= 2) {
                        uvIndexColor.setAttribute('class', 'badge badge-success');
                    } else if (oneCallData.current.uvi > 2 && oneCallData.current.uvi < 8) {
                        uvIndexColor.setAttribute('class', 'badge badge-warning');

                    } else {
                        uvIndexColor.setAttribute('class', 'badge badge-dangerous')
                    }
                });

        });
}

function find(c) {
    for (var i = 0; i < searchHistory.length; i++) {
        if (c.toUpperCase() === searchHistory[i]) {
            return -1;
        }
    }
    return 1;
}

// This will allow city search to be listed 
searchButton.addEventListener('click', function (e) {
    getWeather(cityInput.value);
    e.preventDefault();

    var city = $('#City-input').val().trim();
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        var searchedCity = $(`
             <li class='search-list-group-item'>${city}</li>
             `);
        $('#search-history').append(searchedCity);
    };

    // Communicates to the console of the search
    localStorage.setItem('city', JSON.stringify(searchHistory));

})

$(document).on('click', '.search-list-group-item', function () {
    var listCity = $(this).text();
    getWeather(listCity);
})

$(document).ready(function () {
    var searchCityHistoryArr = JSON.parse(localStorage.getItem('city'));
    if (searchCityHistoryArr !== null) {
        var lastSearchIndex = searchCityHistoryArr.length - 1;
        var lastSearchCity = searchCityHistoryArr[lastSearchIndex];
        getWeather(lastSearchCity);
    }
})

// Clears out search history
clearHistory.addEventListener('click', function (e) {
    if (localStorage.length > 0) {
        $('.search-list-group-item').html('');
    }
    localStorage.clear();
})

//ACCEPTANCE CRITERIA
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city