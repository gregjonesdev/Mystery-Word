
let allWords = require('word-list-google')
let words = []

for(i=0; i<1000; i++) {
  if (allWords.englishUsaNoSwears[i].length>4 && allWords.englishUsaNoSwears[i].length <10) {
    words.push(allWords.englishUsaNoSwears[i])
  }
}

let mysteryWord = function (i) {
  return words[i]
}

module.exports = {
  new: mysteryWord,
  length: words.length
}
