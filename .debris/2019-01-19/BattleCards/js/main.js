/*jshint esversion: 6 */

// G E T   D O M 
let cardStack = $("#card-stack");
let allCards = $(".bc");

// G A M E    I N I T

let game = new Game(cardsArray); //array comes from Character.js
let player1 = new Player();
let player2 = new Player();

printCharacters(); // to console, just for Dev
fillCardStack();



// F U N C T I O N S

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function fillCardStack(){
  let htmlBc = "";
  htmlBc += '<div class="bc">';
  htmlBc += '<img>';
  htmlBc += '<p></p>';

  shuffle(game.cardsArray);
  for (let i = 0; i < 6; i++) {
    cardStack.append(htmlBc);
    $("#card-stack .bc:last img").attr("src", game.cardsArray[i].img)

  }
}

function findWinner (BC1property, BC2property){
  if (BC1property === BC2property) return 0;    // returns 0, if equal
  else if (BC1property > BC2property) return 1; // returns 1, if Winner is Player1
  else if (BC1property < BC2property) return 2; // returns 2, if WInner is Player 2
}