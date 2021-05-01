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
        this.load.image('butler', 'butler.png');
        this.load.image('bunny', 'bunny.png');
        this.load.image('butlerGlowDown', 'lowbouncer.png');
        this.load.image('butlerGlowUp', 'highbouncer.png');
        this.load.image('backgroundPlain', 'BGNEWempty.png');
        this.load.image('backgroundStuff', 'BGNEW2.png');
        this.load.image('shadow', 'shadow.png');
        this.load.image('tear1', 'tear1.png');
        this.load.image('tear2', 'tear2.png');
        this.load.image('tear3', 'tear3.png');
        this.load.image('web', 'web.png');


        this.load.audio('bgm', 'bgm.wav');
        this.load.audio('bunnyjump', 'bunnyjump.wav');
        this.load.audio('hit', 'hit.wav');
        this.load.audio('startGame', 'startGame.wav');
        this.load.audio('formChange', 'formChange.wav');
        this.load.audio('lose', 'lose.wav');
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

        this.menuText = this.add.text(game.config.width/2 - 240, game.config.height/2 - 200, 
            'Use the mouse to move and', menuConfig);
        this.menuText2 = this.add.text(game.config.width/2 - 255, game.config.height/2 - 100, 
            'WASD to toggle bounce modes', menuConfig);
        this.menuText3 = this.add.text(game.config.width/2 - 180, game.config.height/2, 
            'Press [W] to start', menuConfig);
        
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyW)){
            this.sound.play('startGame');
            this.scene.start('playScene');
        }
    }
}