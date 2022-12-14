import {
    createDino,
    fetchActions,
    getDinoById,
    getUser,
    incrementAction,
    signOutUser,
} from '../fetch-utils.js';

const signOutLink = document.getElementById('sign-out-link');
const eggImg = document.getElementById('egg-img');

signOutLink.addEventListener('click', async () => {
    await signOutUser();
});

eggImg.addEventListener('click', async () => {
    const user = await getUser();

    const newAction = await incrementAction(user.id);
    console.log(newAction);
    //code is wet, look for alts//
    const actionNum = await fetchActions(user.id);
    console.log(actionNum);
    if (actionNum[0].action_num === 1) {
        eggImg.src = '../assets/egg-crack.gif';
    } else if (actionNum[0].action_num === 2) {
        eggImg.src = '../assets/egg-hatch.gif';
    } else {
        eggImg.src = '../assets/DinoSprite.gif';
        nameDino();
    }
    console.log(await getDinoById(user.id));
});

async function nameDino() {
    let text;
    let yourDino = prompt('You hatched your dino! What will you call them?', 'Dino');
    if (yourDino === null || yourDino === '') {
        alert("Don't you want to name your baby?!");
    } else {
        text = yourDino;
    }
    document.getElementById('dino-name').innerHTML = text;
    await createDino(text);
}
