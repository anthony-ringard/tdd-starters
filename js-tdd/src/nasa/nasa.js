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

}

module.exports = Nasa;