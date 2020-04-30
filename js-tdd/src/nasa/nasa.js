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
    
       
        if (move === 'F') {

            if (this.orientation === 'S') {
                if (this.axeY === -10) {
                    this.axeY = 10;
                }
                this.axeY -= 1
            }
            else if (this.orientation === 'E') {
                this.axeX += 1
            }
            else if (this.orientation === 'W') {
                    this.axeX -= 1
    
            }else {
                this.axeY += 1
            }

        } 
        
        else if (move === 'B') {

            if (this.orientation === 'S') {
                if (this.axeY === 10) {
                    this.axeY = -10;
                }
                this.axeY += 1
            }
            else if (this.orientation === 'E') {
                this.axeX -= 1
            }
            else if (this.orientation === 'W') {
                this.axeX += 1

            }else {
                this.axeY -= 1
            }


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
}

module.exports = Nasa;