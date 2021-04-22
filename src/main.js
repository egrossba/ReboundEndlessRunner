'use strict';

// global variables
let cursors;
let currentScene = 0;
const SCALE = 0.5;
const tileSize = 35;

// main game object
let config = {
    type: Phaser.WEBGL,
    width: 840,
    height: 525,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Menu, Play ]
};

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// variables and settings
let VELOCITY = 500;
let MAX_X_VEL = 500;   // pixels/second
let MAX_Y_VEL = 500;
let JUMP_VELOCITY = -1000;
let GRAVITY = 1000;

let keyLEFT, keyUP, keyDOWN, keyRIGHT;
