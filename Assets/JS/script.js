// variables
const searchBtn = $(".searchBtn");
const apiKey = "28bd17d184ee4d249b20dfcdb9e186c1";
let keyCount = 0;

// function to display current weather information
function displayCurrentWeather(response) {
    const weatherCard = $(".wcard").empty().addClass("card-con");
    const name = $("<p>").text(`${response.name} ${new Date(response.dt * 1000).toLocaleDateString("en-US")}`);
    name.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
    const temp = $("<p>").text(`Temp: ${response.main.temp} °F`);
    const wind = $("<p>").text(`Wind: ${response.wind.speed} MPH`);
    const humidity = $("<p>").text(`Humidity: ${response.main.humidity} %`);

    weatherCard.append(name, temp, wind, humidity);  
}

// function to display 5-day forecast
function displayForecast(response) {
    const dayIndices = [0, 8, 16, 24, 32];
    const forecast = $(".weekcast").empty().addClass("card-text");

    dayIndices.forEach((i) => {
        const date = new Date(response.list[i].dt * 1000).toLocaleDateString("en-US");
        const icon = `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">`;
        const temperature = `Temp: ${response.list[i].main.temp} °F`;
        const windspeed = `Wind: ${response.list[i].wind.speed} MPH`;
        const humidity = `Humidity: ${response.list[i].main.humidity} %`;

        const dayWeather = $("<div>").addClass("forecastyle").html(`<p>${date}</p>${icon}<p>${temperature}</p><p>${windspeed}</p><p>${humidity}</p>`);

        forecast.append(dayWeather);
    });
}

// function to handle displaying weather for a specific city
function displayCityWeather(cityName) {
    const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

    $.get(urlCurrent, function (response) {
        displayCurrentWeather(response);
    }).fail(function (error) {
        console.log("Error displaying weather data: " + error);
    });

    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&Appid=${apiKey}&units=imperial`;

    $.get(urlForecast, function (response) {
        displayForecast(response);
    });
}

// click event handler for li elements
$(document).on("click", ".city-name", function () {
    const cityName = $(this).text().trim();
    displayCityWeather(cityName);
});

// search button click event
searchBtn.click(() => {
    const searchInput = $(".searchInput").val();

    if (searchInput === "") {
        console.log(searchInput);
    } else {
        displayCityWeather(searchInput);

// add the new city to list
        const cityName = $("<li>").text(searchInput).addClass("city-name list-group-item");
        $(".list-group").append(cityName);

        localStorage.setItem(keyCount, searchInput);
        keyCount++;
    }
});