class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.cBody = scene.physics.add.sprite(game.config.width/2, game.config.height/2, texture, frame).setScale(SCALE).setOrigin(0);
        this.cBody.body.allowGravity = true;
        this.cBody.body.setMaxVelocity(MAX_X_VEL, MAX_Y_VEL);
    }

    update() {
        if(this.cBody.body.touching.down){
            this.cBody.body.setVelocityY(JUMP_VELOCITY);
        }

        this.cBody.body.setCollideWorldBounds(true);
    }
}