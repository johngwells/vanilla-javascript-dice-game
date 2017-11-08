/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, lastDice, dice;
let gamePlaying = true;
init();
/*
 *
scores = [0, 0];
roundScore = 0;
// activePlayer keeps track of the player whos playing
activePlayer = 0;
*/

// Dice: testing the dice
// dice = Math.floor(Math.random() * 6) + 1;
// console.log(dice);

// Dom manipulation
/*
Use querySelector to manipulate the dom
To edit text: use textContent
instead of using #current-0 or -1 we use + activePlayer which will be 0 or 1
*/
// this is the setter
// document.querySelector('#current-' + activePlayer).textContent = dice;
// anytime we right innerHTML it must be a string or JS will think its code
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// Added this to the init function
// getElementByID is faster than query selector. Only works for ID's
// document.getElementById('score-0').textContent = '0';
// document.getElementById('score-1').textContent = '0';
// document.getElementById('current-0').textContent = '0';
// document.getElementById('current-1').textContent = '0';

// this is the getter
// this is just to read the value/content of the element and then store it in x
/*
let x = document.querySelector('#score-0').textContent;
console.log(x);
*/

// add this to the init function
// when we open up the game we want to not disply the dice at the beginning
// document.querySelector('.dice').style.display = 'none';

/*
function btn() {
  // Do something here 
}
*/

// event handler * using anonymous function can only be used in here or use btn as
// an argument and create the function above if we are using it in more than one place
document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    // 1. Random number
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    // let dice = 6;
    // console.log(dice);

    // 2. Display the result
    // 2 dice
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
    // 1 dice originally (below) querySelector only gets the first occurrence
    // let diceDOM = document.querySelector('.dice');
    // diceDOM.style.display = 'block';
    // diceDOM.src = 'dice-' + dice + '.png';

    if (dice1 !== 1 && dice2 !== 1) {
      // Add score
      roundScore += dice1 + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      // Next Player
      nextPlayer();
    }
    
    // 3 is for only 1 dice
    // 3. Update the round score if the rolled number is not 1. 1: you lose all points that round
    // Bug: Roll 2 6's and player sccore resets. If the next player rolls a 6 the player ends, scores 0's and next player
    // if (dice === 6 && lastDice === 6) {
    //   // Player losses score
    //   scores[activePlayer] = 0;
    //   document.querySelector('#score-' + activePlayer).textContent = '0';
    //   dice = 0;
    //   nextPlayer();
    // } else if (dice !== 1) {
    //   // Add scores
    //   roundScore += dice;
    //   document.querySelector('#current-' + activePlayer).textContent = roundScore;
    //   // nextPlayer();
    //   // 4. Check if player rolled a 6 twice. Lose all point & entire score.
    // } else {
    //   // Next Player
    //   nextPlayer();
    // }

    // lastDice = dice;
  }
});


document.querySelector('.btn-hold').addEventListener('click', () => {
  if (gamePlaying) {
    // add Current score to the Global score
    scores[activePlayer] += roundScore;
    // update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    let input = document.querySelector('.final-score').value;
    console.log(input);
    let winningScore;
    // Undefined, 0, null or "" are COERCED to false. Anything else true
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      // document.querySelector('.dice').style.display = 'none'; // one dice
      document.getElementById('.dice-1').style.display = 'none';
      document.getElementById('.dice-2').style.display = 'none';
      gamePlaying = false;
    } else {
      // Next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  // next player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  lastDice = 1;
  // resets the total score for the round to start back at 0
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  // switch the active player red dot to the current player
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  /*
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.add('active');
  */
  // when player ends the dice disapears
  // document.querySelector('.dice').style.display = 'none'; // for one dice
  document.getElementById('dice-1').style.display = 'block';
  document.getElementById('dice-2').style.display = 'block';
}

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  // active class reset back to player one
  document.querySelector('.player-0-panel').classList.add('active');
}

document.querySelector('.btn-new').addEventListener('click', init);
