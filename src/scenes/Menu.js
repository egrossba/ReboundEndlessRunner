class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // set load path
        this.load.path = 'assets/';
        // take care of all of our asset loading now
        this.load.atlas('platformer_atlas', 'kenny_sheet.png', 'kenny_sheet.json');
        this.load.image('groundScroll', 'ground.png');
        this.load.image('talltrees', 'talltrees.png');
    }

    create() {
        
        this.scene.start('playScene');
    }

    update() {
        
    }
}