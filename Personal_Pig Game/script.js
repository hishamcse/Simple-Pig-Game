'use strict';

let player1 = document.querySelector('.player--0');
let player2 = document.querySelector('.player--1');
let score1 = document.querySelector('#score--0');
let score2 = document.querySelector('#score--1');
let current1 = document.getElementById('current--0');
let current2 = document.getElementById('current--1');

let dice = document.querySelector('.dice');
let btn_new = document.querySelector('.btn--new');
let btn_roll = document.querySelector('.btn--roll');
let btn_hold = document.querySelector('.btn--hold');

let scorer, currentScore, activePlayer, dice_score, current_player, gameOn;

const initilaize = () => {
  activePlayer = 0;
  currentScore = 0;
  scorer = score1;
  current_player = current1;
  gameOn = true;

  dice.classList.add('hidden');
  score1.textContent = '0';
  score2.textContent = '0';
  current1.textContent = '0';
  current2.textContent = '0';
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
};

initilaize();

const switch_player = () => {
  if (gameOn) {
    currentScore = 0;
    current_player.textContent = currentScore;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');

    scorer = activePlayer == 0 ? score2 : score1;
    current_player = activePlayer == 0 ? current2 : current1;
    activePlayer = activePlayer == 0 ? 1 : 0;

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
  }
};

const finish_game = () => {
  scorer.textContent = Number(scorer.textContent) + currentScore;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  gameOn = false;
};

btn_roll.addEventListener('click', function () {
  if (gameOn) {
    dice_score = Math.trunc(Math.random() * 6 + 1);
    if (dice.classList.contains('hidden')) {
      dice.classList.remove('hidden');
    }
    dice.src = `dice-${dice_score}.png`;
    if (dice_score == 1) {
      switch_player();
    } else {
      currentScore += dice_score;
      current_player.textContent = currentScore;
      if (currentScore + Number(scorer.textContent) >= 50) {
        finish_game();
      }
    }
  }
});

btn_hold.addEventListener('click', function () {
  if (gameOn) {
    scorer.textContent = Number(scorer.textContent) + currentScore;
    switch_player();
  }
});

btn_new.addEventListener('click', function () {
  initilaize();
});
