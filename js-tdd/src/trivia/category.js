class Category {

    constructor(name, places) {
        this.name = name
        this.placesToto = places
        this.questions = []

        for (var i = 0; i < 50; i++) {
            this.questions.push(name + ' Question ' + i)
        }
    }

    getName() {
        return this.name
    }

    shiftQuestion() {
        return this.questions.shift()
    }

    isInPlace(placeIndex) {
        return this.placesToto.includes(placeIndex)
    }

    getQuestions() {
        return this.questions
    }
}

module.exports = Category