const fetchBreeds = () => {
    return fetch(`https://api.thecatapi.com/v1/breeds?api_key=live_uKatIRY0dNbZulM0dFI2TY7ZzTzY9alPErLoe2gQMFgyaeqsMTqvl1gkGpJA03SD&limit=100`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
    }

const fetchCatByBreed = (breedId) => {
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=live_uKatIRY0dNbZulM0dFI2TY7ZzTzY9alPErLoe2gQMFgyaeqsMTqvl1gkGpJA03SD`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
}
       

    export  {fetchBreeds,fetchCatByBreed}