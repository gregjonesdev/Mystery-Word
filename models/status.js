let guesses = ["guess", "guess","guess","guess","guess","guess","guess","guess"]

/* all letters stored in lower case */
let lettersGuessed = []

let hiddenWord = []

const newHidden = function(word) {
  if (hiddenWord.length===0) {
    for (i=0; i<word.length; i++) {
      hiddenWord.push("")
    }
  }
  return hiddenWord
}

/* Return false if this letter has already been guessed */
const newGuess = function(letter){
  if (lettersGuessed.indexOf(letter.toLowerCase())==-1) {
    lettersGuessed.push(letter.toLowerCase())
    console.log("Now lettersGuessed array is: " + lettersGuessed)
    return true;
  }
  console.log(letter + " has already been guessed!")
  return false;
}

const checkLetter = function (letter, mysteryWord) {
  //if mystery word contains that letter, display it and return true
  console.log("Does " + mysteryWord + " contain the letter " + letter + "?")
  if (mysteryWord.indexOf(letter)==-1) {
    console.log("No!")
  }
  else console.log ("yes!")

  // else pop a guess from guesses and return false
}


module.exports = {
guesses: guesses, //number of guesses remaining
lettersGuessed: lettersGuessed,
checkLetter: checkLetter,
newHidden: newHidden,
hiddenWord: hiddenWord,
newGuess: newGuess
// this will be a function to call when the user guesses a letter. It needs to:
//       1. check if the letter has already been guessed
//       2. check if the letter is contained in the mysteryword
//       3.
}
