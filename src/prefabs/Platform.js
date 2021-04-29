class Platform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.sheen = scene;
    }

    init(){
        this.setScale(.12).setOrigin(0.5);
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.setMaxVelocity(MAX_X_VEL, MAX_Y_VEL).setCollideWorldBounds(true);
        this.mode = 'up';   
        
        // player movement
        this.sheen.input.on('pointerdown', function (pointer){
            this.sheen.input.mouse.requestPointerLock();
        }, this);

        this.sheen.input.on('pointermove', function (pointer) {
            if (this.sheen.input.mouse.locked)
            {
                this.x += pointer.movementX;
                this.y += pointer.movementY;

                this.x = Phaser.Math.Wrap(this.x, 0, game.config.width);
                this.y = Phaser.Math.Wrap(this.y, 0, game.config.height);
            }
        }, this);
    }

    update() {
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
