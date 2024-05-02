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

