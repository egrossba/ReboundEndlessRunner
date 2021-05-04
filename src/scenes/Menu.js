class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // set load path
        this.load.path = 'assets/';
        // take care of all of our asset loading now
        this.load.atlas('monster_atlas', 'monster_sheet.png', 'monster_sheet.json');
        this.load.image('groundScroll', 'ground.png');
        this.load.image('talltrees', 'talltrees.png');
        this.load.image('side', 'side.png');
        this.load.image('sidealt', 'sidealt.png');
        this.load.image('bunny', 'bunny.png');
        this.load.image('butlerGlowDown', 'lowbouncer.png');
        this.load.image('butlerGlowUp', 'highbouncer.png');
        this.load.image('backgroundStuff', 'BGNEW2.png');
        this.load.image('chandelier', 'chandelier.png');
        this.load.image('mirror', 'mirror.png');
        this.load.image('sun', 'sun.png');
        this.load.image('heart', 'heart.png');

        this.load.audio('bgm', 'bgm.wav');
        this.load.audio('bunnyjump', 'bunnyjump.wav');
        this.load.audio('hit', 'hit.wav');
        this.load.audio('startGame', 'startGame.wav');
        this.load.audio('formChange', 'formChange.wav');
        this.load.audio('lose', 'lose.wav');
    }

    create() {
        // camera
        for(let i = 0; i < 12; i++){
            this.add.sprite(0, game.config.height*i, 'backgroundStuff').setOrigin(0).setScale(SCALE);
        }

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '32px',
            backgroundColor: '#FFFFFF',
            color: '#DC143C',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            }
        }

        this.menuText = this.add.text(game.config.width/2 - 240, game.config.height/2 - 150, 
            'Use the mouse to move and', menuConfig);
        this.menuText2 = this.add.text(game.config.width/2 - 255, game.config.height/2 - 50, 
            'WASD to toggle bounce modes', menuConfig);
        this.menuText3 = this.add.text(game.config.width/2 - 180, game.config.height/2 + 50, 
            'Press [W] to start', menuConfig);
        
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyW)){
            this.sound.play('startGame');
            this.cameras.main.pan(game.config.width/2, game.config.height*11.5, 2000, 'Power2');
            this.time.delayedCall(2000, () => { 
                this.scene.start('playScene');
            });
        }
    }
}