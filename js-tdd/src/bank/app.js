const Bank = require('./bank')
const bank = new Bank()
bank.deposit(500)
bank.withdrawal(200)
bank.deposit(1000)
bank.printStatement()

/*console.log('date       || transaction || balance')
console.log('15/04/2020 ||         500 ||     500')
console.log('15/04/2020 ||        -200 ||     300')
console.log('15/04/2020 ||        1000 ||    1300')*/