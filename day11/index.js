/**
 *🎄 Requirements:
 * - This is a classic "Find the Pair" game with a christmas theme.
 * - The player should be able to reveal cards by clicking on them.
 * - When the player reveals one card, it should stay revealed until a second card is revealed.
 * - When the player reveals two cards:
 *   - If they are the same, they should remain revealed for the rest of the game.
 *   - If they are different, they should be flipped back to hidden.
 * - The cards should be shuffled at the start of each game.
 */


const emojis = ['🎄', '🎁', '🎅', '☃️']; 
const gameContainerEl = document.getElementById('game-board');
let revealedCards = []; 
let matchedCards = [];
let isProcessing = false;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function initGame() {
  if (!gameContainerEl) {
    console.error('Element with id "game-board" not found.');
    return;
  }

  revealedCards = [];
  matchedCards = [];
  isProcessing = false;

  const randomEmojis = shuffleArray([...emojis, ...emojis]);
  gameContainerEl.innerHTML = ''; 

  randomEmojis.forEach(emoji => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card-container');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card', 'card__side--front');
    cardFront.textContent = "?";

    const cardBack = document.createElement('div');
    cardBack.classList.add('card', 'card__side--back');
    cardBack.textContent = emoji;

    cardEl.appendChild(cardFront);
    cardEl.appendChild(cardBack);
    gameContainerEl.appendChild(cardEl);

    cardEl.addEventListener('click', function() {
      if (isProcessing || 
          cardEl.classList.contains('matched') || 
          revealedCards.includes(cardEl)) {
        return;
      }

      cardEl.classList.add('revealed');
      revealedCards.push(cardEl);

      if (revealedCards.length === 2) {
        isProcessing = true;
        checkMatch();
      }
    });
  });
}

function checkMatch() {
  const [card1, card2] = revealedCards;
  const emoji1 = card1.querySelector('.card__side--back').textContent;
  const emoji2 = card2.querySelector('.card__side--back').textContent;

  if (emoji1 === emoji2) {
    // Cartes correspondantes
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);
    revealedCards = [];
    isProcessing = false;

    card1.classList.remove('revealed');
    card2.classList.remove('revealed');

    if (matchedCards.length === emojis.length * 2) {
      
      const victoryEl = document.createElement('p')
      victoryEl.classList.add('victory-message');
      victoryEl.textContent = " 🥳 Congratulations! You've found all the pairs 🎉"
      gameContainerEl.insertAdjacentElement('beforeend',victoryEl)      
     
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('revealed');
      card2.classList.remove('revealed');
      revealedCards = [];
      isProcessing = false;
    }, 1000);
  }
}

initGame();

// Bouton de réinitialisation (optionnel)
const resetButton = document.createElement('button');
resetButton.textContent = 'New Game';
resetButton.addEventListener('click', initGame);
document.body.insertBefore(resetButton, gameContainerEl);




/**
 * 🎅 Stretch Goals:
 * - Add a point system where points are awarded for each correctly revealed pair 
 *   and deducted for each incorrect pair (you decide the exact points for each action).
 * - Implement a high-score system using the browser's local storage.
 * - Add a "Restart Game" button that appears when the game ends so the user can start over.
 */
  