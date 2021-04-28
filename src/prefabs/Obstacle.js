class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    }

    init(){
        this.body.allowGravity = false;
        this.setImmovable(true);
        this.reset();
        this.setVelocityY(VELOCITY/2);
    }

    update() {
        if (this.y >= game.config.height + this.height/2){
            this.reset();
        }
    }

    reset() {
        let rand = Math.random()*2000;
        this.y = -rand;
    }
}