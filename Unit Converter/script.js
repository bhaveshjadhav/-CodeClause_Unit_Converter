// Load history and favorites from local storage
let history = JSON.parse(localStorage.getItem("history")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function addToHistory(result) {
  // Add the result to the history array
  history.push(result);

  // Limit the history to the last 10 entries
  if (history.length > 10) {
    history.shift(); // Remove the oldest entry
  }

  // Save the updated history to local storage
  localStorage.setItem("history", JSON.stringify(history));
}

function addToFavorites(result) {
  // Check if the result is already in favorites
  const existingFavorite = favorites.find((fav) => fav.result === result);
  if (existingFavorite) {
    return; // Exit if already in favorites
  }

  // Add the result to favorites
  favorites.push({ result });

  // Save the updated favorites to local storage
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function displayHistory() {
  const historyElement = document.getElementById("history");

  // Clear the history element
  historyElement.innerHTML = "";

  // Display each entry in the history array
  history.forEach((entry) => {
    const listItem = document.createElement("li");
    listItem.textContent = entry;
    historyElement.appendChild(listItem);
  });
}

function displayFavorites() {
  const favoritesElement = document.getElementById("favorites");

  // Clear the favorites element
  favoritesElement.innerHTML = "";

  // Display each entry in the favorites array
  favorites.forEach((favorite) => {
    const listItem = document.createElement("li");
    listItem.textContent = favorite.result;
    favoritesElement.appendChild(listItem);
  });
}

// Function to swap the "From Unit" and "To Unit" selections
function swapUnits() {
  const fromUnit = document.getElementById("from-unit").value;
  const toUnit = document.getElementById("to-unit").value;

  document.getElementById("from-unit").value = toUnit;
  document.getElementById("to-unit").value = fromUnit;
}

// Function to convert the units
function convert() {
  const fromUnit = document.getElementById("from-unit").value;
  const fromValue = parseFloat(document.getElementById("from-value").value);
  const toUnit = document.getElementById("to-unit").value;
  const resultElement = document.getElementById("result");

  if (isNaN(fromValue)) {
    resultElement.textContent = "Invalid input. Please enter a valid number.";
    return;
  }

  // Convert the value from the from-unit to the to-unit
  const convertedValue = convertTo(fromValue, fromUnit, toUnit);

  // Display the converted value
  resultElement.textContent = `${fromValue} ${fromUnit} -> ${convertedValue.toFixed(2)} ${toUnit}`;

  // Save the result to history and favorites
  addToHistory(`${fromValue} ${fromUnit} -> ${convertedValue.toFixed(2)} ${toUnit}`);
  addToFavorites(`${fromValue} ${fromUnit} -> ${convertedValue.toFixed(2)} ${toUnit}`);

  // Display history and favorites
  displayHistory();
  displayFavorites();
}

// Function to convert a value from one unit to another
function convertTo(value, fromUnit, toUnit) {
  // Get the conversion factors
  const conversionFactors = {
    kilometers: 1000,
    meters: 1,
    centimeters: 0.01,
    millimeters: 0.001,
    inches: 0.0254,
    feet: 0.3048,
    yards: 0, 
    miles: 1.609344,
  };

  // Calculate the converted value
  const convertedValue = value * conversionFactors[fromUnit] / conversionFactors[toUnit];

  // Return the converted value
  return convertedValue;
}

// Load history and favorites on page load
window.onload = function () {
  displayHistory();
  displayFavorites();
};

