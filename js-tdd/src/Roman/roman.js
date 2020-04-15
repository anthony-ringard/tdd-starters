function fromArabic(arabic) {
    let result = '';

    for (let index = 0; index < arabic; index++) {
        result += 'I';
        if (arabic == 4){
            result = 'IV';
        }
        if (arabic == 5){
            result = 'V';
        }
    }
    return result;
}

module.exports.fromArabic = fromArabic
