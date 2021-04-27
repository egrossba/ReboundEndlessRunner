class Platform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    init(){
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.setMaxVelocity(MAX_X_VEL, MAX_Y_VEL).setCollideWorldBounds(true);
        this.mode = 'up';    
        this.fakeGrav = 100;    
        this.setScale(1.25);
    }

    update() {
        // movement
        if(this.cursors.left.isDown) {
            this.setVelocityX(-VELOCITY);
        } else if(this.cursors.right.isDown) {
            this.setVelocityX(VELOCITY);
        } else {
            this.setVelocityX(0);
        }

        if(this.cursors.up.isDown) {
            this.setVelocityY(-VELOCITY);
        } else if(this.cursors.down.isDown) {
            this.setVelocityY(VELOCITY);
        } else {
            this.setVelocityY(this.fakeGrav);
        }

        // form changes
        switch(this.mode){
            case 'up':
                this.setFlip(false, false);
                break;
            case 'down':
                this.setFlip(false, true);
                break;
            case 'left':
                this.setFlip(false, false);
                break;
            case 'right':
                this.setFlip(true, false);
                break;
        }
    }
}
