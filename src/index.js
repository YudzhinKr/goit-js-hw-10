import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_bsD0tmcbjEWlwMpwXS3uyJjVIxpNF9BJ2jHR16mTBeJPml6nkCfJDB09Ug6pHttz';

const breedSelect = document.querySelector('.breed-select');
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
    breedSelect.appendChild(option);
  });
}

function displayCatInfo(cat) {
  catInfo.innerHTML = `
    <img src="${cat.url}" alt="Cat Image" />
    <p><strong style="color: red">Breed:</strong> ${cat.breeds[0].name}</p>
    <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
    <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
  `;
}

async function loadBreeds() {
  try {
    loader.style.display = 'block';
    const breeds = await fetchBreeds();
    displayBreeds(breeds);
    loader.style.display = 'none';
  } catch (error) {
    loader.style.display = 'none';
    error.style.display = 'block';
  }
}

breedSelect.addEventListener('change', async event => {
  const selectedBreedId = event.target.value;

  try {
    const catInfoData = await fetchCatByBreed(selectedBreedId);
    displayCatInfo(catInfoData[0]);
  } catch (error) {
    console.error(error);
  }
});

window.addEventListener('DOMContentLoaded', loadBreeds);

function showLoader(element) {
  element.style.display = 'block';
}

function hideLoader(element) {
  element.style.display = 'none';
}

async function loadBreeds() {
  try {
    showLoader(loader);
    breedSelect.style.display = 'none';

    const breeds = await fetchBreeds();
    displayBreeds(breeds);

    hideLoader(loader);
    breedSelect.style.display = 'block';
  } catch (error) {
    hideLoader(loader);
    error.style.display = 'block';
  }
}

breedSelect.addEventListener('change', async event => {
  const selectedBreedId = event.target.value;

  try {
    showLoader(loader);
    catInfo.style.display = 'none';

    const catInfoData = await fetchCatByBreed(selectedBreedId);
    displayCatInfo(catInfoData[0]);

    hideLoader(loader);
    catInfo.style.display = 'block';
  } catch (error) {
    hideLoader(loader);
    console.error(error);
  }
});

window.addEventListener('DOMContentLoaded', loadBreeds);

function showErrorMessage() {
  error.style.display = 'block';
}

function hideErrorMessage() {
  error.style.display = 'none';
}

async function loadBreeds() {
  try {
    showLoader(loader);
    breedSelect.style.display = 'none';
    hideErrorMessage();

    const breeds = await fetchBreeds();
    displayBreeds(breeds);

    hideLoader(loader);
    breedSelect.style.display = 'block';
  } catch (error) {
    hideLoader(loader);
    showErrorMessage();
    console.error(error);
  }
}

breedSelect.addEventListener('change', async event => {
  const selectedBreedId = event.target.value;

  try {
    showLoader(loader);
    catInfo.style.display = 'none';
    hideErrorMessage();

    const catInfoData = await fetchCatByBreed(selectedBreedId);
    displayCatInfo(catInfoData[0]);

    hideLoader(loader);
    catInfo.style.display = 'block';
  } catch (error) {
    hideLoader(loader);
    showErrorMessage();
    console.error(error);
  }
});

window.addEventListener('DOMContentLoaded', loadBreeds);
