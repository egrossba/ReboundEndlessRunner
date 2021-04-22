class Platform extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.p1 = scene.physics.add.sprite(game.config.width/2, game.config.height/2, texture, frame).setScale(SCALE).setOrigin(0);
        this.p1.body.allowGravity = false;
    }

    update() {
        this.p1.body.setVelocity(game.input.mousePointer.velocity.x * 75, game.input.mousePointer.velocity.y * 75);
        // game.input.mousePointer.x = this.x;
        // game.input.mousePointer.y = this.y;

        this.p1.body.setCollideWorldBounds(true);
    }
}
