import playList from "./playList.js";

const timeElement = document.querySelector('.time');
const dateElement = document.querySelector('.date');
const greetingElement = document.querySelector('.greeting')
const nameElement = document.querySelector('.name');
const body = document.querySelector('body');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
const weatherIcon = document.querySelector('.weather-icon');
const temperatureElement = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const cityElement = document.querySelector('.city');
const windElement = document.querySelector('.wind');
const humidityElement = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const quoteElement = document.querySelector('.quote');
const authorElement = document.querySelector('.author');
const changeQuoteButton = document.querySelector('.change-quote');
const playButton = document.querySelector('.play');
const playPrevButton = document.querySelector('.play-prev');
const playNextButton = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);
cityElement.addEventListener('change', getWeather);
changeQuoteButton.addEventListener('click', getQuotes);
playButton.addEventListener('click', playAudio);
playButton.addEventListener('click', togglePauseButton);
playPrevButton.addEventListener('click', playPrevAudio);
playPrevButton.addEventListener('click', togglePauseButton);
playNextButton.addEventListener('click', playNextAudio);
playNextButton.addEventListener('click', togglePauseButton);

let randomNum;
let isPlay = false;
let currentSoundNumber = 0;

const audio = new Audio();

function showTime() {
    const date = new Date();
    timeElement.textContent = date.toLocaleTimeString();
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
}

function showDate() {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' };
    dateElement.textContent = date.toLocaleDateString('en-US', options);
}

function showGreeting() {
    const timeOfDay = getTimeOfDay();
    greetingElement.textContent = `Good ${timeOfDay}`;
}

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 6) {
        return 'night';
    }

    if (hours < 12) {
        return 'morning';
    }

    if (hours < 18) {
        return 'afternoon';
    }

    return 'evening';
}

function setLocalStorage() {
    localStorage.setItem('name', nameElement.value);
    localStorage.setItem('city', cityElement.value);
}

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        nameElement.value = localStorage.getItem('name');
    }

    if (localStorage.getItem('city')) {
        cityElement.value = localStorage.getItem('city');
    }
}

function getRandomNum(min, max) {
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
}

function setBg() {
    const timeOfDay = getTimeOfDay();
    const bgNum = randomNum.toString().padStart(2, '0');
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/NatUsik6/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => body.style.backgroundImage = `url(${img.src})`;
}

function getSlideNext() {
    randomNum = randomNum == 20 ? 1 : randomNum + 1;
    setBg();
}

function getSlidePrev() {
    randomNum = randomNum == 1 ? 20 : randomNum - 1;
    setBg();
}

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityElement.value}&lang=en&appid=86a24c617fcfd3d6633d7cc16a4db1fc&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    weatherIcon.className = 'weather-icon owf';
    if (typeof (data.cod) == 'string') {
        weatherError.textContent = data.message;
        temperatureElement.textContent = '';
        weatherDescription.textContent = '';
        windElement.textContent = '';
        humidityElement.textContent = '';
        return;
    }

    weatherError.textContent = '';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperatureElement.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    windElement.textContent = `${data.wind.speed.toFixed(0)} m/s`;
    humidityElement.textContent = `${data.main.humidity.toFixed(0)}%`;
}

async function getQuotes() {
    const quotes = 'resources/quotes.json';
    const response = await fetch(quotes);
    const data = await response.json();
    const quoteNumber = Math.floor(Math.random() * data.length);
    quoteElement.textContent = data[quoteNumber].quote;
    authorElement.textContent = data[quoteNumber].author;
}

function playAudio() {
    if (isPlay) {
        isPlay = false;
        audio.pause();
        return;
    }

    isPlay = true;
    setPlayItemActive();
    audio.src = playList[currentSoundNumber].src;
    audio.currentTime = 0;
    audio.play();
}

function playPrevAudio() {
    currentSoundNumber = currentSoundNumber == 0 ? playList.length - 1 : currentSoundNumber - 1;
    isPlay = false;
    playAudio();
}

function playNextAudio() {
    currentSoundNumber = currentSoundNumber == playList.length - 1 ? 0 : currentSoundNumber + 1;
    isPlay = false;
    playAudio();
}

function togglePauseButton() {
    if (isPlay && !playButton.classList.contains('pause')) {
        playButton.classList.add('pause');
    }

    if (!isPlay) {
        playButton.classList.remove('pause');
    }
}

function getPlayList() {
    playList.forEach(sound => {
        const li = document.createElement('li');
        li.classList.add('play-item');
        li.textContent = sound.title;
        playListContainer.append(li);
    });
}

function setPlayItemActive() {
    let prevPlayItem = document.querySelector('.item-active');
    if (prevPlayItem != null) {
        prevPlayItem.classList.remove('item-active');
    }
    
    let playItem = document.querySelector(`.play-item:nth-child(${currentSoundNumber + 1})`);
    playItem.classList.add('item-active');
}

getPlayList();
getQuotes();
getWeather();
getRandomNum(1, 20);
setBg();
showTime();