const Nasa = require('./nasa')

/**

    FYI : N:orth S:Sud E:Est W:West

    Affichage de la position (0,0,N)

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




cas 2 

ajout du protocol:



 */


describe('Nasa', () => {

    beforeEach(()=>{
        this.nasaZX80 = new Nasa(0,0,'N','ZX80')
        this.nasaZX81 = new Nasa(0,0,'N','ZX81ZX80')
    })

    it('init mars rover', () => {
        expect(this.nasaZX80.getPosition()).toEqual('0,0,N');
    });

    it('first step foreward', () => {
        this.nasaZX80.move('F');
        expect(this.nasaZX80.getPosition()).toEqual('0,1,N');
    });

    it('first step backward', () => {
        this.nasaZX80.move('B');
        expect(this.nasaZX80.getPosition()).toEqual('0,-1,N');
    });

    it('first step right', () => {
        this.nasaZX80.move('R');
        expect(this.nasaZX80.getPosition()).toEqual('0,0,E');
    });

    it('first step left', () => {
        this.nasaZX80.move('L');
        expect(this.nasaZX80.getPosition()).toEqual('0,0,W');
    });


    it('second step left', () => {
        this.nasaZX80 = new Nasa(0,0,'E')
        this.nasaZX80.move('L');
        expect(this.nasaZX80.getPosition()).toEqual('0,0,N');
    });



    it('move Forward axe X to West', () => {
        this.nasaZX80 = new Nasa(3,-2,'W')
        this.nasaZX80.move('F');
        expect(this.nasaZX80.getPosition()).toEqual('2,-2,W');
    });


    it('move Backward axe X to West', () => {
        this.nasaZX80 = new Nasa(3,-2,'W')
        this.nasaZX80.move('B');
        expect(this.nasaZX80.getPosition()).toEqual('4,-2,W');
    });

    it('move Forward axe X to East', () => {
        this.nasaZX80 = new Nasa(3,-2,'E')
        this.nasaZX80.move('F');
        expect(this.nasaZX80.getPosition()).toEqual('4,-2,E');
    });


    it('move Backward axe X to East', () => {
        this.nasaZX80 = new Nasa(3,-2,'E')
        this.nasaZX80.move('B');
        expect(this.nasaZX80.getPosition()).toEqual('2,-2,E');
    });

    it('move Forward axe Y to South', () => {
        this.nasaZX80 = new Nasa(3,-2,'S')
        this.nasaZX80.move('F');
        expect(this.nasaZX80.getPosition()).toEqual('3,-3,S');
    });


    it('move Backward axe Y to South', () => {
        this.nasaZX80 = new Nasa(3,-2,'S')
        this.nasaZX80.move('B');
        expect(this.nasaZX80.getPosition()).toEqual('3,-1,S');
    });

    it('test scenario 1', () => {
        this.nasaZX80 = new Nasa(0,0,'N')
        this.nasaZX80.move('F');
        this.nasaZX80.move('F');
        this.nasaZX80.move('R');
        this.nasaZX80.move('B');
        this.nasaZX80.move('L');
        this.nasaZX80.move('F');
        expect(this.nasaZX80.getPosition()).toEqual('-1,3,N');
    });

    it('test planete ronde N foreward', () => {
        this.nasaZX80 = new Nasa(0,10,'N')
        this.nasaZX80.move('F');

        expect(this.nasaZX80.getPosition()).toEqual('0,-10,N');
    });

    it('test planete ronde N backward', () => {
        this.nasaZX80 = new Nasa(0,-10,'N')
        this.nasaZX80.move('B');

        expect(this.nasaZX80.getPosition()).toEqual('0,10,N');
    });

    it('test planete ronde S foreward', () => {
        this.nasaZX80 = new Nasa(0,-10,'S')
        this.nasaZX80.move('F');

        expect(this.nasaZX80.getPosition()).toEqual('0,10,S');
    });

    it('test planete ronde S backward', () => {
        this.nasaZX80 = new Nasa(0,10,'S')
        this.nasaZX80.move('B');

        expect(this.nasaZX80.getPosition()).toEqual('0,-10,S');
    });

    it('test planete ronde E foreward', () => {
        this.nasaZX80 = new Nasa(10,0,'E')
        this.nasaZX80.move('F');

        expect(this.nasaZX80.getPosition()).toEqual('-10,0,E');
    });

    it('test planete ronde E backward', () => {
        this.nasaZX80 = new Nasa(-10,0,'E')
        this.nasaZX80.move('B');

        expect(this.nasaZX80.getPosition()).toEqual('10,0,E');
    });

    it('test planete ronde W foreward', () => {
        this.nasaZX80 = new Nasa(-10,0,'W')
        this.nasaZX80.move('F');

        expect(this.nasaZX80.getPosition()).toEqual('10,0,W');
    });

    it('test planete ronde W backward', () => {
        this.nasaZX80 = new Nasa(10,0,'W')
        this.nasaZX80.move('B');

        expect(this.nasaZX80.getPosition()).toEqual('-10,0,W');
    });

});