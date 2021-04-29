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

        // obstacles
        this.nums = [];
        Phaser.Utils.Array.Add(this.nums, [1, 2, 3, 4]);
        Phaser.Utils.Array.Shuffle(this.nums);
        this.obstacles = this.physics.add.group({runChildUpdate: true});
        for(let i = 0; i < 4; i++){
            let obs = new Obstacle(this, game.config.width - 65, -game.config.height, 'platformer_atlas', 'cloud_1').setOrigin(0.5);
            obs.x -= obs.width * i + 3;
            this.obstacles.add(obs);
            this.add.existing(obs);
            obs.init(this.nums[i]);
        }

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
        this.physics.add.overlap(this.character, this.player);
        this.physics.add.collider(this.character, this.obstacles, (c, o) => {
            if(o.body.touching.down && c.body.touching.up){
                c.setVelocityY(VELOCITY);
                if(this.player.y < c.y + c.displayHeight/2 + this.player.displayHeight){
                    // failsafe for cloud collision bug, ty Adam Smith
                    c.y = this.player.y + this.player.displayHeightw;
                }
            }
        });

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

        // bounce character off platform
        if(this.player.body.touching.up && !this.character.body.touching.up){
            this.character.bounce();
        }

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
        if(this.score != 0 && this.score < 2400 && this.score % 300 == 0){
            this.player.fakeGrav += this.bonusFactor/50;
            Phaser.Actions.Call(this.obstacles.getChildren(), function(ob){
                ob.body.velocity.y += this.bonusFactor/50;
            }, this);
            this.scrollSpeed += 0.02;
            this.bonusFactor++;
        }

        this.physics.world.collide(this.character, this.monster, this.gameOver, null, this);
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
            this.score += 1;
            this.scoreText.text = this.score;
        }
    }

    shuffleObs(){
        // update obstacles
        Phaser.Utils.Array.Shuffle(this.nums);
        let obs = this.obstacles.getChildren();
        for(let i = 0; i < this.nums.length; i++){
            obs[i].yOffset = this.nums[i] * obs[i].displayHeight*4;
        }
    }
}
