const express = require ('express')
const app = express()
const session = require('express-session')
const gameRouter = require ('./routes/game.js')
const mustacheExpress = require('mustache-express')
const status = require('./models/status.js')

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
}))

app.use('/game', gameRouter)
app.post('/guess', gameRouter)
app.post('/again', gameRouter)

app.get('/', function(req, res) {

if(req.session.secret) {
  return res.redirect('/game')
  }
  res.render('welcome')
})

app.post('/launch', function (req, res){
  req.session.secret = "password2"
  res.redirect('/game')
})

app.listen(3000, function(){
  console.log("10-2 on Port 3000")
})
