'use strict'

const {
    Item,
    Shop
} = require('./gilded_rose')

describe('Gilded Rose', function () {

    const items = []
    items.push(new Item('+5 Dexterity Vest', 10, 20))
    items.push(new Item('Aged Brie', 2, 0))
    items.push(new Item('Elixir of the Mongoose', 5, 7))
    items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80))
    items.push(new Item('Sulfuras, Hand of Ragnaros', -1, 80))
    items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20))
    items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49))
    items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49))
    // this conjured item does not work properly yet
    items.push(new Item('Conjured Mana Cake', 3, 6))

    it('should decrement sellIn', function () {
        // Given
        const gildedRose = new Shop([new Item('foo', 42, 50)])

        // When
        const items = gildedRose.updateQuality()

        // Then
        expect(items).toHaveLength(1)
        expect(items[0].name).toEqual('foo')
        expect(items[0].sellIn).toEqual(41)
        expect(items[0].quality).toEqual(49)

    })


    it('sulfuras sellIn is constant.', function () {
        // Given
        const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 0, 80)])

        // When
        const items = gildedRose.updateQuality()

        // Then
        expect(items).toHaveLength(1)
        expect(items[0].name).toEqual('Sulfuras, Hand of Ragnaros')
        expect(items[0].sellIn).toEqual(0)
        expect(items[0].quality).toEqual(80)

    })


    it('should increment quality Aged Brie', () => {
        // Given
        const gildedRose = new Shop([new Item('Aged Brie', 2, 10)])

        // When
        const items = gildedRose.updateQuality()

        // Then
        expect(items).toHaveLength(1)
        expect(items[0].name).toEqual('Aged Brie')
        expect(items[0].sellIn).toEqual(1)
        expect(items[0].quality).toEqual(11)
    });



    it('backstage passes quality increments by 2 when sellIn is short', () => {
        // Given
        const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 7, 30)])

        // When
        const items = gildedRose.updateQuality()

        // Then
        expect(items).toHaveLength(1)
        expect(items[0].name).toEqual('Backstage passes to a TAFKAL80ETC concert')
        expect(items[0].sellIn).toEqual(6)
        expect(items[0].quality).toEqual(32)
    });

    it('backstage passes with maximum quality 50', () => {
        // Given
        const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 7, 50)])

        // When
        const items = gildedRose.updateQuality()

        // Then
        expect(items).toHaveLength(1)
        expect(items[0].name).toEqual('Backstage passes to a TAFKAL80ETC concert')
        expect(items[0].sellIn).toEqual(6)
        expect(items[0].quality).toEqual(50)
    });


    it('backstage passes quality increments when sellIn is far', () => {
        // Given
        const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 47)])

        // When
        const items = gildedRose.updateQuality()

        // Then
        expect(items).toHaveLength(1)
        expect(items[0].name).toEqual('Backstage passes to a TAFKAL80ETC concert')
        expect(items[0].sellIn).toEqual(10)
        expect(items[0].quality).toEqual(48)
    });
    
    it('backstage passes quality increment by 3 when sellIn is really really short', () => {
        // Given
        const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 4, 33)])

        // When
        const items = gildedRose.updateQuality()

        // Then
        expect(items).toHaveLength(1)
        expect(items[0].name).toEqual('Backstage passes to a TAFKAL80ETC concert')
        expect(items[0].sellIn).toEqual(3)
        expect(items[0].quality).toEqual(36)
    });

    it('brie quality continue to increment when sellIn < 0', () => {
       // Given
       const gildedRose = new Shop([new Item('Aged Brie', -2, 10)])

       // When
       const items = gildedRose.updateQuality()

       // Then
       expect(items).toHaveLength(1)
       expect(items[0].name).toEqual('Aged Brie')
       expect(items[0].sellIn).toEqual(-3)
       expect(items[0].quality).toEqual(12)
    });

    it('sulfuras quality don\'t change when sellIn < 0', () => {
        // Given
        const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', -2, 10)])
 
        // When
        const items = gildedRose.updateQuality()
 
        // Then
        expect(items).toHaveLength(1)
        expect(items[0].name).toEqual('Sulfuras, Hand of Ragnaros')
        expect(items[0].sellIn).toEqual(-2)
        expect(items[0].quality).toEqual(10)
     });

     it('should backstage pass quality to 0 when sellIn is passed', () => {
        // Given
        const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', -2, 10)])
 
        // When
        const items = gildedRose.updateQuality()
 
        // Then
        expect(items).toHaveLength(1)
        expect(items[0].name).toEqual('Backstage passes to a TAFKAL80ETC concert')
        expect(items[0].sellIn).toEqual(-3)
        expect(items[0].quality).toEqual(0)
     });

     it('should decrement sellIn by 1 and quality by 2 for a no-magic key', () => {
        // Given
        const gildedRose = new Shop([new Item('foo', -2, 10)])
 
        // When
        const items = gildedRose.updateQuality()
 
        // Then
        expect(items).toHaveLength(1)
        expect(items[0].name).toEqual('foo')
        expect(items[0].sellIn).toEqual(-3)
        expect(items[0].quality).toEqual(8)
     });
})