import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';  

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY));



function searchCountries(evt) {
  evt.preventDefault();

  const inputData = refs.input.value.trim();

  fetchCountries(inputData).then(renderCountryList).catch(console.log);
}

function clearInput() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}

function renderCountryList(responceAPI) {
  console.log(responceAPI);
  clearInput();

  if (responceAPI.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (responceAPI.length === 1) {
    refs.countryInfo.innerHTML = renderCountryInfo(responceAPI[0]);
  } else {
    const renderListCountry = responceAPI.map(country => renderCountriesList(country)).join('');
    refs.countryList.insertAdjacentHTML('beforeend', renderListCountry);
  }
}

function renderCountriesList({ flags, name }) {
  return `<li class="country-listInfo">
      <img class="country-flag" src="${flags.svg}"/>
      <h2 class="country-list-name">${name.official}</h2>
    </li>`;
}

function renderCountryInfo({ name, flags, capital, population, languages }) {
  return `<li class="country-main-info">
  <div class="wrapper-country-info">
    <img class="country-flag-info" src='${flags.svg}'/>
    <h2 class="country-list-name">${name.official}</h2>
  </div>
  <div class="country-secondary-info">
    <p><b>capital:</b> ${capital}</p>
    <p><b>population:</b> ${population}</p>
    <p><b>languages:</b> ${Object.values(languages)}</p>
  </div>
</li>`;
}