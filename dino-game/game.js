import { signOutUser } from '../fetch-utils.js';

const signoutLink = document.getElementById('signout-link');
const eggImg = document.getElementById('egg-img');

signoutLink.addEventListener('click', async () => {
    await signOutUser();
});

eggImg.addEventListener('click', () => {});
