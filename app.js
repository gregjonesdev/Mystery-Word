const express = require ('express')
const app = express()
const session = require('express-session')
//const mainRouter = require ('./routes/main.js')
const gameRouter = require ('./routes/game.js')

const mustacheExpress = require('mustache-express')

const status = require('./models/status.js')
//const mysteryWord = require('./models/words.js')

app.use(express.static('public'))

app.engine('mustache', mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  mysteryWord: undefined,
  guesses: undefined,
  lettersGuessed: undefined
  //guess: undefined
}))






app.get('/', function(req, res) {
app.use('/game', gameRouter)
app.post('/guess', gameRouter)
app.post('/quit', gameRouter)

console.log("Router checkpoint 1: " + req.params)
console.log("session secret: " + req.session.secret)

/* If session exists, go right to the game */
if(req.session.secret) {
  return res.redirect('/game')
  }
  res.render('welcome')
})


app.post('/launch', function (req, res){
  console.log("Router checkpoint 2: ")

  //Assign state values here
  req.session.secret = "password2"
  console.log("session secret: " + req.session.secret)

  console.log("status.check from inside post/launch: " )
  res.redirect('/game')
})



// app.post('/guess', function(req, res){
//   //console.log("req.body.guess: " + req.body.guess)
//   //res.render('game', {guesses: guesses, word: word})
//   res.send("hello")
// })








//app.use('/', mainRouter)

app.listen(3000, function(){
  console.log("10-2 on Port 3000")
})
