'use strict';

class FooBarQix {
    constructor() {
        this.multipleToMagicValues = {
            3: 'foo',
            5: 'bar',
            7: 'qix',
        }
    }

    getConvertedNumber(number) {
        let result = this.getMagicValues(number);

        return result ? result : number.toString();
    }

    getMagicValues(number) {
        let magicValues = '';

        for (let [multiple, magicValue] of Object.entries(this.multipleToMagicValues)) {
            if (this.isMultiple(number, multiple)) {
                magicValues += magicValue;
            }
        }

        return magicValues;
    }

    isMultiple(number, multiple){
       return number % multiple === 0
    }

}

module.exports = FooBarQix;