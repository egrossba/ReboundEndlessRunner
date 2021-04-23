class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.cBody = scene.physics.add.sprite(game.config.width/2, game.config.height/2, texture, frame).setScale(SCALE).setOrigin(0);
        this.cBody.body.allowGravity = true;
        this.cBody.body.setMaxVelocity(MAX_X_VEL, MAX_Y_VEL);
        this.cBody.body.setCollideWorldBounds(true);
        this.mode = 'up';
    }

    update() {
        if(this.cBody.body.touching.down){
            switch(this.mode){
                case 'up':
                    this.cBody.body.setVelocityY(JUMP_VELOCITY);
                    this.cBody.body.setVelocityX(0);
                    break;
                case 'down':
                    this.cBody.body.setVelocityY(JUMP_VELOCITY/3);
                    this.cBody.body.setVelocityX(0);
                    break;
                case 'left':
                    this.cBody.body.setVelocityY(JUMP_VELOCITY*2/3);
                    this.cBody.body.setVelocityX(-VELOCITY/3);
                    break;
                case 'right':
                    this.cBody.body.setVelocityY(JUMP_VELOCITY*2/3);
                    this.cBody.body.setVelocityX(VELOCITY/3);
                    break;
            }
        }
    }
}