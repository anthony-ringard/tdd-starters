'use strict'

const Game = require('../game.js')

describe('The test environment', () => {
  it('should pass', () => {
    expect(true).toBeTruthy();
  })

  it('should access game', () => {
    expect(Game).toBeDefined();
  })

  it('should add players and display their name and number', ()=>{
    var game = new Game()
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
})
