/*jshint esversion: 6 */

function printCharacters(){
  for (let i = 0; i < game.cardsArray.length; i++) {
    console.log("#"+i+" "+game.cardsArray[i].name);
  }
}

