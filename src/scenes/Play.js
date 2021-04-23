class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload(){

    }

    create() {
        this.physics.world.gravity.y = GRAVITY;

        // platform
        this.player = new Platform(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'platformer_atlas', 'cloud_1').setOrigin(0.5, 0);
        this.character = new Character(this, game.config.width/2, game.config.height/2, 'platformer_atlas', 'front').setScale(SCALE);

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

        // draw grid lines for jump height reference
        let graphics = this.add.graphics();
        graphics.lineStyle(2, 0xFFFFFF, 0.1);
	    for(let y = game.config.height-70; y >= 35; y -= 35) {
            graphics.lineBetween(0, y, game.config.width, y);
        }

        // make ground tiles group
        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'platformer_atlas', 'block').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        // add physics collider
        this.physics.add.collider(this.character.cBody, this.ground);
        this.physics.add.collider(this.character.cBody, this.player.p1);
    }

    update() {
        // move player
        this.player.update();
        this.character.update();

        // switch forms
        if(Phaser.Input.Keyboard.JustDown(keyA)) {
            this.character.mode = left;
        }
        if(Phaser.Input.Keyboard.JustDown(keyW)) {
            this.character.mode = up;        
        }
        if(Phaser.Input.Keyboard.JustDown(keyS)) {
            this.character.mode = down;        
        }
        if(Phaser.Input.Keyboard.JustDown(keyD)) {
            this.character.mode = right;        
        }

        // wrap physics object(s) .wrap(gameObject, padding)
        this.physics.world.wrap(this.character, this.width/2);
    }
}
