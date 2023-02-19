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

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000)
    let day = date.getDay()
    let days = ["Thu","Fri","Sat","Sun","Mon","Tue","Wed",]

    return days[day]
}

function displayForecast(response) {
    let forecast = response.data.daily

    let forecastElement = document.querySelector(`.forecast`)

    forecast.shift()
    forecast.shift()
    forecast.shift()
    forecast.shift()

    let forecastHTML = `<div class="row">`
    let days = ["Thu", "Fri", "Sat"] 
    forecast.forEach(function (forecastDay) {
        forecastHTML = 
         forecastHTML + `
         <div class="col forecastAll">
          <div class="col days">
            <div class="date">${formatDay(forecastDay.time)}</div>
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"
            alt=""
            width="42"
            />
            <div class="row temps">
             <span class="col temp-max">${Math.round(forecastDay.temperature.maximum)}°</span>
             <span class="col temp-min">${Math.round(forecastDay.temperature.minimum)}°</span>
          </div>
         </div>
        </div>
        `;
    })  
    

    forecastElement.innerHTML = forecastHTML

}

function getForecast(response) {
    let city = document.querySelector(`.formInput`)
    city.innerHTML = response.city 
    let cityName = response.data.city
    let apiKey = `bdb7a420b2at3ebf15683167248o3512`
    let apiUrl = 
    `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayForecast)
}

function displayTemperature(response) {
    
    let temp = document.querySelector(`.degrees`)
    let cityElement = document.querySelector(`.cityName`)
    let weather = document.querySelector(`.weather`)
    let humidity = document.querySelector(`.humidity`)
    let wind = document.querySelector(`.wind`)
    let iconElement1 = document.querySelector("#icon")
    
    let celciusTemp = response.data.temperature.current

    temp.innerHTML = Math.round(celciusTemp) + `°`
    cityElement.innerHTML = response.data.city
    weather.innerHTML = response.data.condition.description
    humidity.innerHTML = response.data.temperature.humidity + `%`
    wind.innerHTML = Math.round(response.data.wind.speed) + ` km/h`
    iconElement1.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`) 
    iconElement1.setAttribute("alt", response.data.condition.description)

    getForecast(response)
}

function searchCity(response) {
    let city = response
    let apiKey = `bdb7a420b2at3ebf15683167248o3512`;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    
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


let form = document.querySelector(".mainForm")
form.addEventListener("submit", handleSubmit)

let fahrenheit = document.querySelector("#fahrenheit")
fahrenheit.addEventListener("click", displayFahrenheit)

let celsius = document.querySelector("#celsius")
celsius.addEventListener("click", displayCelsius)


searchCity(city=`Lisbon`)





// https://api.weatherapi.com/v1/forecast.json/q=London

// ${response.data.daily.temperature}

// `<div class="col day1"> <span class="forDay"><div> <img src="=" class="" id="foricon1" alt=""/></div> <div id="forTemp"></div></span> </div>`

// Math.round{forecast[0].temperature.maximum}°