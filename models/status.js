let guesses = ["guess", "guess","guess","guess","guess","guess","guess","guess"]

/* all letters stored in lower case */
let lettersGuessed = []

let hiddenWord = []

const newHidden = function(word) {
 hiddenWord = []
 lettersGuessed = []
  console.log("From inside newHidden:  word: " + word)
  console.log("From inside newHidden:  hiddenWord: " + hiddenWord)
  //if (hiddenWord.length===0) {
    for (i=0; i<word.length; i++) {
      hiddenWord[i]=""
    }
  //}
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
  if (mysteryWord.indexOf(letter.toLowerCase())==-1) {
    console.log("No!")
    return false
  }
  else console.log ("yes!")
  return true

  // else pop a guess from guesses and return false
}

const wrongGuess = function(){
  guesses.pop()
  return guesses
}

const rightGuess = function(letter, mysteryWord, hiddenWord) {

  for (i=0; i<mysteryWord.length; i++) {
    if (mysteryWord[i]==letter.toLowerCase()){
      hiddenWord[i] = letter.toLowerCase()
    }
  }

}

const winCheck = function (hiddenWord) {
  for (i=0; i<hiddenWord.length; i++) {
    if (hiddenWord[i]=="") {
      return false
    }
  } return true;
}


module.exports = {
guesses: guesses, //number of guesses remaining
lettersGuessed: lettersGuessed,
checkLetter: checkLetter,
newHidden: newHidden,
hiddenWord: hiddenWord,
newGuess: newGuess,
wrongGuess: wrongGuess,
rightGuess: rightGuess,
winCheck: winCheck
}
