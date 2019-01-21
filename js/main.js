/*jshint esversion: 6 */
// T O D O
// - @media?

// G E T   D O M 
  let cardStack = $("#card-stack");

// G A M E    I N I T

  let game = new Game(cardsArray); //array comes from Character.js
  let player1 = new Player("Player 1");
  let player2 = new Player("Player 2");
  let maxCards = 6;

  printCharacters(); // to console, just for Dev
  fillCardStack();

//set Player 1 default ... TODO: dice, who is first
  game.currentPlayer = player1;

// Start Game Button
  $("#infobox button").click(function () {
   startPhase1();
  });

// Enter names
  $("#p1-name").click(function(){
    let enteredName = prompt("What is your name, Player 1?");
    if (enteredName != null) {
      player1.name = enteredName;
      $("#p1-name span").text(player1.name);
    }
  });

  $("#p2-name").click(function(){
    let enteredName = prompt("What is your name, Player 2?");
    if (enteredName != null) {
      player2.name = enteredName;
      $("#p2-name span").text(player2.name);
    }
  });

// ###### F U N C T I O N S ######

function Dice() {
  $("dice div").show();
  $('#dice-button').on('click', function(){
    game.currentPlayer.currentDiceValue = game.rollTheDice();
    $('#dice-button').off();
  });
}

function startPhase1() {
  game.currentPhase = 1;
  
  $("#infobox button").text("Your turn "+game.currentPlayer.name);

  // Click Listener Cardstack
  $("#card-stack .bc").on("click", function () {
    clickedCard = $(this).attr("name");
    game.currentPlayer.currentCards.push(clickedCard);
    if (game.currentPlayer === player1) {
      $(".p1-cards").append(this);
    } else {
      $(".p2-cards").append(this);
    }
    switchPlayer();

    //check if all cards are distributed
    if (player1.currentCards.length + player2.currentCards.length === maxCards) {
      startPhase2();
    }
  });
}

function startPhase2() {
  game.currentPhase = 2;
  $(".bc").off();
  $("#p1-stack .bc").on("click", function () {
    clickedCard = $(this).attr("name");

    if (game.currentPlayer === player1) {
      $("#bf-p1").append(this);
      let indexOfCard = player1.currentCards.indexOf(clickedCard);
      player1.currentCards.slice(indexOfCard, 1);
      switchPlayer();

    } 
  });

  $("#p2-stack .bc").on("click", function () {
    clickedCard = $(this).attr("name");

    if (game.currentPlayer === player2) {
      $("#bf-p2").append(this);
      let indexOfCard = player1.currentCards.indexOf(clickedCard);
      player2.currentCards.slice(indexOfCard, 1);
      switchPlayer();
    } 
  });

    // check if all cards are distributed
    // if (player1.currentCards.length + player2.currentCards.length === maxCards) {
    //   startPhase2();
    // }
}

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
    htmlBc += '<p>Strength: ' + game.cardsArray[i].strength + '</p>'
    htmlBc += '<p>Intelligence ' + game.cardsArray[i].intelligence + '</p>'
    htmlBc += '<p>Humor: ' + game.cardsArray[i].humor + '</p>'
    htmlBc += '<p>Cuteness: ' + game.cardsArray[i].cuteness + '</p>'
    cardStack.append(htmlBc);
  }
}

function switchPlayer() {
  if (game.currentPlayer === player1) {
    game.currentPlayer = player2;
  } else if (game.currentPlayer === player2) {
    game.currentPlayer = player1;
  }
  $("#infobox button").text("Your turn "+game.currentPlayer.name);
}

function findWinner(BC1property, BC2property) {
  if (BC1property === BC2property) return 0; // returns 0, if equal
  else if (BC1property > BC2property) return 1; // returns 1, if Winner is Player1
  else if (BC1property < BC2property) return 2; // returns 2, if WInner is Player 2
}