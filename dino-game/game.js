import { getDinoById, getUser, incrementAction, signOutUser } from '../fetch-utils.js';

const signoutLink = document.getElementById('signout-link');
const eggImg = document.getElementById('egg-img');

const user = getUser();

signoutLink.addEventListener('click', async () => {
    await signOutUser();
});

eggImg.addEventListener('click', async () => {
    await incrementAction(user.id);
});
