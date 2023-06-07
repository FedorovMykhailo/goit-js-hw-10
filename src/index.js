import Notiflix from 'notiflix';
import SlimSelect from 'slim-select'
import {fetchBreeds, fetchCatByBreed} from "./cat-api.js"

const API_KEY = "live_uKatIRY0dNbZulM0dFI2TY7ZzTzY9alPErLoe2gQMFgyaeqsMTqvl1gkGpJA03SD"

const refs = {
    select: document.querySelector(".breed-select"),
    loader: document.querySelector(".loader"),
    error: document.querySelector(".error"),
    catInfo: document.querySelector(".cat-info")
}

const renderCatSelect = (breeds) => {
    const newBreeds = breeds.map(breed => {return `<option value="${breed.id}">${breed.name}</option>`});
    refs.select.insertAdjacentHTML("afterbegin",newBreeds.join(""));
    refs.select.addEventListener("change",(event)=>{onCatChange(event)});
}

const onCatChange = (ev) => {
    clearCatInfo();
    refs.loader.style = 'display: block;';
    fetchCatByBreed(ev.target.value)
      .then(data => {
        refs.loader.style = 'display: none;';
        renderCatInfo(data)
      })
      .catch(error => {
        Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!",{position: "left-top",});
        console.error(error)
      });
}

const renderCatInfo = (fullCatInfo) => {
    refs.catInfo.style = "display: flex; width:50%; gap: 10px; align-items: center; justify-content: center;"
    const info = 
    `<div><img src="${fullCatInfo[0].url}" width="100%"></div>
    <div><h2>${fullCatInfo[0].breeds[0].name}</h2>
    <p>${fullCatInfo[0].breeds[0].description}</p>
    <strong>Temperament:</strong>
    <p>${fullCatInfo[0].breeds[0].temperament}</p></div>`;
    refs.catInfo.insertAdjacentHTML("afterbegin",info);
}

const clearCatInfo = () => { 
    while (refs.catInfo.firstChild) {
    refs.catInfo.removeChild(refs.catInfo.firstChild);
}}

refs.error.style = 'display: none;';
refs.loader.style = 'display: block;';

console.log(fetchBreeds());
fetchBreeds().then(data => {
        refs.loader.style = 'display: none;';
        renderCatSelect(data)
        new SlimSelect({
            select: ".breed-select",
          })
      })
      .catch(error => {
        Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!",{position: "left-top",});
        console.error(error)
      });;


