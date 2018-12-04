/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

// Create a eventlistener in the roll button
document.querySelector('.btn-roll').addEventListener('click', function () {
    
    if(gamePlaying){
        // Generate a random number to dice variable
        var dice = Math.floor(Math.random() * 6) + 1;

        // Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // Update the current score
        if(dice !== 1){
            // Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else{
            // Next player
            nextPlayer();
        }        
    }
});

// Create a eventlistener in the hold button
document.querySelector('.btn-hold').addEventListener('click', function(){
    
    if(gamePlaying){
        // Add Global Score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if(scores[activePlayer] >= 100){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            hideTheDice();
            document.getElementById('current-' + activePlayer).textContent = 0;
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else{
            // Next player
            nextPlayer();    
        }        
    }
});

// Create a eventlistener it the new button
document.querySelector('.btn-new').addEventListener('click', init);

// Generic function next player
function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    hideTheDice();
};

// generic function to hide the dice
function hideTheDice(){
    document.querySelector('.dice').style.display = 'none';
};

function init(){
    
    // Set play active
    gamePlaying = true;
    
    // Set the initial player
    activePlayer = 0;
    
    // Reset the player names
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    hideTheDice();

    // Reset the values to scores
    scores = [0, 0];
    roundScore = 0;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    
    // Remove class winner, important to the new button
    document.querySelector('.player-0-panel').classList.add('winner');
    document.querySelector('.player-1-panel').classList.add('winner');
    
    // Reset active class
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};