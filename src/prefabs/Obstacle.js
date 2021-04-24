class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.setImmovable(true).setMaxVelocity(MAX_X_VEL, MAX_Y_VEL).setCollideWorldBounds(false);
    }

    update() {
        this.setVelocityX(-MAX_X_VEL);

        if (this.x <= -this.width){
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width + 50;
        let rand = Math.random()*4
        this.y = game.config.height/rand;
        this.alpha = 1;
    }
}