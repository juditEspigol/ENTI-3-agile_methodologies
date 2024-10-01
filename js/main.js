var config = 
{
    type: Phaser.AUTO, 
    width: 370, 
    height: 550,
    scene: [gameState], 
    render:
    {
        pixelArt:true
    }
}

var juego = new Phaser.Game(config);