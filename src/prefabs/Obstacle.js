class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    }

    init(num){
        this.body.allowGravity = false;
        this.setImmovable(true);
        this.setVelocityY(VELOCITY/2);
        this.yOffset = num * this.displayHeight*4;
        this.y = -this.yOffset;
    }

    update() {
        if (this.y >= game.config.height + this.height/2){
            this.reset();
        }
    }

    reset() {
        this.scene.shuffleObs();
        this.y = -this.yOffset;
    }
}