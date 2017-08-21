const express = require ('express')
const router = express()
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

const status = require('../models/status.js')
const mysteryWord = require('../models/words.js')

let word
let guesses
let lettersGuessed
let hiddenWord
let inGame = [true]

const updateState = function(request) {
  request.session.mysteryWord = word
  request.session.guesses = guesses
  request.session.hiddenWord = hiddenWord
  request.session.inGame = inGame
  request.session.message = message
  request.session.lettersGuessed = lettersGuessed
}

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:false}))
router.use(expressValidator());

router.use(function(req, res, next){
  if (!req.session.secret) {
    return res.render('welcome')
  }

  if (!word) {
    let i = Math.floor(Math.random() * mysteryWord.length)
    word = mysteryWord.new(i)
    hiddenWord = status.newHidden(word)
  }
  guesses = status.guesses
  updateState(req)
  next()
})

router.get('*', function(req, res){
  res.render('game', {guesses: guesses, game: inGame, word: hiddenWord})
})
let error = false
let message = ""

router.post('/guess', function(req, res){

  if (guesses.length > 1) {
    req.checkBody("guess", 'Dont forget to guess a letter!').notEmpty()
    error = req.validationErrors()

    if (!error) {
      req.checkBody("guess", 'Please enter one character at a time').len(0,1)
      error = req.validationErrors()
    }

    if (!error) {
      req.checkBody("guess", 'Please enter letters only!').isAlpha()
      error = req.validationErrors()
    }

    if (error) {
      return res.render('game', {guesses: guesses, game: inGame, word: hiddenWord, message: error[0].msg})
   }

    if(!error) {
      if (!status.newGuess(req.body.guess)) {
        message = req.body.guess + " has already been guessed!"
        return res.render('game', {guesses: guesses, game: inGame, word: hiddenWord, message: message})
      } else {
          if (!status.checkLetter(req.body.guess, word)){
            message = req.body.guess + " is not in the word."
            status.guesses.pop()
            return res.render('game', {guesses: guesses, game: inGame, word: hiddenWord, message: message})

          } else if (status.checkLetter(req.body.guess, word)) {
                message = req.body.guess + " was found in the word!"
                status.rightGuess(req.body.guess, word, hiddenWord)
                 if (status.winCheck(hiddenWord)) {
                   message = "Congratulations!"
                   inGame = false
                   updateState(req)
                   guesses = status.guesses
                   return res.render('game', {word: hiddenWord, again: inGame, message: message})
                 }
                return res.render('game', {guesses: guesses, game: inGame, word: hiddenWord, message: message})
            }
        }
    }
    return res.render('game', {guesses: guesses, game: inGame, word: hiddenWord, message: message})
    updateState(req)
  }

  message = "Sorry, you lose."
  inGame = false
  hiddenWord = word
  status.guesses = guesses
  updateState(req)
  return res.render('game', {word: hiddenWord, game: inGame, message: message})
})

router.post('/again', function (req, res) {

  let i = Math.floor(Math.random() * mysteryWord.length)
  word = mysteryWord.new(i)
  status.hiddenWord = []
  hiddenWord = status.newHidden(word)
  inGame = true
  guesses = status.guesses = ["guess", "guess","guess","guess","guess","guess","guess","guess"]
  message = ""
  updateState(req)
  res.render('game', {word: hiddenWord, guesses: guesses, game: inGame, message: message})
})

module.exports = router
