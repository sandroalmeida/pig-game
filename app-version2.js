/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*** New Rules
- Add a second dice to the game
- The player looses his ENTIRE score when both dices show 6. After that, it's the next player turn.
- The player looses his CURRENT score if one of the dices show 1.
- Insert a input field to user set the value of the Score to win the game.
- The winning score will be 100 if the user not input any value.
*/

var scores, roundScore, activePlayer, gamePlaying;

init();

// Create a eventlistener in the roll button
document.querySelector('.btn-roll').addEventListener('click', function () {
    
    if(gamePlaying){
        
        // Generate a random number to dice variable
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
        
        // Update the current score
        if(dice1 === 6 && dice2 === 6){
            // Loss entire score (both dices are equals to 6)
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();
        } else if(dice1 !== 1 && dice2 !== 1){
            // Add score (both dices are different to 1)
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else{
            // Next player (one of the dices are equal to 1)
            nextPlayer();
        }
        
        // Store last dice to check in the next roll
        lastDice = dice;
    }
});

// Create a eventlistener in the hold button
document.querySelector('.btn-hold').addEventListener('click', function(){
    
    if(gamePlaying){
        // Add Global Score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        // Access input score
        var input = document.querySelector('.final-score').value;
        var winningScore;
        
        // Check if input is not empty
        if(input){
            winningScore = input;
        }else{
            winningScore = 100;
        }
        
        // Check if player won the game
        if(scores[activePlayer] >= winningScore){
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
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
};

function init(){
    
    // Set play active
    gamePlaying = true;
    
    // Set the initial player
    activePlayer = 0;
    
    // Reset the player names
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    // Hide dices
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