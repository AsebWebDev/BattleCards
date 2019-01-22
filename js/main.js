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
fillCardStack();

//First set Player1 default, after clicking Start,
//the users will dice who is first
game.currentPlayer = player1;

// A click event is set for the game to start. 
// After starting users will be asked how many rounds they want to play,
// and dice who is first.

$("#infobox button").on("click", function () {
  // TODO: get info with input field

  game.roundsToPlay = Number(prompt("How many round would you like to play?"));
  $("#infobox button").off();

  // Dice, who starts first
  $("#infobox button").text("Please Dice, " + player1.name);
  $("dice div").show();

  $('#dice-button').on('click', function () {
    player1.currentDiceValue = game.rollTheDice();
    $("#infobox button").text("Please Dice, " + player2.name);
    $('#dice-button').off();
    $('#dice-button').on('click', function () {
      if (game.rollTheDice() > player1.currentDiceValue) game.currentPlayer = player2;
      player1.currentDiceValue = 0;
      $('#dice-button').off();
      setTimeout(() => {
        $("#dice").text("");
        $("dice div").hide();
        // $("dice").hide();
      }, 2000);
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

function dice(player) {
  $("dice div").show();
  $('#dice-button').on('click', function () {
    player.currentDiceValue = game.rollTheDice();
  });
}

// Phase 1: Player pick their cards from main stack.
//          When done, Phase 2
function startPhase1() {
  game.currentPhase = 1;
  game.updateBoard();

  // Click Listener Cardstack
  $("#card-stack .bc").on("click", function () {
    let clickedCard = $(this).attr("name");
    let clickedCharacter = game.cardsArray.filter(obj => obj.name === clickedCard)[0];
    console.log("Clicked Char " + clickedCharacter.name);
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

// TODO: Dry code?
// Phase 2: Each Player picks a card for upcoming battle
//          When done, Battle starts
function startPhase2() {
  game.currentPhase = 2;
  $(".bc").off();
  game.updateBoard();

  $("#p1-stack .bc").on("click", function () {
    let clickedCard = $(this).attr("name");
    let clickedCharacter = game.cardsArray.filter(obj => obj.name === clickedCard)[0];

    if (game.currentPlayer === player1) {
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
  console.log("BATTLE!");

  // Current player choses property to attack
  $("#battle-field .bc p").on("click", function () {
    let selectedProperty = $(this).prop("class");
    game.currentPropertyInBattle = selectedProperty;
    let player1prop = player1.currentCardInBattle[game.currentPropertyInBattle];
    let player2prop = player2.currentCardInBattle[game.currentPropertyInBattle];

    $("#infobox button").text("Please Dice, " + game.currentPlayer.name);
    $("dice div").show();
    $('#dice-button').on('click', function () {
      game.currentPlayer.currentDiceValue = game.rollTheDice();
      setTimeout(() => {
        $("#dice").text("");
      }, 1200);
      game.switchPlayer();
      $("#infobox button").text("Please Dice, " + game.currentPlayer.name);
      $('#dice-button').on('click', function () {
        game.currentPlayer.currentDiceValue = game.rollTheDice();
        game.switchPlayer();
        $('#dice-button').off();
        setTimeout(() => {
          $("dice div").hide();
        }, 2000);

        let player1Total = player1prop * player1.currentDiceValue;
        let player2Total = player2prop * player2.currentDiceValue;

        findWinner(player1Total, player2Total);
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

function fillCardStack() {
  shuffle(game.cardsArray);

  for (let i = 0; i < maxCards; i++) {
    let htmlBc = "";
    htmlBc += '<div class="bc" name="' + game.cardsArray[i].name + '">';
    htmlBc += '<img src=' + game.cardsArray[i].img + '>';
    htmlBc += '<span>' + game.cardsArray[i].name + '</span>';
    htmlBc += '<div class="properties">';
    htmlBc += '<p class="strength">Strength: ' + game.cardsArray[i].strength + '</p>'
    htmlBc += '<p class="intelligence">Intelligence ' + game.cardsArray[i].intelligence + '</p>'
    htmlBc += '<p class="humor">Humor: ' + game.cardsArray[i].humor + '</p>'
    htmlBc += '<p class="cuteness">Cuteness: ' + game.cardsArray[i].cuteness + '</p>'
    cardStack.append(htmlBc);
  }
}



function findWinner(BC1property, BC2property) {
  if (BC1property === BC2property) {
    console.log("Equal!");
    game.switchPlayer();
    // return 0; // returns 0, if equal

  } else if (BC1property > BC2property) {
    console.log(player1.name + " won!");
    game.currentPlayer = player1;
    // return 1; // returns 1, if Winner is Player1

  } else if (BC1property < BC2property) {
    console.log(player2.name + " won!");
    game.currentPlayer = player2;
    // return 2; // returns 2, if WInner is Player 2
  }
  game.currentPlayer.score += BC1property + BC2property;
}