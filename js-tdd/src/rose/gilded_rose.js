'use-strict'

class Item {
    constructor(name, sellIn, quality) {
        this.name = name
        this.sellIn = sellIn
        this.quality = quality
    }
}

class Shop {
    constructor(items = []) {
        this.items = items
    }

    updateQuality() {
        function increaseQualityUntilMax(item) {
            if (item.quality < 50) {
                item.quality = item.quality + 1
            }
        }
        function decreaseQuality(item) {
            if (item.quality > 0) {
                if (item.name != 'Sulfuras, Hand of Ragnaros') {
                    item.quality = item.quality - 1
                }
            }
        }
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                decreaseQuality(this.items[i])
            } else {
                if (this.items[i].quality < 50) {
                    this.items[i].quality = this.items[i].quality + 1
                    if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                        if (this.items[i].sellIn < 11) {
                            increaseQualityUntilMax(this.items[i])
                        }
                        if (this.items[i].sellIn < 6) {
                            increaseQualityUntilMax(this.items[i])
                        }
                    }
                }
            }
            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].sellIn = this.items[i].sellIn - 1
            }
            if (this.items[i].sellIn < 0) {
                if (this.items[i].name != 'Aged Brie') {
                    if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                        decreaseQuality(this.items[i])
                    } else {
                        this.items[i].quality = 0
                    }
                } else {
                    increaseQualityUntilMax(this.items[i])
                }
            }
        }

        return this.items
    }
}

module.exports = {
    Item: Item,
    Shop: Shop
}