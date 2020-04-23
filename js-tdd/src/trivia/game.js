
const popCategories = [0, 4, 8]
const scienceCategories = [1, 5, 9]
const sportCategories = [2, 6, 10]

const CATEGORY_POP = 'Pop';
const CATEGORY_SCIENCE = 'Science';
const CATEGORY_SPORT = 'Sports';
const CATEGORY_ROCK = 'Rock';

class TrivialGame {


  constructor(consoleCustom) {
    this.console = consoleCustom;

    this.players = new Array()
    this.places = new Array(6)
    this.purses = new Array(6)
    this.inPenaltyBox = new Array(6)
  
    this.currentPlayer = 0
    this.isGettingOutOfPenaltyBox = false
  
    this.categories = {
      popQuestions: [],
      scienceQuestions: [],
      sportsQuestions: [],
      rockQuestions: []
    }

    for (var i = 0; i < 50; i++) {
      this.categories.popQuestions.push('Pop Question ' + i)
      this.categories.scienceQuestions.push('Science Question ' + i)
      this.categories.sportsQuestions.push('Sports Question ' + i)
      this.categories.rockQuestions.push('Rock Question ' + i)
    }

  }

  getCategories() {
    return this.categories;
  }


  isCurrentPlayerWinTheGame() {
    return !(this.purses[this.currentPlayer] == 6)
  }

  getCurrentCategoryByCurrentPlayerPlace() {

    if (popCategories.includes(this.places[this.currentPlayer]))
      return CATEGORY_POP
    if (scienceCategories.includes(this.places[this.currentPlayer]))
      return CATEGORY_SCIENCE
    if (sportCategories.includes(this.places[this.currentPlayer]))
      return CATEGORY_SPORT

    return CATEGORY_ROCK
  }

  isPlayable(howManyPlayers) {
    return howManyPlayers >= 2
  }

  add(playerName) {
    this.players.push(playerName)
    this.initPlayer()

    this.console.log(playerName + ' was added')
    this.console.log('They are player number ' + this.players.length)

    return true
  }

  initPlayer() {
    this.places[this.howManyPlayers() - 1] = 0
    this.purses[this.howManyPlayers() - 1] = 0
    this.inPenaltyBox[this.howManyPlayers() - 1] = false
  }

  howManyPlayers() {
    return this.players.length
  }


  askQuestion() {

    if (this.getCurrentCategoryByCurrentPlayerPlace() == CATEGORY_POP)
      this.console.log(this.categories.popQuestions.shift())
    if (this.getCurrentCategoryByCurrentPlayerPlace() == CATEGORY_SCIENCE)
      this.console.log(this.categories.scienceQuestions.shift())
    if (this.getCurrentCategoryByCurrentPlayerPlace() == CATEGORY_SPORT)
      this.console.log(this.categories.sportsQuestions.shift())
    if (this.getCurrentCategoryByCurrentPlayerPlace() == CATEGORY_ROCK)
      this.console.log(this.categories.rockQuestions.shift())
  }

  roll(roll) {
    this.console.log(this.players[this.currentPlayer] + ' is the current player')
    this.console.log('They have rolled a ' + roll)

    if (this.isPlayerInPenaltyBox(this.currentPlayer)) {
      if (roll % 2 != 0) {
        this.isGettingOutOfPenaltyBox = true

        this.console.log(this.players[this.currentPlayer] + ' is getting out of the penalty box')

        this.moveCurrentPlayerPlace(roll)

        this.askQuestion()
      } else {
        this.console.log(this.players[this.currentPlayer] + ' is not getting out of the penalty box')
        this.isGettingOutOfPenaltyBox = false
      }
    } else {

      this.moveCurrentPlayerPlace(roll)

      this.askQuestion()
    }
  }

  isPlayerInPenaltyBox(playerIndex) {
    return this.inPenaltyBox[playerIndex];
  }

  wasCorrectlyAnswered() {

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
    this.purses[this.currentPlayer] += 1
    this.console.log(this.players[this.currentPlayer] + ' now has ' + this.purses[this.currentPlayer] + ' Gold Coins.')
  }

  wrongAnswer() {
    this.console.log('Question was incorrectly answered')
    this.console.log(this.players[this.currentPlayer] + ' was sent to the penalty box')
    this.inPenaltyBox[this.currentPlayer] = true

    this.switchPlayer()
    return true
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  switchPlayer(){
    this.currentPlayer += 1

    if (this.currentPlayer == this.players.length) {
      this.currentPlayer = 0
    }
  }

  getCurrentPlayerPlace() {
    return this.places[this.currentPlayer];
  }

  getPlayerPurse(playerIndex) {
    return this.purses[playerIndex];
  }

  moveCurrentPlayerPlace(roll) {
    this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll
    if (this.places[this.currentPlayer] > 11) {
      this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12
    }
    this.console.log(this.players[this.currentPlayer] + '\'s new location is ' + this.places[this.currentPlayer])
    this.console.log('The category is ' + this.getCurrentCategoryByCurrentPlayerPlace())
  }

}

module.exports = TrivialGame