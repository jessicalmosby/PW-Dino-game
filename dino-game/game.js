import {
    fetchActions,
    getDinoById,
    getUser,
    incrementAction,
    signOutUser,
} from '../fetch-utils.js';

const signoutLink = document.getElementById('signout-link');
const eggImg = document.getElementById('egg-img');

signoutLink.addEventListener('click', async () => {
    await signOutUser();
});

eggImg.addEventListener('click', async () => {
    const user = await getUser();

    await incrementAction(user.id);
    //code is wet, look for alts//
    const actionNum = await fetchActions(user.id);
    if (actionNum[0].action_num === 1) {
        eggImg.src = '../assets/egg-crack.gif';
    }
    if (actionNum[0].action_num === 2) {
        eggImg.src = '../assets/egg-hatch.gif';
    }
    if (actionNum[0].action_num === 3) {
        eggImg.src = '../assets/DinoSprite.gif';
    }
});
