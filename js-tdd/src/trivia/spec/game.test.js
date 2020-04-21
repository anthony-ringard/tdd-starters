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

  it('should return correct answer', () => {
    
    var consoleValues = [];
    var logMock = {
      log: function(logMessage) {
        consoleValues.push(logMessage);
      }
    }
    var game = new Game(logMock)

    game.add('Julien')
    game.add('Marvin')

    game.wasCorrectlyAnswered()
    expect(consoleValues).toEqual(["Julien was added",
    "They are player number 1",
       "Marvin was added",
       "They are player number 2",
       "Answer was correct!!!!",
       "Julien now has 1 Gold Coins."])
  })

  it('should return instanciate questions', () => {
    var game = new Game(console)
    
    expect(game.getCategories().popQuestions.length).toEqual(50)
    expect(game.getCategories().rockQuestions.length).toEqual(50)
    expect(game.getCategories().scienceQuestions.length).toEqual(50)
    expect(game.getCategories().sportsQuestions.length).toEqual(50)
  })


  it('should user with penaltyBox after wrong answer', () => {
    var game = new Game(console)

    game.add('Julien')
    game.add('Marvin')

    game.roll(1)
    game.wrongAnswer()



    expect(game.isPlayerInPenaltyBox(0)).toBe(true);
  
  })


  // it('should usergo out penaltyBox with good answer', () => {
  //   var game = new Game(console)

  //   game.add('Julien')
  //   game.add('Marvin')

  //   game.roll(1)
  //   game.wrongAnswer()

    
  //   game.roll(5);
  //   game.wasCorrectlyAnswered()


  //   expect(game.isPlayerInPenaltyBox(0)).toBe(true);
  
  // })

  it('should change player', () => {
    var game = new Game(console)

    game.add('Julien')
    game.add('Marvin')
    game.add('Rachid')

    expect(game.getCurrentPlayer()).toEqual(0);

    game.roll(5);
    game.wasCorrectlyAnswered()

  
    expect(game.getCurrentPlayer()).toEqual(1);

    game.roll(5);
    game.wrongAnswer()

  
    expect(game.getCurrentPlayer()).toEqual(2);

    game.roll(4);
    game.wrongAnswer()

  
    expect(game.getCurrentPlayer()).toEqual(0);
  
  })


  it('should increment places', () => {
    var game = new Game(console)

    game.add('Julien')
    game.add('Marvin')

    game.roll(6);

    expect(game.getCurrentPlayerPlace()).toEqual(6);

    game.wasCorrectlyAnswered()
    game.roll(6);
    game.wasCorrectlyAnswered()
    game.roll(6);

    expect(game.getCurrentPlayerPlace()).toEqual(0);
  })


  it('should increment places when go out of penalty box', () => {
    var game = new Game(console)

    game.add('Julien')
    game.add('Marvin')

    game.roll(6);
    game.wrongAnswer()
    game.roll(6);
    game.wasCorrectlyAnswered()
    game.roll(5);
    game.wrongAnswer()
    game.roll(6);
    game.wasCorrectlyAnswered()
    game.roll(6);
    game.wasCorrectlyAnswered()

    expect(game.getCurrentPlayerPlace()).toEqual(0);
  })

  it('should increment purse when go out of penalty box', () => {
    var game = new Game(console)

    game.add('Julien')
    game.add('Marvin')

    game.roll(6);
    game.wasCorrectlyAnswered()
  
    expect(game.getPlayerPurse(0)).toEqual(1);
  
    game.roll(6);
    game.wrongAnswer()

    game.roll(6);
    game.wasCorrectlyAnswered()

    game.roll(5);
    game.wasCorrectlyAnswered()

    expect(game.getPlayerPurse(1)).toEqual(1);
  })


})
