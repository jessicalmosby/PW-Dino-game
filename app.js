/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createDino } from './fetch-utils.js';

/* Get DOM Elements */
const startBtn = document.getElementById('start-button');

/* State */

/* Events */
startBtn.addEventListener('click', async () => {
    await createDino();
    location.replace('/dino-game');
});

/* Display Functions */
