const express = require ('express')
const router = express.Router()
const status = require('../models/status.js')
const mysteryWord = require('../models/words.js')

let word
let guesses

const updateState = function(request) {
  request.session.mysteryWord = word
  request.session.guesses = guesses
}


router.use(function(req, res, next){
  // console.log("Router checkpoint 3: " + req.params)
  // console.log("middleware to authenticate the player")
  // check authentication here. if none, redirect to welcome
  // console.log("session secret from game router: " + req.session.secret)
  if (!req.session.secret) {
    return res.render('welcome')
  }

  /* At this point, assign a mystery word to guess */

  word = mysteryWord.new
  console.log(word + " just assigned as mystery word")
  guesses = status.guesses
  updateState(req)
  //req.session.mysteryWord = word
  //req.session.guesses = guesses
  console.log("req.session.mysteryWord: " + req.session.mysteryWord)
  next()
})

router.all('*', function(req, res){
  console.log("Router checkpoint 4: ")
  res.render('game', {guesses: guesses, word: word})

})

/* What will happen if user does a post/guess? */

router.post('/guess', function(req, res){

})








module.exports = router
