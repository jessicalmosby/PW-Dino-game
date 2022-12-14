import {
    createDino,
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

window.addEventListener('load', async () => {
    await displayDino();
});

async function grabUserFunc() {
    return await getUser();
}

eggImg.addEventListener('click', async () => {
    const user = await grabUserFunc();
    await incrementAction(user.id);
    await displayDino();
});

async function displayDino() {
    const user = await grabUserFunc();
    //code is wet, look for alts//
    const actionNum = await fetchActions(user.id);
    const dino = await getDinoById(user.id);
    console.log(dino.name);
    if (actionNum[0].action_num === 0) {
        eggImg.classList.add('animation-egg-move');
    } else if (actionNum[0].action_num === 1) {
        eggImg.classList.replace('animation-egg-move', 'animation-egg-crack');
    } else if (actionNum[0].action_num === 2) {
        eggImg.classList.replace('animation-egg-crack', 'animation-egg-hatch');
    } else if (actionNum[0].action_num === 3) {
        eggImg.classList.replace('animation-egg-hatch', 'animation-idle');
        if (!dino.name) {
            nameDino();
        }
    } else {
        eggImg.classList.remove('animation-egg-move');
        eggImg.classList.remove('animation-egg-crack');
        eggImg.classList.remove('animation-egg-hatch');
        eggImg.classList.add('animation-idle');
        return;
    }
}

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
