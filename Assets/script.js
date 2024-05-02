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

