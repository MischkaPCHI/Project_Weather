const nextDays = document.querySelector('.future-weather');
const forecast = document.querySelector('.future-info')
const time = document.querySelector('.main-date');
const actualDate = document.querySelector('#date');
const img = document.querySelector('img');
const weatherDescription = document.querySelector('.weather-description');
const locations = document.querySelector('.location');
const tempInfo = document.querySelector('.temperature');


const cityInput = document.querySelector('input');
const searchButton = document.querySelector('button');

let cityID;

const inputField = (event) => {
    cityID = event.target.value;
}

const searchButtonHandler = (event) => {
    console.log(cityID);
    event.preventDefault();
    if(!cityID || cityID === '') {
        alertSound.play();
        alert("Лооооох!");
    }else{
    cityInput.textContent = cityID;
    serverWork();
    forecast.innerHTML = '';
    }
}

cityInput.addEventListener('input', inputField);
searchButton.addEventListener("click", searchButtonHandler);

const serverWork = async () => {
    const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=35850dacb6a54f5c8db102528240603&q=' + cityID + '&days=6&aqi=no&alerts=no');
    const body = await response.json();
    console.log(body);

    timeAndDate(body);
    city(body);
    weather(body);
    temp(body);
    icon(body);
    date();

    const futureDays = await body;
    const weatherData = futureDays.forecast.forecastday;

    console.log(weatherData);
    blah(weatherData);
};
    
function blah(arr) {
    const days = [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun'
    ];
    for (let element of arr) {
        
        const futureDay = (new Date(element.date)).getDay();
        const nextDaysDay = Object.assign(document.createElement('p'), {className : 'day'});
        const nextDaysTempNight = Object.assign(document.createElement('p'), {className: 'temp-night'});
        const nextDaysTempDay = Object.assign(document.createElement('p'), { className: 'temp-day' });
        const nextDaysImgs = Object.assign(document.createElement('img'), {className :'mini-imgs'});
        const nextDays = Object.assign(document.createElement('div'), {className :'future-weather'});

        nextDaysTempDay.textContent = element.day.maxtemp_c + '°C';
        nextDaysTempNight.textContent = element.day.mintemp_c + '°C';
        nextDaysDay.textContent = days[futureDay];
        nextDaysImgs.src = element.day.condition.icon;
        nextDays.append(nextDaysImgs, nextDaysDay, nextDaysTempDay, nextDaysTempNight);
        forecast.append(nextDays);        
    };
}

const timeAndDate = (locationTime) => {
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    const date = new Date(locationTime.location.localtime).getDay();
    time.textContent = days[date];
}

const city = (city) => {
    locations.textContent = city.location.name;
}

const weather = (weather) => {
    weatherDescription.textContent = weather.current.condition.text;
}

const temp = (temp) => {
    tempInfo.textContent = temp.current.temp_c + '°C';
}

const icon = (icon) => {
    img.src = icon.current.condition.icon;
}

const date = () => {

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'November',
        'December',
    ]

    const dayDate = new Date().getDay();
    const monthDate = new Date().getMonth();

    actualDate.textContent = dayDate + ', ' + months[monthDate];
}

cityInput.addEventListener('input', inputField);
searchButton.addEventListener("click", searchButtonHandler);
