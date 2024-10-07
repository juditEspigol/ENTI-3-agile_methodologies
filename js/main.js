var gamePrefs = 
{
    SPACESHIP_SPEED: 2, 
    BULLET_SPEED: -100
}

var config = 
{
    type: Phaser.AUTO, 
    width: 370, 
    height: 550,
    scene: [gameState], 
    render: {
        pixelArt:true
    }, 
    physics: {
        default: 'arcade', // collisions with quad. bounding box
        arcade:{
            gravity: {y: 0}, 
            debug:true
        }
    }
}

var juego = new Phaser.Game(config);