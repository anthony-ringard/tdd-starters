const GameMaster = function (consoleCustom) {

  var players = new Array()
  var places = new Array(6)
  var purses = new Array(6)
  var inPenaltyBox = new Array(6)

  var popQuestions = new Array()
  var scienceQuestions = new Array()
  var sportsQuestions = new Array()
  var rockQuestions = new Array()

  var currentPlayer = 0
  var isGettingOutOfPenaltyBox = false

  var didPlayerWin = function () {
    return !(purses[currentPlayer] == 6)
  }

  var getCurrentCategoryByCurrentPlayerPlace = function () {
    if (places[currentPlayer] == 0)
      return 'Pop'
    if (places[currentPlayer] == 4)
      return 'Pop'
    if (places[currentPlayer] == 8)
      return 'Pop'
    if (places[currentPlayer] == 1)
      return 'Science'
    if (places[currentPlayer] == 5)
      return 'Science'
    if (places[currentPlayer] == 9)
      return 'Science'
    if (places[currentPlayer] == 2)
      return 'Sports'
    if (places[currentPlayer] == 6)
      return 'Sports'
    if (places[currentPlayer] == 10)
      return 'Sports'
    return 'Rock'
  }

  this.createRockQuestion = function (index) {
    return 'Rock Question ' + index
  }

  for (var i = 0; i < 50; i++) {
    popQuestions.push('Pop Question ' + i)
    scienceQuestions.push('Science Question ' + i)
    sportsQuestions.push('Sports Question ' + i)
    rockQuestions.push(this.createRockQuestion(i))
  }


  this.isPlayable = function (howManyPlayers) {
    return howManyPlayers >= 2
  }

  this.add = function (playerName) {
    players.push(playerName)
    places[this.howManyPlayers() - 1] = 0
    purses[this.howManyPlayers() - 1] = 0
    inPenaltyBox[this.howManyPlayers() - 1] = false

    consoleCustom.log(playerName + ' was added')
    consoleCustom.log('They are player number ' + players.length)

    return true
  }

  this.howManyPlayers = function () {
    return players.length
  }


  var askQuestion = function () {
    if (getCurrentCategoryByCurrentPlayerPlace() == 'Pop')
      consoleCustom.log(popQuestions.shift())
    if (getCurrentCategoryByCurrentPlayerPlace() == 'Science')
      consoleCustom.log(scienceQuestions.shift())
    if (getCurrentCategoryByCurrentPlayerPlace() == 'Sports')
      consoleCustom.log(sportsQuestions.shift())
    if (getCurrentCategoryByCurrentPlayerPlace() == 'Rock')
      consoleCustom.log(rockQuestions.shift())
  }

  this.roll = function (roll) {
    consoleCustom.log(players[currentPlayer] + ' is the current player')
    consoleCustom.log('They have rolled a ' + roll)

    if (inPenaltyBox[currentPlayer]) {
      if (roll % 2 != 0) {
        isGettingOutOfPenaltyBox = true

        consoleCustom.log(players[currentPlayer] + ' is getting out of the penalty box')
        places[currentPlayer] = places[currentPlayer] + roll
        if (places[currentPlayer] > 11) {
          places[currentPlayer] = places[currentPlayer] - 12
        }

        consoleCustom.log(players[currentPlayer] + '\'s new location is ' + places[currentPlayer])
        consoleCustom.log('The category is ' + getCurrentCategoryByCurrentPlayerPlace())
        askQuestion()
      } else {
        consoleCustom.log(players[currentPlayer] + ' is not getting out of the penalty box')
        isGettingOutOfPenaltyBox = false
      }
    } else {

      places[currentPlayer] = places[currentPlayer] + roll
      if (places[currentPlayer] > 11) {
        places[currentPlayer] = places[currentPlayer] - 12
      }

      consoleCustom.log(players[currentPlayer] + '\'s new location is ' + places[currentPlayer])
      consoleCustom.log('The category is ' + getCurrentCategoryByCurrentPlayerPlace())
      askQuestion()
    }
  }

  this.wasCorrectlyAnswered = function () {
    if (inPenaltyBox[currentPlayer]) {
      if (isGettingOutOfPenaltyBox) {
        consoleCustom.log('Answer was correct!!!!')
        purses[currentPlayer] += 1
        consoleCustom.log(players[currentPlayer] + ' now has ' +
          purses[currentPlayer] + ' Gold Coins.')

        var winner = didPlayerWin()
        currentPlayer += 1
        if (currentPlayer == players.length)
          currentPlayer = 0

        return winner
      } else {
        currentPlayer += 1
        if (currentPlayer == players.length)
          currentPlayer = 0
        return true
      }


    } else {

      consoleCustom.log('Answer was correct!!!!')

      purses[currentPlayer] += 1
      consoleCustom.log(players[currentPlayer] + ' now has ' +
        purses[currentPlayer] + ' Gold Coins.')

      var winner = didPlayerWin()

      currentPlayer += 1
      if (currentPlayer == players.length)
        currentPlayer = 0

      return winner
    }
  }

  this.wrongAnswer = function () {
    consoleCustom.log('Question was incorrectly answered')
    consoleCustom.log(players[currentPlayer] + ' was sent to the penalty box')
    inPenaltyBox[currentPlayer] = true

    currentPlayer += 1
    if (currentPlayer == players.length)
      currentPlayer = 0
    return true
  }
}

module.exports = GameMaster