class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    }

    init(){
        this.body.allowGravity = false;
        this.setImmovable(true);
        this.setVelocityY(VELOCITY/2);
        this.yOffset = (Math.random()*4)*300;
        this.reset();
    }

    update() {
        if (this.y >= game.config.height + this.height/2){
            this.reset();
        }
    }

    reset() {
        let rand = Math.random()*10;
        this.y = -rand*100 - this.yOffset;
    }
}