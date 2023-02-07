let now = new Date();

let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`
];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();

let dateNtime = document.querySelector(".time");
dateNtime.innerHTML = `${day} ${hour}:${minutes}`;

//

function displayForecast(response) {
    let forecast = response.data
    console.log(forecast)

    let forecastElement = document.querySelector(`.forecast`)

    let forecastHTML = ``
    days.forEach(function () {
        forecastHTML = forecastHTML + `
        <div class="col day1">
        <span class="forDay">${response.data.temp}<div>
        <img src="=" class="" id="foricon1" alt=""/></div>
        <div id="forTemp"></div></span>
        </div>`
        
        forecastElement.innerHTML = forecastHTML
    })
}

function getForecast(response) {
    console.log()
    
    
    let apiKey = `0bfb047178a74d99a6a6644374e89635`
    let apiUrl = 
    `https://api.weatherbit.io/v2.0/forecast/daily?lat=${response.lat}&lon=${response.lon}&key=${apiKey}&days=7`
    console.log(apiUrl)
    axios.get(apiUrl).then(displayForecast)
}

function displayTemperature(response) {
    let temp = document.querySelector(`.degrees`)
    let cityElement = document.querySelector(`.cityName`)
    let weather = document.querySelector(`.weather`)
    let humidity = document.querySelector(`.humidity`)
    let wind = document.querySelector(`.wind`)
    let iconElement1 = document.querySelector("#icon")
    
    celciusTemp = response.data.main.temp

    temp.innerHTML = Math.round(celciusTemp) + `°`
    cityElement.innerHTML = response.data.name
    weather.innerHTML = response.data.weather[0].description
    humidity.innerHTML = response.data.main.humidity + `%`
    wind.innerHTML = Math.round(response.data.wind.speed) + ` km/h`
    iconElement1.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`) 
    iconElement1.setAttribute("alt", response.data.weather[0].description)

    getForecast(response.data.coord)
}

function searchCity(city) {
    let apiKey = "aa22a14fd56b104013633441c49c48ee";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault()
    let formInputElement = document.querySelector(".formInput")
    searchCity(formInputElement.value)
}

function displayFahrenheit(event) {
    event.preventDefault()
    let tempElement = document.querySelector(".degrees")
    let fahrenheitTemp = (celciusTemp * 9) / 5 + 32
    tempElement.innerHTML = Math.round(fahrenheitTemp)
}

function displayCelsius(event) {
    event.preventDefault()
    let tempElement = document.querySelector(".degrees")
    tempElement.innerHTML = Math.round(celciusTemp) + `°`
}

//

let celciusTemp = null

let form = document.querySelector(".mainForm")
form.addEventListener("submit", handleSubmit)

let fahrenheit = document.querySelector("#fahrenheit")
fahrenheit.addEventListener("click", displayFahrenheit)

let celsius = document.querySelector("#celsius")
celsius.addEventListener("click", displayCelsius)

searchCity(`Lisbon`)





// https://api.weatherapi.com/v1/forecast.json/q=London

