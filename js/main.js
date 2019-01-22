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
  event.preventDefault();
  game.startGame();
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









