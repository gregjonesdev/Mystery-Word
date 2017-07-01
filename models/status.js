let guesses = ["guess", "guess","guess","guess","guess","guess","guess","guess"]

const soloCheck = function(letter) {
  if (letter.length === 1) {
    return true;
  }
  return false;
}

const letterCheck = function (letter) {
  if (alphabet.indexof(letter.toLowerCase())!= -1) {
    return true;
  }
  return false;
}


//const previouslyGuessed




const evaluateGuess = function(letter){



}

const alphabet = "abcdefghijklmnopqrstuvwxyz"

module.exports = {
guesses: guesses, //number of guesses remaining
lettersGuessed: [],
//guess: guess,
//singleLetterCheck: singleLetterCheck,
//evaluateGuess: evaluateGuess
// this will be a function to call when the user guesses a letter. It needs to:
//       1. check if the letter has already been guessed
//       2. check if the letter is contained in the mysteryword
//       3.
}
