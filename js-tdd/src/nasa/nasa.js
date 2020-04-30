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

    move(move) {

        if (move === 'F') {
            this.axeY += 1
        } else if (move === 'B') {
            this.axeY -= 1

        } else {
            this.rotation(move);
        }


    }


    rotation(move) {

        let cardinal = cardinals.indexOf(this.orientation)

        if (move === 'R') {
            this.turnRight(cardinal);
        }

        if (move === 'L') {
            this.turnLeft(cardinal)
        }

    }


    turnRight(cardinal) {
        if (cardinal === cardinals.length - 1) {
            cardinal = -1
        }
        this.orientation = cardinals[cardinal + 1]

    }


    turnLeft(cardinal) {

        if (cardinal === 0) {
            cardinal = cardinals.length
        }
        this.orientation = cardinals[cardinal - 1]

    }
}

module.exports = Nasa;