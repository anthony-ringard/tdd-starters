'use strict';
const Nasa = require('./nasa')

class NasaZX81 extends Nasa {
    constructor(axeX, axeY, orientation, protocole) {
        super(axeX, axeY, orientation, protocole)
    }

    move(move) {
        if (move === 'X' || move === 'Y') {
            this.translation(move);
         } else {
            this.rotation(move);
        }
    }

    translation(move){
        if (move === 'X') {
            this.moveForeward();
        }
        if (move === 'Y') {
            this.moveBackward();
        }
    }

    moveForeward() {
        if (this.orientation === 'S') {
            this.moveForewardToSouth()
        } else if(this.orientation === 'N') {
            this.moveForewardToNorth()
        } else if(this.orientation === 'E') {
            this.moveForewardToEast()
        } else {
            this.moveForewardToWest() 
        } 
    }

    moveBackward() {
        if (this.orientation === 'S') {
            this.movebackwardToSouth()
        } else if(this.orientation === 'N') {
            this.moveBackwardToNorth()
        } else if(this.orientation === 'E') {
            this.moveBackwardToEast()
        } else {
            this.moveBackwardToWest()
        }
    }

    rotation(move) {
        if (move === 'R') {
            this.turnRight();
        }
        if (move === 'L') {
            this.turnLeft()
        }
    }

    decrementAxeY(){
        if (this.axeY === -10) {
            this.axeY = 10;
        } else {
            this.axeY -= 1
        }
    }
    
    incrementAxeY(){
        if (this.axeY === 10) {
            this.axeY = -10;
        } else {
            this.axeY += 1
        }
    }

    incrementAxeX(){
        if (this.axeX === 10) {
            this.axeX = -10;
        } else {
            this.axeX += 1
        }
    }

    decrementAxeX(){
        if (this.axeX === -10) {
            this.axeX = 10;
        } else {
            this.axeX -= 1
        }

    }
}

module.exports = NasaZX81;