class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.setImmovable(true).setMaxVelocity(MAX_X_VEL, MAX_Y_VEL).setCollideWorldBounds(false);
        this.bonusVel = 0;
    }

    update() {
        this.setVelocityY(VELOCITY/2 + this.bonusVel);

        if (this.y >= game.config.height){
            this.reset();
        }
    }

    reset() {
        let rand = Math.random()*5;
        this.y = -game.config.height - rand*250;
        this.alpha = 1;
    }
}