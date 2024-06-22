let processData = {};
const apiKey = "coloque sua chave";
document.getElementById('searchButton').addEventListener('click', async() => {
    await getTime();

    if (processData.name){
        let info = {
            cityName: processData.name,
            temperature: processData.main.temp,
            description: processData.weather[0].description,
            humidity: processData.main.humidity,
            wind: processData.wind.speed,
            icon: processData.weather[0].icon
        }

        console.log(info)
        displayTime(info);
    }
})

async function getTime(info){
    console.log(info)
    const city = document.getElementById('cityInput').value;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
    const errorMessage = document.getElementById('errorMessage');

    try {
        const response = await fetch(url);
        if(!response.ok){
            console.log("error fecthing data");
        }

        const data = await response.json();
        processData = data;
        console.log(processData)

    } catch (error) {
        console.error("error fetch: ", error)
        errorMessage.classList.remove('hidden');
    }
}

function displayTime(info){
    const weatherDiv = document.getElementById('weatherInfo');
    const weatherIcon = document.getElementById('weatherIcon');

    weatherDiv.innerHTML = `
        <h2 id="cityName">${info.cityName}</h2>
        <p id="temperature">Temperatura: ${info.temperature}°C</p>
        <p id="description">Descrição: ${info.description}</p>
        <p id="humidity">Humidade: ${info.humidity}%</p>
        <p id="wind">Vento: ${info.wind} m/s</p>
        <img id="weatherIcon" src="https://openweathermap.org/img/wn/${info.icon}.png" alt="Weather Icon">
    `;

    weatherDiv.classList.remove('hidden');
    document.getElementById('errorMessage').classList.add('hidden');
}