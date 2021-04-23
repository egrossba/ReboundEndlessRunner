class Platform extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.p1 = scene.physics.add.sprite(game.config.width/2, game.config.height/2, texture, frame).setScale(SCALE).setOrigin(0);
        this.p1.setScale(1);
        this.p1.body.immovable = true;
        this.p1.body.allowGravity = false;
        this.p1.body.setMaxVelocity(MAX_X_VEL, MAX_Y_VEL);
        this.p1.body.setCollideWorldBounds(true);
        this.mode = 'up';
    }

    update() {
        // movement
        if(keyLEFT.isDown) {
            this.p1.body.setVelocityX(-VELOCITY);
            //this.p1.setFlip(true, false);
            //this.p1.anims.play('jump', true);
        } else if(keyRIGHT.isDown) {
            this.p1.body.setVelocityX(VELOCITY);
            //this.p1.resetFlip();
            //this.p1.anims.play('jump', true);
        } else {
            this.p1.body.setVelocityX(0);
            //this.p1.anims.play('idle');
        }

        if(keyUP.isDown) {
            this.p1.body.setVelocityY(-VELOCITY);
            //this.p1.anims.play('jump', true);
        } else if(keyDOWN.isDown) {
            this.p1.body.setVelocityY(VELOCITY);
            //this.p1.anims.play('jump', true);
        } else {
            this.p1.body.setVelocityY(0);
            //this.p1.anims.play('idle');
        }

        // form changes
        switch(this.mode){
            case 'up':
                this.p1.setFlip(false, false);
                break;
            case 'down':
                this.p1.setFlip(false, true);
                break;
            case 'left':
                this.p1.setFlip(false, false);
                break;
            case 'right':
                this.p1.setFlip(true, false);
                break;
        }
    }
}
