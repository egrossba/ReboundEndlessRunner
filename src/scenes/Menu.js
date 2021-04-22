class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('RocketPatrolMenu', 'assets/RocketPatrolMenu.png');
    }

    create() {
        
        this.rocketPatrolMenu = this.add.tileSprite(
            0,30,0,0, 'RocketPatrolMenu'
        ).setOrigin(0,0);

        this.rocketPatrolMenu.displayWidth = game.config.width*1;
        this.rocketPatrolMenu.scaleY = this.rocketPatrolMenu.scaleX;
    }

    update() {
        if (Phaser.Input.Cursor.JustDown(leftClick)) {
          //this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
      }
}