function update(description, temp, humidity, conditions){
    const elements = document.querySelector("div");
    const temperature = document.createElement("p");
    temperature.textContent = "Temperature: " + temp;
    const hum = document.createElement("p");
    hum.textContent = "Humidity: " + humidity;
    const cond = document.createElement("p");
    cond.textContent = "Conditions: " + conditions;
    const desc = document.createElement("p");
    desc.textContent = description;
    elements.appendChild(temperature);
    elements.appendChild(hum);
    elements.appendChild(cond);
    elements.appendChild(desc);
}

async function getWeatherData(location){
    try{
        const api = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location + "?key=XWC43G847KP2G22E3X2ERW6YQ");
        const weatherData = await api.json();
        update(weatherData.description, weatherData.currentConditions.temp, weatherData.currentConditions.humidity, weatherData.currentConditions.conditions);
    } catch (e){
        console.log(e);
    }
}

const form = document.querySelector("form");
form.addEventListener("submit", function(e){
    e.preventDefault();
    const location = document.querySelector("#location");
    if(location.validity.valid) getWeatherData(location.value);
    else console.log("invalid input");
});