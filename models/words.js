// This is an object with all the english words.

// const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
const fs = require('fs')


const allWords = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n")
let i = Math.floor(Math.random() * allWords.length)
let mysteryWord = allWords[i].split("")


module.exports = {
  new: mysteryWord
}
