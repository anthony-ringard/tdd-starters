'use strict'

const TrivialGame = require('../game.js')
const GameMaster = require('../game_master.js')

describe('The test environment', () => {
  it('should pass', () => {
    expect(true).toBeTruthy();
  })

  it('should access game', () => {
    expect(GameMaster).toBeDefined();
  })

  it('should add players and display their name and number', ()=>{
    var game = new TrivialGame(console)
    var consoleValues = [];
    var logMock = function(value) {
        consoleValues.push(value)
    }
    console.log = logMock

    expect(game.addPlayer('Julien')).toBe(true)
    expect(game.addPlayer('Marvin')).toBe(true)
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

    var game = new TrivialGame(logMock)
    var gameMaster = new GameMaster(logMockMaster)

    game.addPlayer('Chet')
    game.addPlayer('Pat')
    game.addPlayer('Sue')
  
    gameMaster.add('Chet')
    gameMaster.add('Pat')
    gameMaster.add('Sue')


    var notAWinner = false
    var notAWinnerMaster = false


    do {
      var random = Math.random(); 

      game.play(Math.floor(random * 6) + 1)
      gameMaster.roll(Math.floor(random * 6) + 1)
    
      if (Math.floor(Math.random() * 10) == 7) {
        notAWinner = game.wrongAnswer()
        notAWinnerMaster = gameMaster.wrongAnswer()
      } else {
        notAWinner = game.correctAnswer()
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
    var game = new TrivialGame(logMock)

    game.addPlayer('Julien')
    game.addPlayer('Marvin')

    game.correctAnswer()
    expect(consoleValues).toEqual(["Julien was added",
    "They are player number 1",
       "Marvin was added",
       "They are player number 2",
       "Answer was correct!!!!",
       "Julien now has 1 Gold Coins."])
  })

  it('should return instanciate questions', () => {
    var game = new TrivialGame(console)

    game.getCategories().forEach(category => {
      expect(category.getQuestions().length).toEqual(50)
    })
  })


  it('should user with penaltyBox after wrong answer', () => {
    var game = new TrivialGame(console)

    game.addPlayer('Julien')
    game.addPlayer('Marvin')

    game.play(1)
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
    var game = new TrivialGame(console)

    game.addPlayer('Julien')
    game.addPlayer('Marvin')
    game.addPlayer('Rachid')

    expect(game.getCurrentPlayerIndex()).toEqual(0);

    game.play(5);
    game.correctAnswer()

  
    expect(game.getCurrentPlayerIndex()).toEqual(1);

    game.play(5);
    game.wrongAnswer()

  
    expect(game.getCurrentPlayerIndex()).toEqual(2);

    game.play(4);
    game.wrongAnswer()

  
    expect(game.getCurrentPlayerIndex()).toEqual(0);
  
  })


  it('should increment places', () => {
    var game = new TrivialGame(console)

    game.addPlayer('Julien')
    game.addPlayer('Marvin')

    game.play(6);

    expect(game.getCurrentPlayerPlace()).toEqual(6);

    game.correctAnswer()
    game.play(6);
    game.correctAnswer()
    game.play(6);

    expect(game.getCurrentPlayerPlace()).toEqual(0);
  })


  it('should increment places when go out of penalty box', () => {
    var game = new TrivialGame(console)

    game.addPlayer('Julien')
    game.addPlayer('Marvin')

    game.play(6);
    game.wrongAnswer()
    game.play(6);
    game.correctAnswer()
    game.play(5);
    game.wrongAnswer()
    game.play(6);
    game.correctAnswer()
    game.play(6);
    game.correctAnswer()

    expect(game.getCurrentPlayerPlace()).toEqual(0);
  })

  it('should increment purse when go out of penalty box', () => {
    var game = new TrivialGame(console)

    game.addPlayer('Julien')
    game.addPlayer('Marvin')

    game.play(6);
    game.correctAnswer()
  
    expect(game.getPlayerPurse(0)).toEqual(1);
  
    game.play(6);
    game.wrongAnswer()

    game.play(6);
    game.correctAnswer()

    game.play(5);
    game.correctAnswer()

    expect(game.getPlayerPurse(1)).toEqual(1);
  })


})
