'use strict';

const Grid = require('./Grid');

function nextPlayer(arbitre) {
    if(arbitre.currentPlayer === arbitre.firstPlayer) {
        arbitre.currentPlayer = arbitre.secondPlayer; 
    }else {
        arbitre.currentPlayer = arbitre.firstPlayer;
    }
}

function findSymbol(arbitre, player) {
    if(player === arbitre.firstPlayer) {
        return 'X';
    }
    return 'O';
}

function findPlayerBySymbol(arbitre, symbol) {
    if ('X' === symbol) {
        return arbitre.firstPlayer;
    }

    return arbitre.secondPlayer
}

class Arbitre {
    constructor() {
        this.grid = new Grid();
        this.currentPlayer;
        this.firstPlayer;
        this.secondPlayer;        
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    addPlayer(playerName) {
        if (!this.firstPlayer) {
            this.firstPlayer = playerName;
        } else {
            this.secondPlayer = playerName;
        }
        this.currentPlayer = this.firstPlayer;
    }

    
    play(player, col) {

        const symbol = findSymbol(this, player);
        this.grid.play(symbol, col);
        nextPlayer(this);

        return this.grid.toArray();
    }

    getWinner(analyser) {
        let symbol = analyser.getWinner(this.grid)  

        return findPlayerBySymbol(this, symbol)
    }
}

module.exports = Arbitre;