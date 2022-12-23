const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = 'de98eae1';
const APP_key = '40e9d695b97ce1872633b491b7e3719b';

// Event listener for the submit- searchQuery - then fetching API -JS
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector('input').value;
  /* console.log(searchQuery); -JS */
  fetchAPI();
});
// Fetching API -JS
async function fetchAPI() {
  const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=5`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  /* console.log(data); -JS*/
};

// Adding the input value from the fetch API to generate in my HTML. -JS
function generateHTML(results) {
  let generatedHTML = '';

  if (!results || !results.length) {
    return;
  }
  // Index and generate the HTML from result. -JS
  results.forEach((result, index) => {
    const itemId = `${result.recipe.label}-${index}`;
    generatedHTML += `
      <div class="item">
          <img src="${result.recipe.image}" alt="">
          <div class="flex-container">
              <h1 class="title" data-item-id="${itemId}" data-item-title="${result.recipe.label}" data-item-image="${result.recipe.image}" data-item-url="${result.recipe.url}">${result.recipe.label}</h1><span class="badge" style="display: none;">Saved</span>
             <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
          </div>
       <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
       <p class="item-data">Diet label: ${result.recipe.dietLabels ? result.recipe.dietLabels : 'No Data Found'}</p>
       <p class="item-data">Health Label: ${result.recipe.healthLabels.join(', ')}</p>
    </div>
    `;
  });
  searchResultDiv.innerHTML = generatedHTML;
};


document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.title');

  searchResultDiv.addEventListener('dblclick', function (event) {
    if (event.target.classList.contains('title')) {
      // Show the badge -JS
      const badge = event.target.nextElementSibling;
      badge.style.display = 'inline-block';

      // Get the item data -JS
      const itemId = event.target.dataset.itemId;
      const item = {
        title: event.target.dataset.itemTitle,
        image: event.target.dataset.itemImage,
        url: event.target.dataset.itemUrl,
      };

      // Save the item in local storage -JS
      localStorage.setItem(itemId, JSON.stringify(item));
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('.navBar');

  // Create the dropdown menu element -JS
  const dropdownMenu = document.createElement('ul');
  dropdownMenu.classList.add('dropdown-menu');
  dropdownMenu.classList.add('hidden');

  // Add the saved items to the dropdown menu -JS
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const item = JSON.parse(localStorage.getItem(key));

    const li = document.createElement('li');
    li.innerHTML = `
      <a href="${item.url}" target="_blank">
        <p>${item.title}</p>
      </a>
    `;
    dropdownMenu.appendChild(li);
  }

  // Create the clear local storage button -JS
  const clearStorageButton = document.createElement('button');
  clearStorageButton.textContent = 'Clear Favorite Recipes!';
  clearStorageButton.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
  });

  // Append the clear local storage button to the dropdown menu -JS
  dropdownMenu.appendChild(clearStorageButton);

  const navTitleTwo = document.querySelector('.navTitle.two');

  navTitleTwo.addEventListener('click', function () {
    dropdownMenu.classList.toggle('hidden');
  });

  // Append the dropdown menu to the nav bar -JS
  nav.appendChild(dropdownMenu);
});