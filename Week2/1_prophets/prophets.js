
// URL of the JSON data source
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

// Select the container where the cards will be inserted
const cards = document.querySelector('.cards');

// Asynchronous function to fetch data from the JSON source
async function getProphetData() {
  const response = await fetch(url); // Make the network request
  const data = await response.json(); // Convert the response to a JSON object
  // console.table(data.prophets); // Temporary check of the data
  displayProphets(data.prophets); // Call the function to display the data
}

// Function to build and display prophet cards
const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    // Create HTML elements for each card
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let birthDate = document.createElement('p');
    let birthPlace = document.createElement('p');
    let portrait = document.createElement('img');

    // Set the content of each element
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
    birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

    // Set image attributes
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    // Append elements to the card section
    card.appendChild(fullName);
    card.appendChild(birthDate);
    card.appendChild(birthPlace);
    card.appendChild(portrait);

    // Append the card to the main container
    cards.appendChild(card);
  });
};

// Call the main function to start the process
getProphetData();

