class menuState extends Phaser.Scene
{
    constructor()
    {
        super({key: 'menuState'}); 
    }

    preload()
    {
        this.cameras.main.setBackgroundColor("113"); 

        this.load.setPath('assets/sprites');
        // Load Background sprites
        this.load.image('bg_back', 'background_back.png'); 
        this.load.image('bg_frontal', 'background_frontal.png'); 

        this.load.image('btn', 'btn.png'); 

        // Load spaceship
        this.load.spritesheet('player', 'naveAnim.png', 
        {frameWidth: 16, frameHeight: 24}); 
    }

    create()
    {
        this.loadAnimationSpaceship();

        // Last layer --> Background variables
        this.bg_back = this.add.tileSprite(0, 0, config.width, config.height, 'bg_back').setOrigin(0); 
        this.bg_frontal = this.add.tileSprite(0, 0, config.width, config.height, 'bg_frontal').setOrigin(0); 

        // 2nd layer --> Spaceship animation
        this.spaceship = new playerPrefab(this, config.width * 0.5, config.height * 0.5);

        this.btn = this.add.sprite(config.width * 0.5, config.height * 0.75, 'btn').setOrigin(0.5).setScale(0.5).setDepth(1)
        .setInteractive({useHandCursor: true})
        .on(
            'pointerdown',
            this.initGame,
            this
        ); 
        
        this.title = this.add.text(config.width * 0.5, config.height * 0.25, "SHOOTER 2D", 
            {
                fontFamily: 'Arial Black',
                fill: '#43d637',
                stroke: '#FFFFFF',
                strokeThickness: 4
            }).setOrigin(0.5).setFontSize(30).setDepth(1); 
    }

    // Animations
    loadAnimationSpaceship()
    {
        // Make the transition for the spritesheets
        this.anims.create(
        {
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 1}),
            frameRate: 10,
            repeat: -1
        });
    }

    initGame()
    {
        this.btn.destroy();
        this.add.tween
        ({
            targets: this.title, 
            duration: 2 * 1000, 
            alpha: 0
        });

        this.add.tween
        ({
            targets:this.spaceship,
            duration: 3 * 1000, 
            y: config.height * 0.95,
            onComplete: this.changeScene,
            callbackScope: this
        })
    }

    changeScene()
    {
        this.scene.start('gameState');
    }

    update()
    {
        // Background move
        this.bg_back.tilePositionY -= 0.25; 
        this.bg_frontal.tilePositionY -= 0.5;
    }
}