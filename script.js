'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const getCountryAndNeighbour = function (data, className = '') {
  const html = ` <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              data.population / 10000000
            ).toFixed(2)} M</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountry = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(res => res.json())
    .then(function (xd) {
      const [data] = xd;
      console.log(data);

      getCountryAndNeighbour(data);

      const neighbour = data.borders[0];

      if (!neighbour) return;

      fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`)
        .then(response => response.json())
        .then(neighbour => getCountryAndNeighbour(neighbour, 'neighbour'));
    });
};

getCountry('usa');
