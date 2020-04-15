const DEFAULT_ROW = 5;

function isCellFull(array, row, col) {
    return array[row][col] !== '.';
}

function getFirstEmptyCol(array, col) {
    let row = DEFAULT_ROW;
    while(isCellFull(array, row, col)) {
        row --;
    }
    return row;
}

class Grid {
    constructor() {
        this._array = [
            ['.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.'],
        ];
    }
    play(player, col) {
        col -= 1;
        this._array[getFirstEmptyCol(this._array, col)][col] = player;
    }
    toArray() {
        return this._array;
    }
}

module.exports = Grid;