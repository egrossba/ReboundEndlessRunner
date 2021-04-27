class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload(){

    }

    create() {
        this.physics.world.gravity.y = GRAVITY;
        this.scrollSpeed = 3;
        this.bonusFactor = 1;

        // set bg
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'talltrees').setOrigin(0,0);
        this.background.setTint('808080');

        // platform and character
        this.player = new Platform(this, game.config.width/2, game.config.height/2, 'platformer_atlas', 'fly_normal').setOrigin(0);
        this.character = new Character(this, game.config.width/2, 0, 'platformer_atlas', 'front').setScale(SCALE).setOrigin(0);
        
        // obstacles
        this.obstacles = this.add.group();
        this.obstacle1 = new Obstacle(this, game.config.width - 130, game.config.height, 'platformer_atlas', 'cloud_1').setOrigin(0);
        this.obstacle2 = new Obstacle(this, game.config.width - 260, game.config.height, 'platformer_atlas', 'cloud_1').setOrigin(0);
        this.obstacle3 = new Obstacle(this, game.config.width - 390, game.config.height, 'platformer_atlas', 'cloud_1').setOrigin(0);
        this.obstacle4 = new Obstacle(this, game.config.width - 520, game.config.height, 'platformer_atlas', 'cloud_1').setOrigin(0);

        this.obstacles.add(this.obstacle1);
        this.obstacles.add(this.obstacle2);
        this.obstacles.add(this.obstacle3);
        this.obstacles.add(this.obstacle4);

        // create keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // make monster
        this.monster = new Monster(this, game.config.width/2, game.config.height - 80, 'platformer_atlas', 'slime_normal').setScale(3).setOrigin(0);
        
        // add physics colliders
        this.physics.add.collider(this.character, this.obstacles);
        this.physics.add.collider(this.character, this.player);

        // gameover bool
        this.youLost = false;

        // score
        this.score = 0;
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreText = this.add.text(game.config.width - this.scoreConfig.fixedWidth - borderPadding, 
            borderPadding, this.score, this.scoreConfig);

        this.incScore = this.time.addEvent({ delay: 100, callback: this.tickScore, callbackScope: this, loop: true });

    }

    update() {
        if(this.youLost && Phaser.Input.Keyboard.JustDown(keyW)){
            this.scene.restart();
        }

        this.background.tilePositionY -= this.scrollSpeed;

        // match monster with character
        this.monster.x = this.character.x - 50;

        // move player and obstacles
        this.obstacle1.update();
        this.obstacle2.update();
        this.obstacle3.update();
        this.obstacle4.update();
        this.player.update();
        this.monster.update();

        // bounce character off platform
        if(this.player.body.touching.up){
            this.character.update();
        }

        // bounce character off clouds
        if(this.character.body.touching.up){
            this.character.body.setVelocityY(VELOCITY);
        }

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

        // increase difficulty
        if(this.score != 0 && this.score < 4000 && this.score % 500 == 0){
            this.player.fakeGrav += this.bonusFactor;
            this.obstacle1.bonusVel += this.bonusFactor;
            this.obstacle2.bonusVel += this.bonusFactor;
            this.obstacle3.bonusVel += this.bonusFactor;
            this.obstacle4.bonusVel += this.bonusFactor;
            this.scrollSpeed += 0.02;
        }

        this.physics.world.collide(this.character, this.monster, this.gameOver, null, this);
    }

    gameOver(){
        this.youLost = true;

        this.player.setAlpha(0);
        this.character.setAlpha(0);
        this.character.body.enable = false;


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

    tickScore() {
        // update score
        if(!this.youLost){
            this.score += 1;
            this.scoreText.text = this.score;
        }
    }
}
