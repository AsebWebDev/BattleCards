/*jshint esversion: 6 */

// T O D O
// - @media? to make site fully responsive on small screens
// create Readme
// add Backgrounds
// add sounds & backgroudn music?
// add an extra InfoBoard for live game instructions.
// find a better Font
  // event.preventDefault() überall hinzufügen
  // 

// G E T   D O M 


// G A M E    I N I T

let game = new Game(cardsDatabase); //array comes from Character.js
let player1 = new Player("Player 1");
let player2 = new Player("Player 2");
let maxCards = 6;
let sndClick = $("#snd-click")[0];
  sndClick.load();
let sndStartBattle = $("#snd-startBattle")[0];
  sndStartBattle.load();
let sndDice = $("#snd-dice")[0];
  sndDice.load();
let sndBgMusic = $("#bg-music")[0];
  sndBgMusic.load();

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

// Turn sound off/on button click event

$("#sound-button").on("click", function () {
  console.log("Sound Button clicked");
  event.preventDefault();

  if ($(this).text() === "Sound OFF") {
    console.log("Sound stop");
    sndBgMusic.pause();
    $(this).text("Sound ON");
  } else if ($(this).text() === "Sound ON") {
    sndBgMusic.play();
    $(this).text("Sound OFF");
    console.log("Sound play");
  }
});


