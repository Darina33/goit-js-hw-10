import { getCountries } from './fetchCountries.js';
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const debounce = require('lodash.debounce');
const input = document.getElementById("search-box");
const countryList = document.querySelector(".country-list")
const countryInfo = document.querySelector(".country-info")
const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    e.preventDefault();
    const inputValue = input.value.trim();

    if (inputValue === '') { countryList.innerHTML = ''; return };

    getCountries(inputValue)
        .then((fields) => {
            if (fields.length > 10) {
                Notify.info("Too many matches found. Please enter a more specific name.")
            } else if (fields.length >= 2) {
                const markup = fields.reduce((markup, field) => markup + createMarkupList(field), "");
                updateNewsList(markup);
                countryInfo.innerHTML = ''
            } else if (fields.length === 1) { const markup = fields.reduce((markup, field) => markup + createMarkupInfo(field), "");
                updateNewsInfo(markup);
                countryList.innerHTML = ''
            } else {Notify.failure("Oops, there is no country with that name");}
            }).catch(onError)
}

function updateNewsList(markup) {
    countryList.innerHTML = markup;
}

function updateNewsInfo(markup) {
    countryInfo.innerHTML = markup;
}

function createMarkupInfo({ name, capital, population, flags, languages }) {
    return `<div class="country-cards">
     <div class="country-box">
     <img src=${flags.svg} class="country-img">
     <h2 class="country-name">${name.official}</h2></div>
     <h3 class="country-capital">Capital: ${capital}</h3>
     <p class="country-population">Population: ${population}</p>
     <p class="country-language">Languages: ${Object.values(languages)}</p>
     </div>`
}

function createMarkupList({ name, capital, population, flags, languages }) {
    return `<div class="search-item">
    <img src=${flags.svg} class="search-item_img">
    <h2 class="search-item_name">${name.official}</h2>
    </div>`
}

function onError(err) {
    console.error(err);
}




