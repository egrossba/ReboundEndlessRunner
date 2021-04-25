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
        let rand = Math.random()*5;
        this.x = game.config.width + rand*50;
        this.y = game.config.height - rand*100;
        this.alpha = 1;
    }
}