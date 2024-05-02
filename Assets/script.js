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


searchBtn.addEventListener("click", search);
