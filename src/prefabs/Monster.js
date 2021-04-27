class Monster extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    init(){
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.setCollideWorldBounds(true);
    }

    update() {
        this.x = Phaser.Math.Clamp(
            this.x,
            0,
            game.config.width - 130);
    }
}