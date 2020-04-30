const Nasa = require('./nasa')

/**

    FYI : N:orth S:Sud E:Est W:West

    Affichage d ela position (0,0,N)

    Définir la position 

    init moves('0,0,N')
    () => ('0,0,N')
    (F) => (0,1,N)
    (B) => (0,-1,N)
    (R) => (0,0,E)
    (L) => (0,0,W)

    init moves('0,0,E')
    (R) => (0,0,S)
    (L) => (0,0,E)

    init moves('3,-2,W')
    (F) => ('2,-2,W')
    (F) => ('1,-2,W')
    (B) => ('4,-2,W')

    init moves('3,-2,W')
    (F) => ('2,-2,W')

    init moves('3,-2,W')
    (B) => ('4,-2,W')

    init moves('3,-2,S')
    (F) => ('3,-3,W')
    init moves('3,-2,S')
    (B) => ('3,-1,S')


    scenario 1
    () => (0,0,N)
    (F) => (0,1,N)
    (F) => (0,2,N)
    (R) => (0,2,E)
    (B) => (-1,2,E)
    (L) => (-1,2,N)
    (F) => (-1,3,N)

    (FFFFFFF) => (-1,-10,N)

    2 fois droite => sud

 */


describe('Nasa', () => {

    beforeEach(()=>{
        this.nasa = new Nasa(0,0,'N')
    })

    it('init mars rover', () => {
        expect(this.nasa.getPosition()).toEqual('0,0,N');
    });

    it('first step foreward', () => {
        this.nasa.move('F');
        expect(this.nasa.getPosition()).toEqual('0,1,N');
    });

    it('first step backward', () => {
        this.nasa.move('B');
        expect(this.nasa.getPosition()).toEqual('0,-1,N');
    });

    it('first step right', () => {
        this.nasa.move('R');
        expect(this.nasa.getPosition()).toEqual('0,0,E');
    });

    it('first step left', () => {
        this.nasa.move('L');
        expect(this.nasa.getPosition()).toEqual('0,0,W');
    });


    it('second step left', () => {
        this.nasa = new Nasa(0,0,'E')
        this.nasa.move('L');
        expect(this.nasa.getPosition()).toEqual('0,0,N');
    });



    it('move Forward axe X to West', () => {
        this.nasa = new Nasa(3,-2,'W')
        this.nasa.move('F');
        expect(this.nasa.getPosition()).toEqual('2,-2,W');
    });


    it('move Backward axe X to West', () => {
        this.nasa = new Nasa(3,-2,'W')
        this.nasa.move('B');
        expect(this.nasa.getPosition()).toEqual('4,-2,W');
    });

    it('move Forward axe X to East', () => {
        this.nasa = new Nasa(3,-2,'E')
        this.nasa.move('F');
        expect(this.nasa.getPosition()).toEqual('4,-2,E');
    });


    it('move Backward axe X to East', () => {
        this.nasa = new Nasa(3,-2,'E')
        this.nasa.move('B');
        expect(this.nasa.getPosition()).toEqual('2,-2,E');
    });

    it('move Forward axe Y to South', () => {
        this.nasa = new Nasa(3,-2,'S')
        this.nasa.move('F');
        expect(this.nasa.getPosition()).toEqual('3,-3,S');
    });


    it('move Backward axe Y to South', () => {
        this.nasa = new Nasa(3,-2,'S')
        this.nasa.move('B');
        expect(this.nasa.getPosition()).toEqual('3,-1,S');
    });

    it('test scenario 1', () => {
        this.nasa = new Nasa(0,0,'N')
        this.nasa.move('F');
        this.nasa.move('F');
        this.nasa.move('R');
        this.nasa.move('B');
        this.nasa.move('L');
        this.nasa.move('F');
        expect(this.nasa.getPosition()).toEqual('-1,3,N');
    });

    xit('test planete ronde', () => {
        this.nasa = new Nasa(0,0,'N')
        this.nasa.move('F');
        this.nasa.move('F');
        this.nasa.move('F');
        this.nasa.move('F');
        this.nasa.move('F');
        this.nasa.move('F');
        this.nasa.move('F');
        this.nasa.move('F');
        this.nasa.move('F');
        this.nasa.move('F');
        this.nasa.move('F');

        expect(this.nasa.getPosition()).toEqual('0,-10,N');
    });

});