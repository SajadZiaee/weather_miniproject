const textCityName = document.getElementById('city-name');
const textWeatherStatus = document.getElementById('text-weather-status');
const imageWeatherStatus = document.getElementById('image-weather-status');
const textTemp = document.getElementById('text-temp');
const textPressure = document.getElementById('text-pressure');
const textWet = document.getElementById('text-wet');
const textWind = document.getElementById('text-wind');
const textLatlng = document.getElementById('text-latlng');
const inputState = document.getElementById('input-state');
const inputCity = document.getElementById('input-city');
const btnGetData = document.getElementById('btn-get-data');
const toastError = document.getElementById('error-toast')

const API_KEY = '4a38106c71b60a4b186cef9938954621';


getCityAndStateFromLocalStorage();



loadEventListeners();
function loadEventListeners() {
    btnGetData.addEventListener('click', function () {
        getDataFromAPI(inputState.value, inputCity.value);
    });
}


async function getDataFromAPI(state, city) {
    //TODO: wrap it in try catch 

    try {
        let tmp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${API_KEY}&lang=fa`)
        // console.log(tmp);
        let information = await tmp.json();
        // console.log(information);
        if (Number(information.cod) >= 400) {
            // console.log('asdf');
            throw Error('message');
        }
        const description = information.weather[0].description;
        const iconName = information.weather[0].icon;
        const temp = (information.main.temp - 272.15).toFixed(2);
        const tempMin = (information.main.temp_min - 272.15).toFixed(2);
        const tempMax = (information.main.temp_max - 272.15).toFixed(2);
        const pressure = information.main.pressure;
        const wet = information.main.humidity;
        const wind = information.wind.speed;
        const lat = information.coord.lat;
        const lng = information.coord.lon;

        textCityName.textContent = city;
        textWeatherStatus.textContent = description;
        imageWeatherStatus.setAttribute('src', `http://openweathermap.org/img/wn/${iconName}.png`);
        textTemp.textContent = `دما(سانتی‌گراد): ${temp}   کمترین دما: ${tempMin}   بیشترین دما: ${tempMax}`;
        textPressure.textContent = `فشار هوا: ${pressure}`;
        textWet.textContent = `رطوبت: ${wet}`;
        textWind.textContent = `سرعت باد: ${wind}`;
        textLatlng.textContent = `عرض جغرافیایی: ${lat}   طول جغرافیایی: ${lng}`;
        saveCityAndStateToLocalStorage(state, city);

    } catch (e) {
        console.log(state);
        var toast = new bootstrap.Toast(toastError);
        toast.show();
    }

}
function getCityAndStateFromLocalStorage() {
    let stored = JSON.parse(localStorage.getItem('province'));
    console.log('asfdsfad');
    console.log(stored);
    let city = 'تهران';
    let state = 'تهران';
    if (stored === null) {
        state = 'تهران';
        city = 'تهران';
    }
    else {
        state = stored.state;
        city = stored.city;
    }
    console.log(state);
    getDataFromAPI(state, city);
}
function saveCityAndStateToLocalStorage(state, city) {
    localStorage.clear();
    let province = { 'state': state, 'city': city };
    localStorage.setItem('province', JSON.stringify(province));
}