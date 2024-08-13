const API_KEY = "02f15d7d943c547b401971e975e7c6e4";

const fetchingData = async () => {
    const query = document.querySelector("#query").value;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&lang=pt_br&appid=${API_KEY}`);
        const data = await response.json();

        if (data.cod == 200) {
            document.querySelector(".not-found-message").style.display = "none";
            document.querySelector(".required-location-message").style.display = "none";
            document.querySelector(".box-content").style.display = "block";
            loadingData({
                city: data.name,
                icon: data.weather[0].icon,
                temp: data.main.temp,
                description: data.weather[0].description,
                tempMax: data.main.temp_max,
                tempMin: data.main.temp_min,
                humidity: data.main.humidity,
                wind: data.wind.speed
            })
        } else {
            document.querySelector(".box-content").style.display = "none";
            document.querySelector(".required-location-message").style.display = "none";
            document.querySelector(".not-found-message").style.display = "block";
        }
    } catch (error) {
        document.querySelector(".not-found-message").style.display = "block";
    }
}

const getUserLocationData = async (coords) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&lang=pt_br&appid=${API_KEY}`);
    const data = await response.json();
    if(data){
        document.querySelector(".required-location-message").style.display = "none";
        document.querySelector(".box-content").style.display = "block";
        loadingData({
            city: data.name,
            icon: data.weather[0].icon,
            temp: data.main.temp,
            description: data.weather[0].description,
            tempMax: data.main.temp_max,
            tempMin: data.main.temp_min,
            humidity: data.main.humidity,
            wind: data.wind.speed
        })
    }
}

const loadingData = (data) => {
    document.querySelector(".box-temp img").src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
    document.querySelector(".temp-value").innerHTML = `${data.temp.toFixed(0)}°C`;
    document.querySelector(".description").innerHTML = `${data.description}`;
    document.querySelector(".box-content .city-name").innerHTML = `<i class="fa-solid fa-location-dot"></i> ${data.city}`;
    document.querySelector(".temp-max").innerHTML = `${data.tempMax.toFixed(0)}°C`;
    document.querySelector(".temp-min").innerHTML = `${data.tempMin.toFixed(0)}°C`;
    document.querySelector(".humidity").innerHTML = `${data.humidity.toFixed(0)}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.toFixed(0)}km/h`;
}

const fetchButton = document.getElementById("fetch-btn");
fetchButton.addEventListener("click", fetchingData)

const inputElement = document.querySelector("#query");
inputElement.addEventListener("keydown", function(event){
    if(event.key == "Enter"){
        fetchingData();
    }
})

const getLocationButton = document.getElementById("get-current-location");
getLocationButton.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition((GeolocationPosition) => {
        getUserLocationData(GeolocationPosition.coords);
    }, (GeolocationPositionError) => {
        document.querySelector(".box-content").style.display = "none";
        document.querySelector(".not-found-message").style.display = "none"
        document.querySelector(".required-location-message").style.display = "block"
    })
})