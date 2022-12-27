// Set the API key
const API_KEY = 'e5e8df94a66d48429ef5dd33406dcada';

//Define a function to make an HTTP request to the Spoonacular API
async function getWinePairing(dish) {
  try {
    const response = await fetch(`https://api.spoonacular.com/food/wine/pairing?apiKey=${API_KEY}&food=${dish}`);

    // Parse the response as JSON
    const data = await response.json();

    // Return the data
    return data;
  } catch (error) {
    // Display an error message if an error occurs
    console.error(error);
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Sorry, an error occurred while trying to retrieve the wine pairing suggestions.';
    resultsContainer.appendChild(errorMessage);
  }
}


//Define a function to display the results to the user
function displayResults(data) {
  // Select the element where you want to display the results
  const resultsContainer = document.querySelector('.search-result');

  // Clear any existing content in the results container
  resultsContainer.innerHTML = '';
  // Check for the presence of the pairings property
  if (!data.pairedWines || !data.pairingText) {
    // If the pairings property does not exist, display an error message
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Sorry, no wine pairing suggestions were found for that dish.';
    resultsContainer.appendChild(errorMessage);
    return;
  }
  //
  const pairingText = document.createElement('p');
  pairingText.textContent = data.pairingText;
  resultsContainer.appendChild(pairingText);

  // Display the product matches
  data.productMatches.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    const productTitle = document.createElement('h2');
    productTitle.textContent = product.title;
    productDiv.appendChild(productTitle);

    const productPrice = document.createElement('p');
    productPrice.textContent = 'Price: ' + product.price;
    productDiv.appendChild(productPrice);

    resultsContainer.appendChild(productDiv);
  });
}

const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchResultDiv.style.display = 'block';
  // other code to fetch the API and generate the HTML goes here
});


//Define an event handler for the form submission
function handleFormSubmit(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the value of the input field
  const dish = document.querySelector('input[name="dish"]').value;

  // Make a request to the Spoonacular API
  getWinePairing(dish)
    .then((data) => {
      // Display the results to the user
      displayResults(data);
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
}

const form = document.querySelector('form');
form.addEventListener('submit', handleFormSubmit);

const navTitle = document.querySelector('.navTitle');

navTitle.addEventListener('click', () => {
  const message = document.querySelector('.message');
  message.classList.toggle('hidden');
});