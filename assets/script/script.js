const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = 'de98eae1';
const APP_key = '40e9d695b97ce1872633b491b7e3719b';

// Event listener for the submit- searchQuery - then fetching API
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector('input').value;
  /* console.log(searchQuery); */
  fetchAPI();
});
// Fetching API
async function fetchAPI(){
  const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=5`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  /* console.log(data); */
}

// Adding the input value from the fetch API to generate in my HTML
function generateHTML(results) {
  let generatedHTML = '';

  if (!results || !results.length) {
    return;
  }

  results.forEach(result => {
    generatedHTML += `
      <div class="item">
          <img src="${result.recipe.image}" alt="">
          <div class="flex-container">
              <h1 class="title">${result.recipe.label}</h1>
             <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
          </div>
       <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
       <p class="item-data">Diet label: ${result.recipe.dietLabels ? result.recipe.dietLabels : 'No Data Found'}</p>
       <p class="item-data">Health Label: ${result.recipe.healthLabels.join(', ')}</p>
    </div>
    `;
  });
  searchResultDiv.innerHTML = generatedHTML;
}