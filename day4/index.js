/*
You are going to build an app that challenges players to identify a Christmas Movie from some emoji 🍿 🎅 🎬. The players will have 3 guesses per movie.

For example, the emoji 🌇 💣 👮 ✈️ ️🔫  represent the film “Die Hard”, which everyone knows is the best Christmas movie of all time.

In data.js you have an array of Christmas movies with emoji and text for aria labels.

Your task is to build an app that meets these criteria:

- The app should present the player with a set of emoji selected at random from the array in data.js. 

- The player will input their guess.

- If the player guesses correctly, the app should display a message saying "Correct!". Then, after a pause of 3 seconds, it should randomly select the next set of emoji clues and display them to the player.

- If the player’s guess is incorrect, the app should display a message saying “Incorrect! You have 2 more guesses remaining.”

- If the player fails to guess correctly on the next two attempts, the app should display a message saying, `The film was <Film Name Here>!`. After a pause of 3 seconds, it should randomly select a new set of emoji clues and display them to the player.

- When all films in the array have been used, the player should see a message saying "That's all folks!".

- Each film should only be used once. There should be no repetition. 


Stretch Goals

- Use AI to decide if an answer is correct or incorrect. For example if the correct answer is "The Polar Express" but the player inputs "Polar Express" a straight comparison of the two strings will find that the player's answer was incorrect. AI could assess if there is sufficient similarity between the strings to judge it as correct. 

- Improve the UX by disabling the form/button when the game is over and during the pause between questions.
*/

import { films } from '/data.js'

const guessInput = document.getElementById('guess-input')
const messageContainer = document.querySelector('.message-container')
const emojiCluesContainer = document.querySelector('.emoji-clues-container')
let remainingFilms = [...films];
let movie = {};
let remainGuess = 3;

const normalizeAnswer = (str) => {
  return str.trim().toLowerCase();
};

const randomMovie = (filmsData) => {
  if (filmsData.length === 0) {
    messageContainer.textContent = "That's all folks!";
    guessInput.querySelector('input').disabled = true;
    guessInput.querySelector('button').disabled = true;
    return null;
  }
  
  const randomNumber = Math.floor(Math.random() * filmsData.length);
  return filmsData.splice(randomNumber, 1)[0];
};

const displayMovie = () => {
  const {emoji, ariaLabel} = movie;
  emojiCluesContainer.innerHTML = emoji.join(' ');
  emojiCluesContainer.setAttribute('aria-label', ariaLabel);
};

const checkAnswer = (answer) => {
  const userAnswer = normalizeAnswer(answer);
  const movieTitle = normalizeAnswer(movie.title); 

  if (userAnswer === movieTitle) {
    messageContainer.textContent = 'Correct!';
    setTimeout(() => {
      resetGame();
    }, 3000);
  } else {
    if (remainGuess > 1) {
      remainGuess--;
      messageContainer.textContent = `Incorrect! You have ${remainGuess} more guesses remaining.`;
    } else {
      messageContainer.textContent = `The film was ${movie.title}!`;
      setTimeout(() => resetGame(), 3000);
    }
  }
};

document.getElementById('guess-input').addEventListener('submit', (e) => {
  e.preventDefault();
  const inputTxt = document.querySelector('input[name="guess-input"]').value;
  checkAnswer(inputTxt);
});

const resetGame = () => {
  remainGuess = 3;
  document.querySelector('input[name="guess-input"]').value = ''
  messageContainer.textContent = `You have 3 guesses remaining.`;
  movie = randomMovie(remainingFilms);
  
  if (movie) {
    displayMovie();
    guessInput.querySelector('input').disabled = false;
    guessInput.querySelector('button').disabled = false;
  }
};

const init = () => {
  movie = randomMovie(remainingFilms);  
  displayMovie();
};

init();
