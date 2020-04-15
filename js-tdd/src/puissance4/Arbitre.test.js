'use strict';

/**
 * Capable de dire quel joueur doit jouer
 *  * Le joueur jaune commence (X)
 *  * Les joueurs jouent a tour de role, ne trichent pas
 * Peut entrer le coup du joueur courant
 * Sait si la partie est gagnée
 * 
 */

 /**
Capable de dire quel joueur doit jouer (a condition qu'on lui donne le tour courrant)
() => X
(2) => O
(3) => X
(4) => O

Peut entrer le coup du joueur courant
(1, 1) => [
    [ '.', '.', '.', '.', '.', '.', '.'],
    [ '.', '.', '.', '.', '.', '.', '.'],
    [ '.', '.', '.', '.', '.', '.', '.'],
    [ '.', '.', '.', '.', '.', '.', '.'],
    [ '.', '.', '.', '.', '.', '.', '.'],
    [ 'X', '.', '.', '.', '.', '.', '.'],
]
(2, 1) => [
    [ '.', '.', '.', '.', '.', '.', '.'],
    [ '.', '.', '.', '.', '.', '.', '.'],
    [ '.', '.', '.', '.', '.', '.', '.'],
    [ '.', '.', '.', '.', '.', '.', '.'],
    [ 'O', '.', '.', '.', '.', '.', '.'],
    [ 'X', '.', '.', '.', '.', '.', '.'],
]

(6, 1, grid) => [
    [ 'O', '.', '.', '.', '.', '.', '.'],
    [ 'X', '.', '.', '.', '.', '.', '.'],
    [ 'O', '.', '.', '.', '.', '.', '.'],
    [ 'X', '.', '.', '.', '.', '.', '.'],
    [ 'O', '.', '.', '.', '.', '.', '.'],
    [ 'X', '.', '.', '.', '.', '.', '.'],
]
  */

describe('Arbitre', () => {

    const Arbitre = require('./Arbitre')

    it('game should start with the first player added', () => {
        const arbitre = new Arbitre();
        arbitre.addPlayer('Julien')
        arbitre.addPlayer('Alex')
        expect(arbitre.getCurrentPlayer()).toEqual('Julien');
    });

    it('Players should play one by one', () => {
        const arbitre = new Arbitre();
        arbitre.addPlayer('Julien')
        arbitre.addPlayer('Alex')

        expect(arbitre.getCurrentPlayer()).toEqual('Julien');
        arbitre.play('Julien', 1)
        expect(arbitre.getCurrentPlayer()).toEqual('Alex');
        arbitre.play('Alex', 1)
        expect(arbitre.getCurrentPlayer()).toEqual('Julien');
    });

    it('1 er coup joueur courant', () => {
        const arbitre = new Arbitre();
        arbitre.addPlayer('Julien')
        arbitre.addPlayer('Alex')
        expect(arbitre.play('Julien', 1)).toEqual([
            [ '.', '.', '.', '.', '.', '.', '.'],
            [ '.', '.', '.', '.', '.', '.', '.'],
            [ '.', '.', '.', '.', '.', '.', '.'],
            [ '.', '.', '.', '.', '.', '.', '.'],
            [ '.', '.', '.', '.', '.', '.', '.'],
            [ 'X', '.', '.', '.', '.', '.', '.'],
        ]);
    });

    it('2eme coup joueur courant', () => {
        // Given
        const arbitre = new Arbitre();
        arbitre.addPlayer('Julien')
        arbitre.addPlayer('Alex')
        arbitre.play('Julien',1);

        // When / Then
        expect(arbitre.play('Alex', 1)).toEqual([
            [ '.', '.', '.', '.', '.', '.', '.'],
            [ '.', '.', '.', '.', '.', '.', '.'],
            [ '.', '.', '.', '.', '.', '.', '.'],
            [ '.', '.', '.', '.', '.', '.', '.'],
            [ 'O', '.', '.', '.', '.', '.', '.'],
            [ 'X', '.', '.', '.', '.', '.', '.'],
        ]);
    });

    it('6eme coup joueur courant', () => {
        const arbitre = new Arbitre();
        arbitre.addPlayer('Julien')
        arbitre.addPlayer('Alex')
        arbitre.play('Julien',1);
        arbitre.play('Alex', 1)
        arbitre.play('Julien',1);
        arbitre.play('Alex', 1)
        arbitre.play('Julien',1);
        
        expect(arbitre.play('Alex', 1)).toEqual([
            [ 'O', '.', '.', '.', '.', '.', '.'],
            [ 'X', '.', '.', '.', '.', '.', '.'],
            [ 'O', '.', '.', '.', '.', '.', '.'],
            [ 'X', '.', '.', '.', '.', '.', '.'],
            [ 'O', '.', '.', '.', '.', '.', '.'],
            [ 'X', '.', '.', '.', '.', '.', '.'],
        ]);
    });


    it('Alex should win', () => {
        const arbitre = new Arbitre();
        const analyser = {
            /**
             * Return winner (X ou O ou null)
             */
            getWinner(grid) {
                return 'O';  
            }
        }
        arbitre.addPlayer('Julien')
        arbitre.addPlayer('Alex')

        arbitre.play('Alex', 1)
        arbitre.play('Alex', 2)
        arbitre.play('Alex', 3)
        arbitre.play('Alex', 4)

        expect(arbitre.getWinner(analyser)).toEqual('Alex');

    });

    it.skip('Julien should win', () => {
        const arbitre = new Arbitre();
        const analyser = {
            /**
             * Return winner (X ou O ou null)
             */
            getWinner(grid) {
                return 'X' 
            }
        }
        arbitre.addPlayer('Julien')
        arbitre.addPlayer('Alex')

        arbitre.play('Julien', 1)
        arbitre.play('Julien', 2)
        arbitre.play('Julien', 3)
        arbitre.play('Julien', 4)

        expect(arbitre.getWinner(analyser)).toEqual('Julien');

    });
});