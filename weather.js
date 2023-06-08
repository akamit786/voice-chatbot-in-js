var api_key = '6e7ec8e33eb1b1b4216ed1b0f5404030'
var btn = document.getElementById('btn')
var input = document.getElementById('input_field')
var city = document.getElementById('city')
var temp = document.getElementById('temp')
var humidity = document.getElementById('humidity')
var wind = document.getElementById('Wind')
var maxtemp = document.getElementById('maxtemp')
var icon = document.getElementById('icon')

var myapi = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${api_key}&units=metric`)
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        city.innerHTML = data.name
        temp.innerHTML = `${ Math.trunc(data.main.temp)}°C`
        humidity.innerHTML = `${data.main.humidity}%rh`
        wind.innerHTML = `${Math.trunc(data.wind.speed)}km/h`
        maxtemp.innerHTML = `${Math.trunc(data.main.temp_max)}°C`
        icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icons">`
        input.value = ""
    }).catch((err)=>{
        console.log(err)
    })
}
btn.addEventListener('click',myapi)
function updateHeader() {
    var headerElement = document.getElementById("header");
    var locationElement = document.getElementById("location");
    var datetimeElement = document.getElementById("datetime");
    var now = new Date();
  
    // Update location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var url = "https://api.geoapify.com/v1/geocode/reverse?lat=" + latitude + "&lon=" + longitude + "&apiKey=2831a342669941e08fbb93a94c374f71";
        fetch(url)
          .then(response => response.json())
          .then(data => {
            var location = data.features[0].properties.formatted;
            locationElement.innerHTML = "You are from " + location;
          })
          .catch(error => console.error(error));
      });
    } else {
      locationElement.innerHTML = "Geolocation is not supported by this browser.";
    }
    
  
    // Update date and time
    datetimeElement.innerHTML = "Today is " + now.toLocaleDateString() + " " + now.toLocaleTimeString();
  }
  
  updateHeader();
  setInterval(updateHeader, 500000);
  // Get user's current location
navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
  
    // Fetch weather data using OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=2831a342669941e08fbb93a94c374f71&units=metric`)
      .then(response => response.json())
      .then(data => {
        // Display weather data in HTML elements
        const temperatureElement = document.getElementById('temp');
        const cityElement = document.getElementById('city');
        const iconElement = document.getElementById('icon');
        const humidityElement = document.getElementById('humidity');
        const windElement = document.getElementById('Wind');
        const maxTempElement = document.getElementById('maxtemp');
  
        temperatureElement.innerHTML = Math.round(data.main.temp) + '&#8451;';
        cityElement.innerHTML = data.name;
        iconElement.innerHTML = `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"/>`;
        humidityElement.innerHTML = data.main.humidity + '%';
        windElement.innerHTML = data.wind.speed + 'm/s';
        maxTempElement.innerHTML = Math.round(data.main.temp_max) + '&#8451;';
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  });
  function setName() {
    var name = document.getElementById("nameInput").value;
    var greeting = document.getElementById("greeting");
    greeting.innerHTML = "Hello, " + name + "!";
  }