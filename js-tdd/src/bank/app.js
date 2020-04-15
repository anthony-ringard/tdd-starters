const Bank = require('./bank')
const bank = new Bank()
// Le 15/04:
bank.deposit(500)

// Le 16/04 :
bank.withdrawal(200)

// Le 17/04 :
bank.deposit(1000)
bank.printStatement()

//date       || transaction || balance
//15/04/2020 ||         500 ||     500
//16/04/2020 ||        -200 ||     300
//17/04/2020 ||        1000 ||    1300

