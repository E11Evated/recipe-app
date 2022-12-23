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
              <h1 class="title">${result.recipe.label}</h1><span class="badge" style="display: none;">Saved</span>
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
/* Worked on click. */
/* var item = $('.search-result');

item.on('click', function(event) {
  console.log("it worked");
  const badge = document.querySelector('.badge');
if (badge) {
  badge.style.display = 'inline-block';
}

  // Get the item data
  const itemId = $(event.target).get(0).dataset.itemId;
  const item = {
    title: $(event.target).get(0).dataset.itemTitle,
    image: $(event.target).get(0).dataset.itemImage,
    url: $(event.target).get(0).dataset.itemUrl,
  };

  // Save the item in local storage
  localStorage.setItem(itemId, JSON.stringify(item));
}); */

var items = document.querySelectorAll('.item .title');

items.forEach(item => {
  item.addEventListener('click', function(event) {
    // Show the badge
    const badge = event.target.nextElementSibling;
    badge.style.display = 'inline-block';

    // Get the item data
    const itemId = event.target.dataset.itemId;
    const itemData = {
      title: event.target.dataset.itemTitle,
      image: event.target.dataset.itemImage,
      url: event.target.dataset.itemUrl,
    };

    // Save the item in local storage
    localStorage.setItem(itemId, JSON.stringify(itemData));
  });
});
const nav = document.querySelector('.navBar');

// Create the dropdown menu element
const dropdownMenu = document.createElement('ul');
dropdownMenu.classList.add('dropdown-menu');

// Add the saved items to the dropdown menu
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const item = JSON.parse(localStorage.getItem(key));

  const li = document.createElement('li');
  li.innerHTML = `
    <a href="${item.url}" target="_blank">
      <img src="${item.image}" alt="">
      <p>${item.title}</p>
    </a>
  `;
  dropdownMenu.appendChild(li);
}

// Append the dropdown menu to the nav bar
nav.appendChild(dropdownMenu);