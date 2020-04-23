class Player {

    constructor(name) {
        this.name = name
        this.place = 0;
        this.purse = 0;
        this.inPenaltyBox = false;
    }

    getName() {
        return this.name
    }
    setName(name) {
        this.name = name
    }

    getPurse() {
        return this.purse
    }
    setPurse(purse) {
        this.purse = purse
    }

    getPlace() {
        return this.place
    }
    setPlace(place) {
        this.place = place
    }

    isInPenaltyBox() {
        return this.inPenaltyBox
    }
    setInPenaltyBox(inPenaltyBox) {
        this.inPenaltyBox = inPenaltyBox
    }
}

module.exports = Player