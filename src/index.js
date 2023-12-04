import axios from 'axios';
import SlimSelect from 'slim-select';

const selectElement = new SlimSelect({
  select: '#breed-select-1', // Вкажіть відповідний id для вашого елементу select
});

axios.defaults.headers.common['x-api-key'] =
  'live_bsD0tmcbjEWlwMpwXS3uyJjVIxpNF9BJ2jHR16mTBeJPml6nkCfJDB09Ug6pHttz';

const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const breedListURL = 'https://api.thecatapi.com/v1/breeds';
const catByBreedURL = 'https://api.thecatapi.com/v1/images/search';

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
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    selectElement.data.appendChild(option);
  });
}

function displayCatInfo(cat) {
  catInfo.innerHTML = `
    <img src="${cat.url}" alt="Cat Image" />
    <p><strong style="color: red;">Breed:</strong> ${cat.breeds[0].name}</p>
    <p><strong style="color: red;">Description:</strong> ${cat.breeds[0].description}</p>
    <p><strong style="color: red;">Temperament:</strong> ${cat.breeds[0].temperament}</p>
  `;
}

async function loadBreeds() {
  try {
    loader.style.display = 'block';
    selectElement.slim.data.innerHTML = '';
    const breeds = await fetchBreeds();
    displayBreeds(breeds);
    loader.style.display = 'none';
  } catch (error) {
    loader.style.display = 'none';
    error.style.display = 'block';
    console.error(error);
  }
}

selectElement.slim.on('change', async () => {
  const selectedBreedId = selectElement.selected();
  try {
    catInfo.style.display = 'none';
    loader.style.display = 'block';
    const catInfoData = await fetchCatByBreed(selectedBreedId);
    displayCatInfo(catInfoData[0]);
    loader.style.display = 'none';
    catInfo.style.display = 'block';
  } catch (error) {
    loader.style.display = 'none';
    error.style.display = 'block';
    console.error(error);
  }
});

window.addEventListener('DOMContentLoaded', loadBreeds);
