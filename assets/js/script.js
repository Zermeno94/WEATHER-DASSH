var weatherAPIKey = "fff5fbbef22e4f2a26a024f03d625dd6";
var cityInput = document.querySelector('#City-input');
var searchButton = document.querySelector('#search-Btn');
var currentForecast = document.querySelector('.current-forecast');
var fiveDay = document.querySelector('.FiveDay');
var searchHistoryList = [];
var clearButton = document.querySelector('#clear-history');

function getWeather(city) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}&units=imperial`, {
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'follow'
    })

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude={part}&appid=${weatherAPIKey}&units=imperial`

            fetch(oneCall)
                .then(function (response) {
                    return response.json();
                })
                .then(function (oneCallData) {
                    console.log(oneCallData);

                    var iconurl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

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
                    fiveDay.innerHTML = ''
                    for (let i = 1; i < 6; i++) {
                        var iconurl = "http://openweathermap.org/img/w/" + oneCallData.daily[i].weather[0].icon + ".png";

                        fiveDay.innerHTML = fiveDay.innerHTML + `<div class="day" id="box1">
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
    for (var i = 0; i < searchCityList.length; i++) {
        if (c.toUpperCase() === searchCityList[i]) {
            return -1;
        }
    }
    return 1;
}

searchButton.addEventListener('click', function (e) {
    getWeather(cityInput.value);
    e.preventDefault();

    var city = $('#City-input').val().trim();
    if (!searchHistoryList.includes(city)) {
        searchHistoryList.push(city);
        var searchedCity = $(`
             <li class='search-list-group-item'>${city}</li>
             `);
        $('#search-history').append(searchedCity);
    };

    localStorage.setItem('city', JSON.stringify(searchHistoryList));

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

clearButton.addEventListener('click', function (e) {
    if (localStorage.length > 0) {
        $('.search-list-group-item').html('');
    }
    localStorage.clear();
})