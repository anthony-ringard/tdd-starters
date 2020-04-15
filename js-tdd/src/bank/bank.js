'use strict';

class Bank {
    constructor() {
        this.balance = 0;
        this.transactions = [];
    }

    getFormatDate() {
        var date = new Date();
        var month = date.getMonth() + 1
        return date.getDate() + "/" + (month<10?'0':'') + month + "/" + date.getFullYear();
    }

    getBalance() {
        return this.balance;
    }

    deposit(amount){
        this.balance += amount;
        this.transactions.push({date : this.getFormatDate(), amount : amount, balance : this.balance});
    }

    withdrawal(amount){
        this.deposit(-amount);
    }

    printStatement(){
        let header = [" Date || amount || balance"]
        let transactions = this.transactions.map((transaction)=>transaction.date + " || " + transaction.amount+ " || " + transaction.balance);
        let lines = header.concat(transactions)
        let string = lines.join("\n")
        console.log(string)
    }
}

module.exports = Bank;
