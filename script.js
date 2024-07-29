
let currentUnit = 'metric'; // Default to Celsius
const apiKey="907ab5168a98578229e70b711d69422f";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=" + currentUnit + "&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather-icon");
const loadingElement = document.querySelector(".loading");

function toggleUnit(element) {
    currentUnit = element.value;
    apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=" + currentUnit + "&q=";
    const city = document.querySelector(".city").innerText;
    checkWeather(city);
}
async function checkWeather(city) {
    loadingElement.style.display = "block";
    document.querySelector(".weather").style.display = "none";

    const response = await fetch(apiUrl +  city +`&appid=${apiKey}`);

    if(response.status==404){
        document.querySelector(".error").style.display="block"
        document.querySelector(".weather").style.display="none"
    } else {
        var data = await response.json(); 
        console.log(data)

        document.querySelector(".city").innerHTML=data.name;
        document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"°" + (currentUnit === 'metric' ? 'C' : 'F');
        document.querySelector(".humidity").innerHTML=data.main.humidity+"%";
        document.querySelector(".wind").innerHTML=data.wind.speed+"km/h";
        document.querySelector(".description").innerHTML=data.weather[0].description;

        if(data.weather [0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        }
        else if(data.weather [0].main == "Clear"){
            weatherIcon.src = "images/clear.png";
        }
        else if(data.weather [0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        }
        else if(data.weather [0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png";
        }
        else if(data.weather [0].main == "Mist"){
            weatherIcon.src = "images/mist.png";
        }
        document.querySelector(".weather").style.display="block";
    }

    loadingElement.style.display = "none";
}

searchBtn.addEventListener("click", ()=>{
    const searchInput = document.querySelector(".search input").value;
    checkWeather(searchInput);
})
