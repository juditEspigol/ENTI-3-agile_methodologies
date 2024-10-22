var gamePrefs = 
{
    SPACESHIP_SPEED: 2, 
    BULLET_SPEED: -100,
    ENEMY_BULLET_SPPED: 100,
    ENEMY_SPEED: 40
}

var config = 
{
    type: Phaser.AUTO, 
    width: 370, 
    height: 550,
    scene: [menuState, gameState], // array con los niveles/pantallas/scenas
    scale:
    {
        mode:Phaser.Scale.FIT,
        autoCenter:Phaser.Scale.CENTER_BOTH
    },
    render: 
    {
        pixelArt:true
    }, 
    physics: 
    {
        default: 'arcade', // collisions with quad. bounding box
        arcade:
        {
            gravity: {y: 0}, 
            debug:true
        }
    }
}

var juego = new Phaser.Game(config);