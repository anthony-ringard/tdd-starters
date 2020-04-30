'use strict';

class Nasa {
   
    constructor(axeX, axeY, orientation) {
        this.axeX = axeX
        this.axeY = axeY
        this.orientation = orientation
    }

    getPosition() {
        return this.axeX+','+this.axeY+','+this.orientation;
    }

    move(move) {
        if (move === 'F') {
           this.axeY += 1
        }

        if (move === 'B') {
            this.axeY -= 1

        }

        const cardinals = ['N','E','S','W'];

        cardinals.find(function(cardinal) {
            
        })

        if (move === 'R') {
            this.orientation = 'E'

        }

        if (move === 'L') {
            this.orientation = 'W'

        }
        

        

    }



}

module.exports = Nasa;
