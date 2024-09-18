class gameState extends Phaser.Scene
{
    constructor()
    {
        super({key: 'gameState'}); 
    }

    preload()
    {
        // Upload assets
        this.cameras.main.setBackgroundColor("AAA");
        this.load.image('background', 'assets/sprites/bg.jpg'); 
    }

    create()
    {
        // Draw assets 
        this.add.image(config.width/2, config.height/2,'background'); 
    }

    update()
    {
        
    }
}