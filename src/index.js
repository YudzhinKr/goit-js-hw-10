import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_bsD0tmcbjEWlwMpwXS3uyJjVIxpNF9BJ2jHR16mTBeJPml6nkCfJDB09Ug6pHttz';

// Оголошення змінних для елементів DOM
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const breedListURL = 'https://api.thecatapi.com/v1/breeds';
const catByBreedURL = 'https://api.thecatapi.com/v1/images/search';

// Оголошення функцій для взаємодії з API та відображенням інформації
function fetchBreeds() {
  return axios
    .get(breedListURL)
    .then(response => response.data)
    .catch(error => {
      throw new Error('Failed to fetch breed list');
    });
}

function fetchCatByBreed(breedId) {
  const params = { breed_ids: breedId };
  return axios
    .get(catByBreedURL, { params })
    .then(response => response.data)
    .catch(error => {
      throw new Error('Failed to fetch cat information');
    });
}

function displayBreeds(breeds) {
  // Ваш код для відображення списку порід у відповідному елементі DOM
}

function displayCatInfo(cat) {
  // Ваш код для відображення інформації про кота у відповідному елементі DOM
}

async function loadBreeds() {
  try {
    // Ваш код для завантаження списку порід
  } catch (error) {
    // Ваш код для обробки помилок при завантаженні списку порід
  }
}

// Прослуховувач подій на зміну вибору породи
selectElement.slim.on('change', async () => {
  try {
    // Ваш код для завантаження інформації про кота за обраною породою
  } catch (error) {
    // Ваш код для обробки помилок при завантаженні інформації про кота
  }
});

// Завантаження списку порід при завантаженні сторінки
window.addEventListener('DOMContentLoaded', loadBreeds);
