'use strict'

const {
    Item,
    Shop
} = require('./gilded_rose')
const {
    MasterShop
} = require('./gilded_rose_golden_master')

describe('Gilded Rose golder master', function () {
    it('should always lead the same result than the master', () => {
        const sampleItemNames = ['foo', 'Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros']
        sampleItemNames.forEach(sampleItemName => {
            for (let sampleSellIn = -1; sampleSellIn < 100; sampleSellIn++) {
                for (let sampleQuality = -1; sampleQuality < 100; sampleQuality++) {
                    function buildItems() {
                        const sampleItem = new Item(sampleItemName, sampleSellIn, sampleQuality)
                        const items = [sampleItem]
                        return items;
                    }
                    const shop = new Shop(buildItems())
                    const newItems = shop.updateQuality()

                    const masterShop = new MasterShop(buildItems())
                    const newItemsFromMaster = masterShop.updateQuality()

                    expect(newItems).toEqual(newItemsFromMaster)
                }
            }
        });
    })
});