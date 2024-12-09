// The keyboard has been rendered for you
import { renderKeyboard } from './keyboard.js'
// Set the word to guess
const word = "gift"
const guessContainer = document.getElementById('guess-container')
const snowmanParts = document.getElementsByClassName('snowman-part')
const guessChar = document.getElementsByClassName('guess-char')
const originalSnowparts =  Array.from(snowmanParts)

// 6 guesses for the 6 parts of the snowman
let guesses = 6
  
function checkGuess(e) {
    const letter = e.target.textContent;
    const isCorrect = word.includes(letter);
    
    if(!isCorrect) {
        if(snowmanParts.length > 0 && guesses > 0) {
            guesses--;
            const lastElement = snowmanParts[snowmanParts.length - 1];
            lastElement.parentNode.removeChild(lastElement);
        }
        
        if (guesses === 0) {
            guessContainer.textContent = "😥 You Lose!"
        }
        return;
    } else {
        // Mettre à jour les lettres correctement devinées
        word.split('').forEach((char, index) => {
            if (char === letter) {
                guessChar[index].textContent = letter;
            }
        });

        // Vérifier si le mot est completement deviné
        const guessString = Array.from(guessChar).map(element => element.textContent).join('');
        
        if (guessString === word) {
            
            guessContainer.textContent = "🎄 You win 🎁"
            const snowmanContainer = document.querySelector('.snowman-container');
            Array.from(snowmanParts).forEach(part => {
                part.parentNode.removeChild(part);
            });
            const sunglasses = document.createElement('img');
            sunglasses.className = "sunglasses";
            sunglasses.src = "images/sunglasses.png";
            sunglasses.alt = "sunglasses";
            sunglasses.style.visibility = "visible"
            snowmanContainer.appendChild(sunglasses);

            Array.from(originalSnowparts).forEach(part => {
                const clonedPart = part.cloneNode(true);
                snowmanContainer.appendChild(clonedPart);
            });
        }
    }
}
renderKeyboard()


let guessArr = []

function renderGuess() {
    const guessHtml = guessArr.map((char) => {
        return `<div class="guess-char">${char}</div>`
    })
    guessContainer.innerHTML = guessHtml.join('')
    
}

function start() {
    for (let i = 0; i < word.length; i++) {
        guessArr.push('-')
    }
    renderGuess()
}
document.getElementById('keyboard-container').addEventListener('click', checkGuess)

start()
/*
Challenge  
1. Your challenge is to build a Christmas take on the classic game "Hangman" where a player attempts to guess a word by selecting letters 
to save a snowman from melting.
- The snowman is made up of 6 parts: hat, arm, nose, scarf, head, and body. These are separate images and have been positioned with CSS.
- At the start of the game, a player can see a number of dashes, with a dash for each letter of the word. So if the word was TREE 
the player would see - - - -
- The player selects a letter. 
- If that letter is in the word, that letter replaces the dash in the corresponding position. For the word "TREE", if the player
has selected the letter E, they will see --EE.
- If the selected letter does not appear in the word, one part of the snowman gets removed.
- If the player guesses the entire word, they win! 
    - any removed parts of the snowman are reinstated.
    - the snowman gets sunglasses
    - the message "You Win!" is displayed in the "guess-container" div.
-If the player guesses wrong 6 times: 
    - only a puddle remains.
    - the message "You Lose!" is displayed in the "guess-container" div.
    
*** Stretch Goals *** 

- Disable the letter button once a letter has been used.
- Add a "New Game" button that appears at the end of a game and resets the app. (You will need to create an array of words to guess)
*/


