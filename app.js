/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';

/* Get DOM Elements */
const startBtn = document.getElementById('start-button');

/* State */

/* Events */
startBtn.addEventListener('click', () => {
    location.replace('/dino-game');
});

/* Display Functions */
