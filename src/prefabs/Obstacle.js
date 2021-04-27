class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        // scene.add.existing(this);
        // scene.physics.add.existing(this);
        
    }

    init(){
        this.body.allowGravity = false;
        this.setImmovable(true);
        this.bonusVel = 0;
        this.reset();
        this.setVelocityY(VELOCITY/2 + this.bonusVel);
    }

    update() {
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