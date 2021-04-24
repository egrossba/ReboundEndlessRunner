class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload(){

    }

    create() {
        this.physics.world.gravity.y = GRAVITY;

        // platform
        this.player = new Platform(this, game.config.width/2, game.config.height/2, 'platformer_atlas', 'fly_normal').setOrigin(0);
        this.character = new Character(this, game.config.width/2, 0, 'platformer_atlas', 'front').setScale(SCALE).setOrigin(0);
        this.obstacle1 = new Obstacle(this, game.config.width + borderUISize*6, borderUISize*4, 'platformer_atlas', 'cloud_1').setOrigin(0, 0);
        
        // create keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        // set bg color
        this.cameras.main.setBackgroundColor('#227B96');

        // make ground tiles group
        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'platformer_atlas', 'block').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        // add physics collider
        this.physics.add.collider(this.character, this.player);
        this.physics.add.collider(this.character, this.obstacle1);

        // gameover bool
        this.youLost = false;
    }

    update() {
        if(this.youLost && Phaser.Input.Keyboard.JustDown(keyW)){
            this.scene.restart();
        }

        // move player
        this.player.update();
        this.character.update();
        this.obstacle1.update();

        // switch forms
        if(Phaser.Input.Keyboard.JustDown(keyA)) {
            this.character.mode = 'left';
            this.player.mode = 'left';
        }
        if(Phaser.Input.Keyboard.JustDown(keyW)) {
            this.character.mode = 'up';   
            this.player.mode = 'up';       
        }
        if(Phaser.Input.Keyboard.JustDown(keyS)) {
            this.character.mode = 'down'; 
            this.player.mode = 'down';       
        }
        if(Phaser.Input.Keyboard.JustDown(keyD)) {
            this.character.mode = 'right';   
            this.player.mode = 'right';     
        }

        this.physics.world.collide(this.character, this.ground, this.gameOver, null, this);
    }

    gameOver(){
        this.youLost = true;

        this.player.setAlpha(0);
        this.character.setAlpha(0);

        let loserConfig = {
            fontFamily: 'Courier',
            fontSize: '48px',
            backgroundColor: '',
            color: '#DC143C',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            }
        }

        this.loserText = this.add.text(game.config.width/2 - 200, game.config.height/2, '[W]ow you suck', loserConfig);
    }
}
