const express = require ('express')
const app = express()
const mainRouter = require ('./routes/main.js')
const gameRouter = require ('./routes/game.js')

app.use(express.static('public'))

const mustacheExpress = require('mustache-express')

app.engine('mustache', mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')




app.use('/', mainRouter)







app.listen(3000, function(){
  console.log("10-2 on Port 3000")
})
