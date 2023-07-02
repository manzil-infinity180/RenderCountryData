const countriesContainer = document.querySelector(".countries");
const btn = document.querySelector(".btn-country");

// Render Country
const renderCountry = function (data) {
  const languages = Object.values(data.languages);
  const currencies = Object.values(data.currencies);
  const capital = Object.values(data.capital);
  const TimeZone = Object.values(data.timezones);
  const html = `
          <article class="country">
         <img class="country__img" src= "${data.flags.svg}">
         <div class="country__data">
           <h3 class="country__name"> ${data.name.official}</h3>
           <h4 class="country__region">${data.region}</h4>
           <p class="country__row"><span>👫</span>${(
             data.population / 1000000
           ).toFixed(1)} million people</p>         
           <p class="country__row"><span>🏛️</span>${capital}</p>
           <p class="country__row"><span>🗣️</span>${languages[0]}</p>
           <p class="country__row"><span>💰</span>${currencies[0].name}</p>
           <p class="country__row"><span>⌚️</span>${TimeZone[0]}</p>
         </div>
        </article>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};
const getCountry = async function (country) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );
    const data = await response.json();

    const [countrydata] = data;
    console.log(countrydata);
    renderCountry(countrydata);
  } catch (err) {
    console.log(err);
    getError(`🫤${err.message}`);
  }
};

const getError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity = 1;
};
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const getGeolocation =async function(){
   const position = await getPosition();
   const { latitude, longitude } = position.coords;
   const response =await fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`);
   const data = await response.json();
   const country = data.country;
   console.log(`Currently you are in ${data.city},${data.country}`);
   getCountry(country);
}
btn.addEventListener('click',function(){
     getGeolocation();
     // btn.style.opacity=0;
})
/*
const getGeolocation = function () {
  getPosition()
    .then((position) => {
      const { latitude, longitude } = position.coords;
      return fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`);
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
     console.log(data);
      console.log(`Currently you are in ${data.city},${data.country}`);
      const country = data.country;
      getCountry(country);
    })
    
};
btn.addEventListener('click',function(){
     getGeolocation();
     // btn.style.opacity=0;
})
*/
