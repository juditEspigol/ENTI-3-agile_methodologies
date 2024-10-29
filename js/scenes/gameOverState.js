class gameOverState extends Phaser.Scene
{
    constructor()
    {
        super({key:  'gameOverState'}); 
    }

    preload()
    {
        this.cameras.main.setBackgroundColor("113"); 
    }

    create()
    {
        // Last layer --> Background variables
        this.bg_back = this.add.tileSprite(0, 0, config.width, config.height, 'bg_back').setOrigin(0); 
        this.bg_frontal = this.add.tileSprite(0, 0, config.width, config.height, 'bg_frontal').setOrigin(0); 

        this.title = this.add.text(config.width * 0.5, config.height * 0.25, "GAME OVER", 
            {
                fontFamily: 'Arial Black',
                fill: '#43d637',
                stroke: '#FFFFFF',
                strokeThickness: 4
            }).setOrigin(0.5).setFontSize(30).setDepth(1); 
        this.actualScore = this.add.text(config.width * 0.5, config.height * 0.5 - 80, "You obtained " + localStorage.getItem('actualScore') + " pt", 
            {
                fontFamily: 'Arial Black',
                fill: '#FFFFFF'
            }).setOrigin(0.5).setFontSize(30).setDepth(1); 

        

        this.actualScore = this.add.text(config.width * 0.5, config.height * 0.5 - 40, "HIGHSCORE: " + localStorage.getItem('actualScore') + " pt", 
            {
                fontFamily: 'Arial Black',
                fill: '#FFFFFF'
            }).setOrigin(0.5).setFontSize(30).setDepth(1); 
    }

    update()
    {
        // Background move
        this.bg_back.tilePositionY -= 0.25; 
        this.bg_frontal.tilePositionY -= 0.5;
    }
}