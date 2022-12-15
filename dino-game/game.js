import {
    createDino,
    fetchActions,
    getDinoById,
    getUser,
    incrementAction,
    signOutUser,
} from '../fetch-utils.js';

const dinoName = document.getElementById('dino-name');

const signOutLink = document.getElementById('sign-out-link');
const eggImg = document.getElementById('egg-img');
const feedButton = document.getElementById('feed-button');
const exerButton = document.getElementById('ex-button');

const moveFx = document.getElementById('shake-audio');
const crackFx = document.getElementById('crack-audio');
const hatchFx = document.getElementById('hatch-audio');
const shellFx = document.getElementById('out-shell-audio');

//state
moveFx.volume = 0.4;
crackFx.volume = 0.4;
hatchFx.volume = 0.4;
shellFx.volume = 0.4;

feedButton.addEventListener('click', () => {
    eggImg.classList.remove('animation-egg-move');
    eggImg.classList.remove('animation-egg-crack');
    eggImg.classList.remove('animation-egg-hatch');
    eggImg.classList.remove('animation-idle');
    eggImg.classList.remove('animation-jump');
    eggImg.classList.add('animation-bite');
});

exerButton.addEventListener('click', () => {
    eggImg.classList.replace('animation-idle', 'animation-jump');
});

signOutLink.addEventListener('click', async () => {
    await signOutUser();
});

window.addEventListener('load', async (e) => {
    e.preventDefault();
    const gameTrack = document.getElementById('game-track');
    gameTrack.volume = 0.03;
    gameTrack.play();

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
    if (actionNum[0].action_num === 0) {
        eggImg.classList.add('animation-egg-move');
        moveFx.play();
    } else if (actionNum[0].action_num === 1) {
        eggImg.classList.add('animation-egg-move2');
        moveFx.play();
    } else if (actionNum[0].action_num === 2) {
        eggImg.classList.add('animation-egg-crack');
        crackFx.play();
    } else if (actionNum[0].action_num === 3) {
        eggImg.classList.add('animation-egg-crack2');
        crackFx.play();
    } else if (actionNum[0].action_num === 4) {
        eggImg.classList.add('animation-egg-hatch');
        hatchFx.play();
    } else if (actionNum[0].action_num === 5) {
        //much if the follow code is for if they refresh the page during the hatching process
        eggImg.classList.add('animation-idle');
        shellFx.play();
        if (!dino.name) {
            nameDino();
        } else {
            dinoName.innerHTML = dino.name;
        }
    } else {
        dinoName.innerHTML = dino.name;
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
    dinoName.innerHTML = text;
    await createDino(text);
}
