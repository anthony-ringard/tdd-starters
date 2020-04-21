'use strict'

const Game = require('../game.js')
const GameMaster = require('../game_master.js')

describe('The test environment', () => {
  it('should pass', () => {
    expect(true).toBeTruthy();
  })

  it('should access game', () => {
    expect(Game).toBeDefined();
  })

  it('should add players and display their name and number', ()=>{
    var game = new Game(console)
    var consoleValues = [];
    var logMock = function(value) {
        consoleValues.push(value)
    }
    console.log = logMock

    expect(game.add('Julien')).toBe(true)
    expect(game.add('Marvin')).toBe(true)
    expect(consoleValues).toEqual([
      'Julien was added',
      "They are player number 1",
      'Marvin was added',
      "They are player number 2",
    ])

  })

  it('golden master', () => {

    var consoleValues = [];
    var logMock = {
      log: function(logMessage) {
        consoleValues.push(logMessage);
      }
    }

    var consoleValuesMaster = [];
    var logMockMaster = {
      log: function(logMessage) {
        consoleValuesMaster.push(logMessage);
      }
    }

    var game = new Game(logMock)
    var gameMaster = new GameMaster(logMockMaster)

    game.add('Chet')
    game.add('Pat')
    game.add('Sue')
  
    gameMaster.add('Chet')
    gameMaster.add('Pat')
    gameMaster.add('Sue')


    var notAWinner = false
    var notAWinnerMaster = false


    do {
      var random = Math.random(); 

      game.roll(Math.floor(random * 6) + 1)
      gameMaster.roll(Math.floor(random * 6) + 1)
    
      if (Math.floor(Math.random() * 10) == 7) {
        notAWinner = game.wrongAnswer()
        notAWinnerMaster = gameMaster.wrongAnswer()
      } else {
        notAWinner = game.wasCorrectlyAnswered()
        notAWinnerMaster = gameMaster.wasCorrectlyAnswered()
      }

    } while (notAWinner)

    expect(consoleValues).toEqual(consoleValuesMaster);

  })

})
