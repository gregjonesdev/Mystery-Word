// This is an object with all the english words.

const fs = require('fs')

const allWords = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n")
let mysteryWord = function (i) {
  return allWords[i].split("")
}

module.exports = {
  new: mysteryWord,
  length: allWords.length
}
