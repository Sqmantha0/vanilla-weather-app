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

function displayTemperature(response) {
    let temp = document.querySelector(`.degrees`)
    let cityElement = document.querySelector(`.cityName`)
    let weather = document.querySelector(`.weather`)
    let humidity = document.querySelector(`.humidity`)
    let wind = document.querySelector(`.wind`)
    temp.innerHTML = Math.round(response.data.main.temp) + `°`
    cityElement.innerHTML = response.data.name
    weather.innerHTML = response.data.weather[0].description
    humidity.innerHTML = response.data.main.humidity + `%`
    wind.innerHTML = Math.round(response.data.wind.speed) + ` km/h`
    console.log(response)
}

let apiKey = "aa22a14fd56b104013633441c49c48ee";
let city = `Kyiv`
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

function displayInfo() {
    let temp = document.querySelector(`.degrees`)
    tempElement.innerHTML = response.data.main.temp
    console.log(temp)
}