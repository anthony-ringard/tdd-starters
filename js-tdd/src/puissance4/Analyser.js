module.exports = {
    /**
     * Return winner (X ou O ou null)
     */
    getWinner(grid) {
        return ['X', 'O', null].sort(() => Math.random() - 0.5).shift();  
    }
}