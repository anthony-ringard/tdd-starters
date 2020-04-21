const Game = function (consoleCustom) {

  var players = new Array()
  var places = new Array(6)
  var purses = new Array(6)
  var inPenaltyBox = new Array(6) 

  var currentPlayer = 0
  var isGettingOutOfPenaltyBox = false

  var categories = {
      popQuestions: [],
      scienceQuestions: [],
      sportsQuestions: [],
      rockQuestions: []
  }

  // var test = {
  //   pop: {
  //     category: 'Pop',
  //     questions: []
  //   },
  //   science: {
  //     category: 'Science',
  //     questions: []
  //   },
  //   sports: {
  //     category: 'Sports',
  //     questions: []
  //   },
  //   rock: {
  //     category: 'Rock',
  //     questions: []
  //   },
  // }

  const popCategories = [0, 4, 8]
  const scienceCategories = [1, 5, 9]
  const sportCategories = [2, 6, 10]

  this.getCategories = function (){
    return categories;
  }


  var didPlayerWin = function () {
    return !(purses[currentPlayer] == 6)
  }

  var currentCategory = function () {

    if (popCategories.includes(places[currentPlayer]))
      return 'Pop'
    if (scienceCategories.includes(places[currentPlayer]))
      return 'Science'
    if (sportCategories.includes(places[currentPlayer]))
      return 'Sports'
      
    return 'Rock' 
  }

  // Object.keys(test).forEach(cat => {
  //   console.log(cat);
  //   for (var i = 0; i < 50; i++) {
  //     cat.questions.push(cat.category + ' Question ' + i)
  //   }
  // });
 
  // Object.keys(test).forEach(cat => {
  //   console.log(cat);
  //   for (var i = 0; i < 50; i++) {
  //     cat.questions.push(cat.category + ' Question ' + i)
  //   }
  // });

  for (var i = 0; i < 50; i++) {
    categories.popQuestions.push('Pop Question ' + i)
    categories.scienceQuestions.push('Science Question ' + i)
    categories.sportsQuestions.push('Sports Question ' + i)
    categories.rockQuestions.push('Rock Question ' + i )
  }


  this.isPlayable = function (howManyPlayers) {
    return howManyPlayers >= 2
  }

  this.add = function (playerName) {
    players.push(playerName)
    this.initPlayer()

    consoleCustom.log(playerName + ' was added')
    consoleCustom.log('They are player number ' + players.length)

    return true
  }

  this.initPlayer = function () {
    places[this.howManyPlayers() - 1] = 0
    purses[this.howManyPlayers() - 1] = 0
    inPenaltyBox[this.howManyPlayers() - 1] = false
  }

  this.howManyPlayers = function () {
    return players.length
  }


  var askQuestion = function () {
    
    if (currentCategory() == 'Pop')
      consoleCustom.log(categories.popQuestions.shift())
    if (currentCategory() == 'Science')
      consoleCustom.log(categories.scienceQuestions.shift())
    if (currentCategory() == 'Sports')
      consoleCustom.log(categories.sportsQuestions.shift())
    if (currentCategory() == 'Rock')
      consoleCustom.log(categories.rockQuestions.shift())
  }

  this.roll = function (roll) {
    consoleCustom.log(players[currentPlayer] + ' is the current player')
    consoleCustom.log('They have rolled a ' + roll)

    if (this.isPlayerInPenaltyBox(currentPlayer)) {
      if (roll % 2 != 0) {
        isGettingOutOfPenaltyBox = true

        consoleCustom.log(players[currentPlayer] + ' is getting out of the penalty box')

        moveCurrentPlayerPlace(roll)

        askQuestion()
      } else {
        consoleCustom.log(players[currentPlayer] + ' is not getting out of the penalty box')
        isGettingOutOfPenaltyBox = false
      }
    } else {

      moveCurrentPlayerPlace(roll)

      askQuestion()
    }
  }

  this.isPlayerInPenaltyBox = function (playerIndex) {
    return inPenaltyBox[playerIndex];
  }

  this.wasCorrectlyAnswered = function () {
    if (this.isPlayerInPenaltyBox(currentPlayer)) {
      if (isGettingOutOfPenaltyBox) {
        consoleCustom.log('Answer was correct!!!!')
        purses[currentPlayer] += 1
        consoleCustom.log(players[currentPlayer] + ' now has ' +
          purses[currentPlayer] + ' Gold Coins.')

        var winner = didPlayerWin()
        switchPlayer()

        return winner
      } else {
        switchPlayer()
        return true
      }


    } else {

      consoleCustom.log('Answer was correct!!!!')
      purses[currentPlayer] += 1
      consoleCustom.log(players[currentPlayer] + ' now has ' +
      purses[currentPlayer] + ' Gold Coins.')
     
      var winner = didPlayerWin()
      switchPlayer()

      return winner
    }
  }

  this.wrongAnswer = function () {
    consoleCustom.log('Question was incorrectly answered')
    consoleCustom.log(players[currentPlayer] + ' was sent to the penalty box')
    inPenaltyBox[currentPlayer] = true

    switchPlayer()
    return true
  }

  this.getCurrentPlayer = function() {
    return currentPlayer;
  }

  var switchPlayer = function () {
    currentPlayer += 1

    if (currentPlayer == players.length) {
      currentPlayer = 0
    }
  }

  this.getCurrentPlayerPlace = function() {
    return places[currentPlayer];
  }

  this.getPlayerPurse = function(playerIndex) {
    return purses[playerIndex];
  }

  var moveCurrentPlayerPlace = function(roll) {
    places[currentPlayer] = places[currentPlayer] + roll
    if (places[currentPlayer] > 11) {
      places[currentPlayer] = places[currentPlayer] - 12
    }
    consoleCustom.log(players[currentPlayer] + '\'s new location is ' + places[currentPlayer])
    consoleCustom.log('The category is ' + currentCategory())
  }

}

module.exports = Game