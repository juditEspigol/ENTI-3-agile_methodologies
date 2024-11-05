var gamePrefs = 
{
    gameWidth: 960, 
    gameHeight: 540,
    level1Width: 1280, // 40*32
    level1Height: 800, // 25*32
    GRAVITY: 1000, 
    HERO_SPEED: 200, 
    HERO_JUMP: 450
}

var config = 
{
    type: Phaser.AUTO, 
    width: gamePrefs.gameWidth, 
    height: gamePrefs.gameHeight,
    scene: [sceneLevel1], 
    render:
    {
        pixelArt:true
    },
    physics:
    {
        default: 'arcade', 
        arcade:
        {
            gravity: {y:gamePrefs.GRAVITY}, 
            debug: true
        }
    }
}

var game = new Phaser.Game(config);