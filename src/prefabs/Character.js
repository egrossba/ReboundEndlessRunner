class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.allowGravity = true;
        this.setMaxVelocity(MAX_X_VEL, MAX_Y_VEL).setCollideWorldBounds(true);
        this.mode = 'up';
    }

    update() {
        if(this.touching.down){
            switch(this.mode){
                case 'up':
                    this.setVelocity(0, JUMP_VELOCITY);
                    break;
                case 'down':
                    this.setVelocity(0, JUMP_VELOCITY/3);
                    break;
                case 'left':
                    this.setVelocity(-VELOCITY/3, JUMP_VELOCITY*2/3);
                    break;
                case 'right':
                    this.setVelocity(VELOCITY/3, JUMP_VELOCITY*2/3);
                    break;
            }
        }
    }
}