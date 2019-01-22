/*jshint esversion: 6 */

// T O D O
// - @media? to make site fully responsive on small screens
// create Readme
// add responsive clicks
// add grow of card on click and on battlefiekd
// add Backgrounds
// choose another color palette
// add sounds & backgroudn music?
// add an extra InfoBoard for live game instructions.
// find a better Font

// G E T   D O M 
let cardStack = $("#card-stack");

// G A M E    I N I T

let game = new Game(cardsArray); //array comes from Character.js
let player1 = new Player("Player 1");
let player2 = new Player("Player 2");
let maxCards = 6;

printCharacters(); // to console, just for Dev


//First set Player1 default, after clicking Start,
//the users will dice who is first
game.currentPlayer = player1;

// A click event is set for the game to start. 
// After starting users will be asked how many rounds they want to play,
// and dice who is first.

$("#infobox-button").on("click", function () {
  // TODO: get info with input field

  game.roundsToPlay = Number(prompt("How many round would you like to play?"));
  $("#infobox-button").off();

  // Dice, who starts first
  $("#instr").text("Every player dices once to see who starts.");
  $("#story-title").text("Let's see who can pick the first card...");

  $("#infobox-button").text("Click to Dice, " + player1.name);
  $("dice div").show();

  $('#infobox-button').on('click', function () {
    player1.currentDiceValue = game.rollTheDice();
    $("#story").text(player1.name + " diced a " + player1.currentDiceValue);
    setTimeout(() => {
      $("#dice").text("");
    }, 1000);
    $("#infobox-button").text("Click to Dice, " + player2.name);
    $('#infobox-button').off();
    $('#infobox-button').on('click', function () {
      player2.currentDiceValue = game.rollTheDice();
    $("#story").text(player2.name + " diced " + player1.currentDiceValue);
      if (player2.currentDiceValue > player1.currentDiceValue) {
        game.currentPlayer = player2;
        $("#p2-board").addClass("selected");
      } else $("#p1-board").addClass("selected");
      $("#story").text(player2.name + " diced " + player2.currentDiceValue);

      // setTimeout(() => {
      //   $("#dice").text("");
      // }, 1000);

      $('#infobox-button').off();
      setTimeout(() => {
        player1.currentDiceValue = 0;
        player2.currentDiceValue = 0;
        $("#story").text("");
        $("#dice").text("");
        $("dice div").hide();    
      }, 2000);
      $("#story-title").text(game.currentPlayer.name + " starts!");
      startPhase1();
    });
  });
});

// Enter names Click Event
$("#p1-name").click(function () {
  let enteredName = prompt("What is your name, Player 1?");
  if (enteredName != null) {
    player1.name = enteredName;
    $("#p1-name span").text(player1.name);
  }
});

$("#p2-name").click(function () {
  let enteredName = prompt("What is your name, Player 2?");
  if (enteredName != null) {
    player2.name = enteredName;
    $("#p2-name span").text(player2.name);
  }
});

// ###### F U N C T I O N S ######

// REMOVE THIS 
// function dice(player) {
//   $("dice div").show();
//   $('#infobox-button').on('click', function () {
//     player.currentDiceValue = game.rollTheDice();
//   });
// }

// Phase 1: Player pick their cards from main stack.
//          When done, Phase 2
function startPhase1() {
  game.fillCardStack();
  game.currentPhase = 1;
  game.updateBoard();

  $("#instr").text("Pick a card to build your personal army. When each player has got 3 soldiers, you are prepared for battle!");
  $("#story-title").text("Which warrior should be part of your army?");


  // Click Listener Cardstack
  $("#card-stack .bc").on("click", function () {
    let clickedCard = $(this).attr("name");
    
    $("#story").text(game.currentPlayer.name + " picked " + clickedCard + "! Beware!!!");
    setTimeout(() => {
      $("#story").text("");
    },1500);
    let clickedCharacter = game.cardsArray.filter(obj => obj.name === clickedCard)[0];

    game.currentPlayer.currentCards.push(clickedCharacter);

    if (game.currentPlayer === player1) {
      $(".p1-cards").append(this);
    } else {
      $(".p2-cards").append(this);
    }
    game.switchPlayer();

    //check if all cards from main stack are distributed
    if (player1.currentCards.length + player2.currentCards.length === maxCards) {
      startPhase2();
    }
  });
}

