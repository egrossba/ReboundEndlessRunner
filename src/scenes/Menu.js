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
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '32px',
            backgroundColor: '',
            color: '#DC143C',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            }
        }

        this.menuText = this.add.text(game.config.width/2 - 220, game.config.height/2 - 200, 
            'Use arrow keys to move', menuConfig);
        this.menuText2 = this.add.text(game.config.width/2 - 250, game.config.height/2 - 100, 
            'and WASD to switch bounces', menuConfig);
        this.menuText3 = this.add.text(game.config.width/2 - 180, game.config.height/2, 
            'Press [W] to start', menuConfig);
        
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyW)){
            this.scene.start('playScene');
        }
    }
}