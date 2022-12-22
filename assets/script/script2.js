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
}  catch (error) {
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
  if (!data.pairings || !data.pairingText) {
    // If the pairings property does not exist, display an error message
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Sorry, no wine pairing suggestions were found for that dish.';
    resultsContainer.appendChild(errorMessage);
    return;
  }

  // If the pairings property exists, iterate over the wine pairing suggestions
  for (const pairing of data.pairings) {
    // Create an HTML element to hold the pairing suggestion
    const pairingElement = document.createElement('div');
    pairingElement.classList.add('pairing');

    // Set the text content of the element to the pairing suggestion
    pairingElement.textContent = pairing;

    // Append the element to the results container
    resultsContainer.appendChild(pairingElement);
  }
}

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


// an event listener to the form to listen for submissions
const form = document.querySelector('form');
form.addEventListener('submit', handleFormSubmit);