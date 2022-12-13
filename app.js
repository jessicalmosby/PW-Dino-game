/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createAction, createDino } from './fetch-utils.js';

/* Get DOM Elements */
const startBtn = document.getElementById('start-button');

/* State */

/* Events */
startBtn.addEventListener('click', async () => {
    const dino = await createDino();
    console.log(dino);
    const dinoAction = await createAction(dino[0].id);
    console.log(dinoAction);
    debugger;
    location.replace('/dino-game');
});

/* Display Functions */
