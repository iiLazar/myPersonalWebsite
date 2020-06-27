"use strict";
let randomNum = 0;
let turn = 10;
let guesses = '';

function randomNumber() {
    randomNum = Math.floor(Math.random()*100+1);
}

function inputValueEmpty() {
    document.getElementById('numIn').value = '';
}

function focusInput(){
    document.getElementById('numIn').focus();
}

function disableInput() {
    document.getElementById('numIn').setAttribute('disabled', 'disabled');
}

function enableInput() {
    document.getElementById('numIn').removeAttribute('disabled');
}

function displayElement(el) {
    document.getElementById(el).style.display = 'block';
}

function hideElement(el) {
    document.getElementById(el).style.display = 'none';
}

function win() {
    hideElement('higher');
    hideElement('lower');
    hideElement('turnsLeft');
    displayElement('allGuesses');
    displayElement('correct');
    displayElement('newGame');
}

function goHigher() {
    displayElement('allGuesses');
    hideElement('lower');
    displayElement('higher');
    displayElement('turnsLeft');
    inputValueEmpty();
    focusInput();
}

function goLower() {
    displayElement('allGuesses');
    hideElement('higher');
    displayElement('lower');
    displayElement('turnsLeft');
    inputValueEmpty();
    focusInput();
}

function newGame() {
    hideElement('allGuesses');
    hideElement('correct');
    hideElement('higher');
    hideElement('lower');
    hideElement('turnsLeft');
    hideElement('turnsNoMore');
    hideElement('newGame');
    enableInput();
    inputValueEmpty();
    focusInput();
    randomNumber();
    turn = 10;
    guesses = '';
}

function noMoreGuesses() {
    hideElement('turnsLeft');
    displayElement('turnsNoMore');
    displayElement('newGame');
}

function guess() {
    if (turn > 1) {
        let num = parseInt(document.getElementById('numIn').value);

        if (num === randomNum) {
            win();
        } else if (num < randomNum) {
            goHigher();
        } else if (num > randomNum) {
            goLower();
        } else {
            hideElement('higher');
            hideElement('lower');
            displayElement('turnsLeft');
        }
        
        turn--;
        document.getElementById('turns').innerHTML = turn;
        if (!Number.isNaN(num)) {
            guesses+= ' ' + num;
        }
        document.getElementById('guesses').innerHTML = guesses;        
    } else {
        noMoreGuesses();
    }
    
    inputValueEmpty();
    focusInput();
}

randomNumber();
hideElement('newGame');

document.getElementById('guessBtn').addEventListener('click', guess);
document.getElementById('newGameBtn').addEventListener('click', newGame);
window.addEventListener('keydown', function(key) {
    if(key.which === 13) {
        if (document.getElementById('newGame').style.display === 'none') {
            guess();
        } else {
            newGame();
        }
    }
});
