const FooBarQix = require('./fooBarQuix')

/*
1 = 1 
2 =2
3 = foo 
5 = bar
7 = qix
6 = foo
10 = bar
14 = qix
15 = foobar
21 = fooqix
35 = barqix
105 = foobarqix
*/

describe('foo_bar_qix', () => {
    var fooBarQix;
    beforeEach(()=>{
        fooBarQix = new FooBarQix();
    })

    it('should return same value as string', () => {
        expect(fooBarQix.getConvertedNumber(1)).toEqual('1')
        expect(fooBarQix.getConvertedNumber(2)).toEqual('2')
    })

    it('should return magic value', () => {
        expect(fooBarQix.getConvertedNumber(3)).toEqual('foo')
        expect(fooBarQix.getConvertedNumber(5)).toEqual('bar')
        expect(fooBarQix.getConvertedNumber(7)).toEqual('qix')
    })

    it('should return magic value of multiple', () => {
        expect(fooBarQix.getConvertedNumber(6)).toEqual('foo')
        expect(fooBarQix.getConvertedNumber(10)).toEqual('bar')
        expect(fooBarQix.getConvertedNumber(14)).toEqual('qix')
    })

    it('should return multiple concat value with magic values', () => {
        expect(fooBarQix.getConvertedNumber(15)).toEqual('foobar')
        expect(fooBarQix.getConvertedNumber(21)).toEqual('fooqix')
        expect(fooBarQix.getConvertedNumber(35)).toEqual('barqix')
        expect(fooBarQix.getConvertedNumber(105)).toEqual('foobarqix')
    })
})
