const roman = require('./roman')

describe('roman', () => {
    it('converts from arabic', () => {
        expect(roman.fromArabic(0)).toEqual('')
    })
})