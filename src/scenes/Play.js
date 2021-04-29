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
        this.obsVel = VELOCITY/2;

        // set bg
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'talltrees').setOrigin(0,0);
        this.background.setTint('808080');

        // obstacles
        this.obstacles = this.physics.add.group({runChildUpdate: true});
        this.addObstacle();

        // platform and character
        this.player = new Platform(this, game.config.width/2, game.config.height/2, 'butler');
        this.character = new Character(this, game.config.width/2, 0, 'bunny');
        this.monster = new Monster(this, game.config.width/2, game.config.height - 30, 'platformer_atlas', 'slime_normal');
        this.player.init();
        this.character.init();
        this.monster.init();

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // add physics colliders
        this.physics.add.overlap(this.character, this.player, (c, p) => {
            // bounce character off platform
            if(p.body.touching.up && !c.body.touching.up){
                c.bounce();
            }
        });
        this.physics.add.collider(this.character, this.obstacles, (c, o) => {
            if(o.body.touching.down && c.body.touching.up){
                c.setVelocityY(VELOCITY);
                if(this.player.y < c.y + c.displayHeight/2 + this.player.displayHeight){
                    // failsafe for cloud collision bug, ty Adam Smith
                    c.y = this.player.y + this.player.displayHeight;
                }
            }
        });
        this.physics.add.overlap(this.character, this.monster, this.gameOver, null, this);

        // gameover bool
        this.youLost = false;

        // score
        this.score = 0;
        this.highScore = 0;

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
        this.monster.x = this.character.x;

        // move player and obstacles
        this.player.update();
        this.monster.update();

        // rotate character
        this.character.angle += this.character.body.velocity.x/100;

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
        if(this.score != 0 && this.score < 2000 && this.score % 200 == 0){
            this.obsVel += this.bonusFactor/50;
            this.scrollSpeed += 0.02;
            this.bonusFactor++;
        }
    }

    gameOver(){
        this.youLost = true;

        this.character.setAlpha(0);
        this.character.body.enable = false;

        // check for high score in local storage
        if(localStorage.getItem('highScore') != null) {
            let storedScore = parseInt(localStorage.getItem('highScore'));
            // see if current score is higher than stored score
            if(this.score > storedScore) {
                localStorage.setItem('highScore', this.score.toString());
                this.highScore = this.score;
            } else {
                this.highScore = parseInt(localStorage.getItem('highScore'));
            }
        } else {
            this.highScore = this.score;
            localStorage.setItem('highScore', this.highScore.toString());
        }

        let loserConfig = {
            fontFamily: 'Courier',
            fontSize: '48px',
            backgroundColor: '#FFFFFF',
            color: '#DC143C',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            }
        }

        this.loserText = this.add.text(game.config.width/2 - 160, game.config.height/2 - 50, '[W]hoops...', loserConfig);
        this.hScoreText = this.add.text(game.config.width/2 - 250, game.config.height/2 + 50, 'High Score: ' + this.highScore, loserConfig);
    }

    tickScore() {
        // update score
        if(!this.youLost){
            this.score += 10;
            this.scoreText.text = this.score;
        }
    }

    addObstacle(){
        let obs = new Obstacle(this, game.config.width/2, -game.config.height/2, 'platformer_atlas', 'cloud_1');
        this.obstacles.add(obs);
        obs.init(this.obsVel);
    }
}
