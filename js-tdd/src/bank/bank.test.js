'use strict';
/*
Test list



# Test 1 :

When :
getBalance
Then : 
expected balance : 0

# Test 2

Given:
deposite 1000

When:
getBalance

Then:
expected balance : 1000


# test 3
Given: 
    
When :
withdrawal 500 

Then : 
expected balance = -500


# Test 4

When:
printStatement

Then:
date       | amount |  Balance 



# test 5

Given:
deposite 1000
When:
printStatement 
Then:
date       | amount|  Balance 
15/04/2020 |  1000 | 1000


# Test 6
Given :
deposite 1000 
deposite 2500 

when 
function printStatement(){

Then:
date       | amount|  Balance 
15/04/2020 |  1000 | 1000
15/04/2020 |  2500 | 3500

# test 7
Given: 
    
When :
withdrawal 500 

Then : 
solde attendu : 3000

# test 8
printStatement => 

date       | amount|  Balance 
15/04/2020 |  1000 | 1000
15/04/2020 |  2500 | 3500
15/04/2020 |  -500 | 3000

*/ 

const Bank = require('./bank')
describe('Bank', () => {

    var bank
    var consoleValue
    var logMock

    beforeEach(()=>{
        bank = new Bank()

        consoleValue = '';
        logMock = function(value) {
            consoleValue = value
        }
        console.log = logMock
        bank.getFormatDate = () => "15/04/2020"
    })

    it('Display balance for the first time', () => {
        expect(bank.getBalance()).toEqual(0);
    });

    it('deposits should add on balance', () => {
        bank.deposit(500)
        expect(bank.getBalance()).toEqual(500);
    });

    it('withdrawal should substract on balance', () => {
        bank.withdrawal(500)
        expect(bank.getBalance()).toEqual(-500);
    });

    it('balance should be the sum of deposits and withdrawals', () => {
        bank.deposit(500)
        bank.withdrawal(1500)
        bank.deposit(2500)
        bank.withdrawal(800)
        expect(bank.getBalance()).toEqual(700);
    });

    it('should return empty statement with log mock', () => {
        // Given

        // When
        bank.printStatement()
        
        // Then 
        expect(consoleValue).toEqual(" Date || amount || balance");

    })

    it('should return one statement with log mock', ()=>{
        // Given

        bank.deposit(1000)

        // When
        bank.printStatement()
        
        // Then 
        expect(consoleValue).toEqual(" Date || amount || balance\n15/04/2020 || 1000 || 1000")
        
    })

    it('should return multiple statements with log mock', ()=>{

        bank.deposit(1000)
        bank.deposit(2500)

        // When
        bank.printStatement()

        // Then
        expect(consoleValue).toEqual(
            " Date || amount || balance\n"+
            "15/04/2020 || 1000 || 1000\n"+
            "15/04/2020 || 2500 || 3500"
            )
        
    })

    it('should return multiple statements with log mock and past date', ()=>{

        // Given

        bank.getFormatDate = () => "14/04/2020"
        bank.deposit(1000)

        bank.getFormatDate = () => "15/04/2020"
        bank.deposit(2500)

        // When
        bank.printStatement()

        // Then
        expect(consoleValue).toEqual(
            " Date || amount || balance\n"+
            "14/04/2020 || 1000 || 1000\n"+
            "15/04/2020 || 2500 || 3500"
            )
        
    })




});