'use strict'

const TrivialGame = require('./game.js')

var notAWinner = false

var game = new TrivialGame(console)

game.addPlayer('Chet')
game.addPlayer('Pat')
game.addPlayer('Sue')

do {

  game.play(Math.floor(Math.random() * 6) + 1)

  if (Math.floor(Math.random() * 10) == 7) {
    notAWinner = game.wrongAnswer()
  } else {
    notAWinner = game.correctAnswer()
  }

} while (notAWinner)
