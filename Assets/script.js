const APIkey = "ea2b538737d3156f8faf781f1d84c678";

const userCity = document.querySelector("#userCity");
const searchBtn = document.querySelector("#searchBtn");
const currentWeather = document.querySelector("#currentWeather");
const fiveDayContainer = document.querySelector("#fiveDayForecast");

function search(event) {
  event.preventDefault();
  let city = userCity.value.trim().toLowerCase();
  if (city == "" || city == null) {
    alert("Please enter a city");
    return;
  }
  cityGeo(city);
}

function cityGeo(city) {
  var geoAPI = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;
  fetch(geoAPI)
    .then((response) => response.json())
    .then(function (data) {
      console.log("Geo Data", data);
      console.log("data lat:", data.coord.lat);
      console.log("data lon:", data.coord.lon);
      getWeather(data.coord.lat, data.coord.lon);
      get5Day(data.coord.lat, data.coord.lon);
    });
}

function getWeather(lat, lon) {
  var weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`;
  fetch(weatherAPI)
    .then((response) => response.json())
    .then(function (data) {
      console.log("Weather Data", data);
      displayWeather(data);
    });
}

function get5Day(lat, lon) {
  var fiveDayAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`;
  fetch(fiveDayAPI)
    .then((response) => response.json())
    .then(function (data) {
      console.log("5 Day Data", data);
      display5Day(data);
    });
}

function displayWeather(data) {
  var cityWeather = document.createElement("div");
  cityWeather.innerHTML = `<div class="today">
  <div class="todayDirection">
  <h2>${data.name}</h2>
  <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon" />
  </div>
  <h3>Current Weather</h3>
  <ul class="todayDetails">
  <li> Temperature: ${data.main.temp}°F</li>
  <li> Humidity: ${data.main.humidity}%</li>
  <li> Wind Speed: ${data.wind.speed} MPH</li>
  <li> Description: ${data.weather[0].description}</li>
  
  </ul>
  </div>`;
  currentWeather.append(cityWeather);
}
function display5Day(data) {
  var fiveDay = document.createElement("div");
  fiveDay.innerHTML = `<div class="fiveDay row">
                                <h2>5 Day Forecast</h2>
                                <div class="card day1">
                                    <h3>${data.list[0].dt_txt}</h3>
                                    <img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png" alt="weather icon" />
                                    <ul>
                                        <li>Temperature: ${data.list[0].main.temp}°F</li>
                                        <li>Humidity: ${data.list[0].main.humidity}%</li>
                                    </ul>
                                </div>
                                <div class="card day2">
                                    <h3>${data.list[1].dt_txt}</h3>
                                    <img src="http://openweathermap.org/img/wn/${data.list[1].weather[0].icon}.png" alt="weather icon" />
                                    <ul>
                                        <li>Temperature: ${data.list[1].main.temp}°F</li>
                                        <li>Humidity: ${data.list[1].main.humidity}%</li>
                                    </ul>
                                </div>
                                <div class="card day3">
                                    <h3>${data.list[2].dt_txt}</h3>
                                    <img src="http://openweathermap.org/img/wn/${data.list[2].weather[0].icon}.png" alt="weather icon" />
                                    <ul>
                                        <li>Temperature: ${data.list[2].main.temp}°F</li>
                                        <li>Humidity: ${data.list[2].main.humidity}%</li>
                                    </ul>
                                </div>
                                <div class="card day4">
                                    <h3>${data.list[3].dt_txt}</h3>
                                    <img src="http://openweathermap.org/img/wn/${data.list[3].weather[0].icon}.png" alt="weather icon" />
                                    <ul>
                                        <li>Temperature: ${data.list[3].main.temp}°F</li>
                                        <li>Humidity: ${data.list[3].main.humidity}%</li>
                                    </ul>
                                </div>
                                <div class="card day5">
                                    <h3>${data.list[4].dt_txt}</h3>
                                    <img src="http://openweathermap.org/img/wn/${data.list[4].weather[0].icon}.png" alt="weather icon" />
                                    <ul>
                                        <li>Temperature: ${data.list[4].main.temp}°F</li>
                                        <li>Humidity: ${data.list[4].main.humidity}%</li>
                                    </ul>
                                </div>
                            </div>`;
  fiveDayContainer.appendChild(fiveDay);
}

searchBtn.addEventListener("click", search);
