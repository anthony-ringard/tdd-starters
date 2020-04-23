
const Player = require('./player.js')
const Category = require('./category.js')

const popCategories = [0, 4, 8]
const scienceCategories = [1, 5, 9]
const sportCategories = [2, 6, 10]
const rockCategories = [3, 7, 11]

const CATEGORY_POP = 'Pop';
const CATEGORY_SCIENCE = 'Science';
const CATEGORY_SPORT = 'Sports';
const CATEGORY_ROCK = 'Rock';

class TrivialGame {

  constructor(consoleCustom) {
    this.console = consoleCustom;

    this.players = new Array()
  
    this.currentPlayer = 0
    this.isGettingOutOfPenaltyBox = false
  
    this.categories = [
      new Category(CATEGORY_POP, [0, 4, 8]),
      new Category(CATEGORY_SCIENCE, [1, 5, 9]),
      new Category(CATEGORY_SPORT, [2, 6, 10]),
      new Category(CATEGORY_ROCK, [3, 7, 11]),
    ]
  }

  getCategories() {
    return this.categories;
  }


  isCurrentPlayerWinTheGame() {
    return !(this.getCurrentPlayer().getPurse() == 6)
  }

  getCurrentCategoryByCurrentPlayerPlace() {
    var searchedCategory = null;

    this.categories.forEach( category => {
        if(category.isInPlace(this.getCurrentPlayerPlace())) {
          searchedCategory = category
        }
    }) 

    return searchedCategory
  }

  isPlayable(howManyPlayers) {
    return howManyPlayers >= 2
  }

  addPlayer(playerName) {
    this.players.push(new Player(playerName))

    this.console.log(playerName + ' was added')
    this.console.log('They are player number ' + this.getNumberOfPlayers())

    return true
  }

  getNumberOfPlayers() {
    return this.players.length
  }

  askCurrentCategoryQuestion() {
    
    this.console.log(this.getCurrentCategoryByCurrentPlayerPlace().shiftQuestion())
  }

  play(roll) {
    this.console.log(this.getCurrentPlayerName() + ' is the current player')
    this.console.log('They have rolled a ' + roll)

    if (this.isCurrentPlayerInPenaltyBox()) {

      if(!this.isPairRolled(roll)) {
        this.isGettingOutOfPenaltyBox = true
        this.console.log(this.getCurrentPlayerName() + ' is getting out of the penalty box')
  
        this.moveCurrentPlayerPlace(roll)
        this.askCurrentCategoryQuestion()
      } else {
        this.console.log(this.getCurrentPlayerName() + ' is not getting out of the penalty box')
        this.isGettingOutOfPenaltyBox = false
      }

    } 
  
    if (!this.isCurrentPlayerInPenaltyBox()) {
      this.moveCurrentPlayerPlace(roll)
      this.askCurrentCategoryQuestion()
    }
  }

  isPairRolled(roll) {
      return roll % 2 == 0
  }

  isCurrentPlayerInPenaltyBox() {
    return this.isPlayerInPenaltyBox(this.currentPlayer)
  }

  isPlayerInPenaltyBox(playerIndex) {
    return this.players[playerIndex].isInPenaltyBox();
  }

  correctAnswer() {

    if (this.isPlayerInPenaltyBox(this.currentPlayer) && !this.isGettingOutOfPenaltyBox) {
      this.switchPlayer()
      return true
    }

    this.console.log('Answer was correct!!!!')
    this.addCoin();

    var winner = this.isCurrentPlayerWinTheGame()
    this.switchPlayer()

    return winner
  }

  addCoin() {
    this.getCurrentPlayer().setPurse(this.getCurrentPlayer().getPurse() + 1);
    this.console.log(this.getCurrentPlayerName() + ' now has ' + this.getCurrentPlayer().getPurse() + ' Gold Coins.')
  }

  wrongAnswer() {
    this.console.log('Question was incorrectly answered')
    this.console.log(this.getCurrentPlayerName() + ' was sent to the penalty box')
    this.getCurrentPlayer().setInPenaltyBox(true)

    this.switchPlayer()
    return true
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayer];
  }
  getCurrentPlayerIndex() {
    return this.currentPlayer;
  }

  switchPlayer(){
    this.currentPlayer += 1

    if (this.currentPlayer == this.players.length) {
      this.currentPlayer = 0
    }
  }

  getCurrentPlayerPlace() {
    return this.getCurrentPlayer().getPlace()
  }

  getPlayerPurse(playerIndex) {
    return this.players[playerIndex].getPurse();
  }

  getCurrentPlayerName() {
    return this.getCurrentPlayer().getName()
  }

  moveCurrentPlayerPlace(roll) {
    this.getCurrentPlayer().setPlace(this.getCurrentPlayerPlace() + roll)
    if (this.getCurrentPlayerPlace() > 11) {
      this.getCurrentPlayer().setPlace(this.getCurrentPlayerPlace() - 12)
    }
    this.console.log(this.getCurrentPlayerName() + '\'s new location is ' + this.getCurrentPlayerPlace())
    this.console.log('The category is ' + this.getCurrentCategoryByCurrentPlayerPlace().getName())
  }

}

module.exports = TrivialGame