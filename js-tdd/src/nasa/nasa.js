'use strict';
const cardinals = ['N', 'E', 'S', 'W'];

class Nasa {

    constructor(axeX, axeY, orientation) {
        this.axeX = axeX
        this.axeY = axeY
        this.orientation = orientation
    }

    getPosition() {
        return this.axeX + ',' + this.axeY + ',' + this.orientation;
    }


    getCardinalletIndex(){
        return cardinals.indexOf(this.orientation);
    }

    move(move) {
        if (move === 'F' || move === 'B') {
            this.translation(move);
         } else {
            this.rotation(move);
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

    turnRight() {
        let cardinalIndex = this.getCardinalletIndex()
        if (cardinalIndex === cardinals.length - 1) {
            cardinalIndex = -1
        }
        this.orientation = cardinals[cardinalIndex + 1]
    }


    turnLeft() {
        let cardinalIndex = this.getCardinalletIndex()
        if (cardinalIndex === 0) {
            cardinalIndex = cardinals.length
        }
        this.orientation = cardinals[cardinalIndex - 1]
    }

    translation(move){
        if (move === 'F') {
            this.moveForeward();
        }
        if (move === 'B') {
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

    moveForewardToSouth(){
        this.decrementAxeY();
    }

    moveForewardToNorth(){
        this.incrementAxeY();
    }

    moveForewardToEast(){
        this.incrementAxeX();
    }

    moveForewardToWest(){
        this.decrementAxeX()
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

    movebackwardToSouth(){
        this.incrementAxeY();
    }

    moveBackwardToNorth(){
        this.decrementAxeY();
    }

    moveBackwardToEast(){
        this.decrementAxeX();
    }

    moveBackwardToWest(){
        this.incrementAxeX();
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

module.exports = Nasa;