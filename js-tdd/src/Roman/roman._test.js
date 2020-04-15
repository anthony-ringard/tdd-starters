const roman = require('./roman')

describe('roman', () => {
    it('converts from arabic with 0', () => {
        expect(roman.fromArabic(0)).toEqual('')
    })
})

describe(newFunction(), () => {
    it('converts from arabic with 1', () => {
        expect(roman.fromArabic(1)).toEqual('I')
    })
})

describe('roman', () => {
    it('converts from arabic with 2', () => {
        expect(roman.fromArabic(2)).toEqual('II')
    })
})

describe('roman', () => {
    it('converts from arabic with 4', () => {
        expect(roman.fromArabic(4)).toEqual('IV')
    })
})

describe('roman', () => {
    it('converts from arabic with 5', () => {
        expect(roman.fromArabic(5)).toEqual('V')
    })
})

describe('roman', () => {
    it('converts from arabic with 7', () => {
        expect(roman.fromArabic(7)).toEqual('VII')
    })
})

function newFunction() {
    return 'roman'
}