// Phase 2: Each Player picks a card for upcoming battle
//          When done, Battle starts
function startPhase2() {
  game.currentPhase = 2;
  $(".bc").off();
  game.updateBoard();

  $("#instr").text("Each player needs to pick ONE card for the upcoming battle.");
  $("#story-title").text("Get ready for battle! Chose your hero...");

  $("#p1-stack .bc").on("click", function () {
    let clickedCard = $(this).attr("name");
    let clickedCharacter = game.cardsArray.filter(obj => obj.name === clickedCard)[0];

    if (game.currentPlayer === player1) {
      $("#story").text(game.currentPlayer.name + " sent " + clickedCard + " to the Battlefield!");
      game.currentPlayer.currentCardInBattle = clickedCharacter;
      $("#bf-p1").append(this);
      let indexOfCard = player1.currentCards.indexOf(clickedCharacter);
      player1.currentCards.splice(indexOfCard, 1);
      game.switchPlayer();
      if (player2.currentCardInBattle != null) {
        startBattle();
      }
    }
  });

  $("#p2-stack .bc").on("click", function () {
    let clickedCard = $(this).attr("name");
    let clickedCharacter = game.cardsArray.filter(obj => obj.name === clickedCard)[0];

    if (game.currentPlayer === player2) {
      $("#story").text(game.currentPlayer.name + " sent " + clickedCard + " to the Battlefield!");
      game.currentPlayer.currentCardInBattle = clickedCharacter;
      $("#bf-p2").append(this);
      let indexOfCard = player2.currentCards.indexOf(clickedCharacter);
      player2.currentCards.splice(indexOfCard, 1);
      game.switchPlayer();
      if (player1.currentCardInBattle != null) {
        startBattle();
      }
    }
  });
}

// Battle-Phase:  Current player choses property of current card on battlefield.
//                Then each Player can use PowerUp and dices (TODO)
//                When players stacks are empty, check if there is another round to play
//                and if not, who won ==> Gameover

function startBattle() {
  game.currentPhase = 3;
  $(".bc").off();
  setTimeout(() => {
    $("#story").text("");
  },1500);
  $("#instr").text(game.currentPlayer.name + " needs to pick a character trait to attack with. Click on the character trait of choice on your card.");
  $("#story-title").text("How do you want to attack your oponent?");
  

  // Current player choses property to attack
  $("#battle-field .bc p").on("click", function () {
    let selectedProperty = $(this).prop("class");
    game.currentPropertyInBattle = selectedProperty;
    $("#story").text(game.currentPlayer.name+" attacks with "+game.currentPropertyInBattle+"!");
    
    let player1prop = player1.currentCardInBattle[game.currentPropertyInBattle];
    let player2prop = player2.currentCardInBattle[game.currentPropertyInBattle];

    $("#instr").text("Each player needs to dice to add diced number to the current value of "+game.currentPropertyInBattle+".");
    $("#story-title").text("Get lucky, "+game.currentPlayer.name+"! Dice to increase your attack!");
 
    $("#infobox-button").text("Click to Dice, " + game.currentPlayer.name);
    $("dice div").show();
    $('#infobox-button').on('click', function () {
      
      game.diceCurrentPlayer();      
      $("#infobox-button").text("Click to Dice, " + game.currentPlayer.name);
      $("#story-title").text("Get lucky, "+game.currentPlayer.name+"! Dice to increase your attack!");
      
      $('#infobox-button').on('click', function () {
        
        game.diceCurrentPlayer();
        game.switchPlayer();
        $('#infobox-button').off();
        setTimeout(() => {
          $("dice div").hide();
        }, 2000);

        let player1Total = player1prop + player1.currentDiceValue;
        let player2Total = player2prop + player2.currentDiceValue;
        $("#story-title").text("Wow, what a fight! Here yo go:");
        $("#story").text(player1.name + ": "+player1Total+" VS. "+player2.name+": "+player2Total);
        
        setTimeout(() => {
          $("#story").text("");
        },2500);

        game.findWinner(player1Total, player2Total);
        game.cleanBattlefield();

        // check if cards left, game is over or another round to play
        if (player1.currentCards.length === 0 && player1.currentCards.length === 0) {
          game.updateBoard();
          if (game.checkGameOver() === true) {
            console.log("Gameover");
          } else {
            game.currentRound++;
            fillCardStack();
            startPhase1();
          }
        } else startPhase2();
      }); // end dice for player 2   
    }); // end dice for player 1
  }); // end chose property
} // end of battle function

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}



