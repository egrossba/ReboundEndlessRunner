class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = true;
        this.body.setMaxVelocity(MAX_X_VEL, MAX_Y_VEL).setCollideWorldBounds(true);
        this.mode = 'up';
    }

    update() {
        if(this.body.touching.down){
            switch(this.mode){
                case 'up':
                    this.body.setVelocity(0, JUMP_VELOCITY);
                    break;
                case 'down':
                    this.body.setVelocity(0, JUMP_VELOCITY/3);
                    break;
                case 'left':
                    this.body.setVelocity(-VELOCITY/3, JUMP_VELOCITY*2/3);
                    break;
                case 'right':
                    this.body.setVelocity(VELOCITY/3, JUMP_VELOCITY*2/3);
                    break;
            }
        }
    }
}