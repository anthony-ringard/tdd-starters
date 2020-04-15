'use strict';


class Bank {
    constructor() {
        this.balance = 0;
    }

    getBalance() {
        return this.balance;
    }

    deposit(amount){
        this.balance += amount;
    }

    withdrawal(amount){
        this.deposit(-amount);
    }

    printStatement(){
        console.log(" Date || amount || balance");
    }
}

module.exports = Bank;
