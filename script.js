'use strict';

const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');

const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

//Starting Conditions

let scores, currentScore, activePlayer, playing;

//Initialization function
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceElement.classList.add('hidden');

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    //Display Dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    //Check if user rolled one: if true, switch player
    if (dice !== 1) {
      //Add dice value to current
      currentScore += dice;
      // current0Element.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch Players
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  //Add current score to active player's score
  if (playing) {
    scores[activePlayer] += currentScore;
    // scores[1] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Check if playee score >=100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
