/*jshint esversion: 6 */

class Game {
  constructor(cardsArray){
    this.cardsArray = cardsArray;
    this.currentPlayer = {};
    this.currentPropertyInBattle = null;
    this.currentPhase = 0;
    this.currentRound = 1;
    this.roundsToPlay = 1;
  }

  shuffle(array) {
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

  fillCardStack() {
    game.shuffle(game.cardsArray);
  
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

  startGame() {
    // TODO: get info with input field

    game.roundsToPlay = Number(prompt("How many round would you like to play?"));
    $("#infobox-button").off();

    // Dice, who starts first
    $("#instr").text("Every player dices once to see who starts.");
    $("#story-title").text("Let's see who can pick the first card...");

    $("#infobox-button").text("Click to Dice, " + player1.name);
    $("dice div").show();

    //clicked on dice
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
        game.startPhase1();
      });
    });
  }


  // Battle-Phase:  Current player choses property of current card on battlefield.
  //                Then each Player can use PowerUp and dices (TODO)
  //                When players stacks are empty, check if there is another round to play
  //                and if not, who won ==> Gameover
  startBattle() {
    game.currentPhase = 3;
    $(".bc").off();
    setTimeout(() => {
      $("#story").text("");
    },1500);
    $("#instr").text(game.currentPlayer.name + " needs to pick a character trait to attack with. Click on the character trait of choice on your card.");
    $("#story-title").text("How do you want to attack your oponent?");
    
  
    // Current player choses property to attack
    $("#battle-field .bc p").on("click", function () {
      event.preventDefault();
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
  
          game.findWinner(player1Total, player2Total);
          game.cleanBattlefield();
  
          // check if cards left, game is over or another round to play
          if (player1.currentCards.length === 0 && player1.currentCards.length === 0) {
            game.updateBoard();
            if (game.checkGameOver() === true) {
              console.log("Gameover");
            } else {
              game.currentRound++;
              game.cardsArray = cardsArray;
              game.fillCardStack();
              game.startPhase1();
            }
          } else game.startPhase2();
        }); // end dice for player 2   
      }); // end dice for player 1
    }); // end chose property
  } // end of battle function
  
  // Phase 2: Each Player picks a card for upcoming battle
  //          When done, Battle starts
  startPhase2() {
    game.currentPhase = 2;
    $(".bc").off();
    game.updateBoard();

    $("#instr").text("Each player needs to pick ONE card for the upcoming battle.");
    $("#story-title").text("Get ready for battle! Chose your hero...");

    $("#p1-stack .bc").on("click", function () {
      event.preventDefault();
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
          game.startBattle();
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
          game.startBattle();
        }
      }
    });
  }

  // Phase 1: Player pick their cards from main stack.
  //          When done, Phase 2
  startPhase1() {
    game.fillCardStack();
    game.currentPhase = 1;
    game.updateBoard();

    $("#instr").text("Pick a card to build your personal army. When each player has got 3 soldiers, you are prepared for battle!");
    $("#story-title").text("Which warrior should be part of your army?");


    // Click Listener Cardstack
    $("#card-stack .bc").on("click", function () {
      event.preventDefault();
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

      //check if all cards from game stack are distributed
      if (player1.currentCards.length + player2.currentCards.length === maxCards) {
        game.startPhase2();
      }
    });
  }

  rollTheDice() {
    let i,
        faceValue,
        sum = 0,
        output = '',
        diceCount = 2;
    for (i = 0; i < diceCount; i++) {
        faceValue = Math.floor(Math.random() * 6);
        output += "&#x268" + faceValue + "; ";
        sum += faceValue+1;
    }
    document.getElementById('dice').innerHTML = output;
    return sum;
  }

  diceCurrentPlayer() {
    game.currentPlayer.currentDiceValue = game.rollTheDice();
    setTimeout(() => {
      $("#dice").text("");
    }, 1200);
    game.switchPlayer();
  }

  checkGameOver() {
    if (game.currentRound === game.roundsToPlay) {
      let winner;
      if (player1.score === player2.score){
        $("#infobox button").text("Game over! Score is equal. Please choose who is best in a proper fist fight");
      } else {
        if (player1.score > player2.score) winner = player1;
        else winner = player2;
        $("#story-title").text("Game over! The winner is " + winner.name);
        $("#infobox button").text("Game Over! Click here to start again!");
        $("#infobox-button").on("click", function () {
          game.restartGame();
        });
      }
    return true;
    } else return false;
  }

  restartGame() {
    game.cleanBattlefield();
    player1.score = 0;
    player2.score = 0;
    game.updateBoard();
    game.startGame();
  }

  cleanBattlefield() {
    $("#battle-field .bc").remove();
    player1.currentCardInBattle = null;
    player2.currentCardInBattle = null;
    player1.currentDiceValue = null;
    player2.currentDiceValue = null;
    game.currentPropertyInBattle = null;
    $("dice div").hide();
  }

  switchPlayer() {
    if (game.currentPlayer === player1) {
      game.currentPlayer = player2;
    } else if (game.currentPlayer === player2) {
      game.currentPlayer = player1;
    }
    $("#p1-board").toggleClass("selected");
    $("#p2-board").toggleClass("selected");
    $("#infobox button").text("Your turn "+game.currentPlayer.name);
  }

  updateBoard(){
    $("#infobox button").text("Your turn "+game.currentPlayer.name);
    $("#p1-score").text(player1.score);
    $("#p2-score").text(player2.score);
  }

  findWinner(BC1property, BC2property) {
    if (BC1property === BC2property) {
      console.log("Equal!");
      game.switchPlayer();
  
    } else if (BC1property > BC2property) {
        console.log(player1.name + " won!");
        game.currentPlayer = player1;
  
    } else if (BC1property < BC2property) {
        console.log(player2.name + " won!");
        game.currentPlayer = player2;
    }
    player1.score += BC1property;
    player2.score += BC2property;
  }
}