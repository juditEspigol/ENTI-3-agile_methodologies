class gameState extends Phaser.Scene
{
    constructor()
    {
        super({key: 'gameState'}); 
    }

    preload()
    {
       this.cameras.main.setBackgroundColor("113"); 

       this.load.setPath('assets/sprites');
       // Load Background sprites
       this.load.image('bg_back', 'background_back.png'); 
       this.load.image('bg_frontal', 'background_frontal.png'); 

       // Load bullet
       this.load.image('bullet', 'spr_bullet_0.png'); 

       // Load spaceship
       this.load.spritesheet('spaceship', 'naveAnim.png', 
       {frameWidth: 16, frameHeight: 24}); 
    }

    create()
    {
        // Background variables
        this.bg_back = this.add.tileSprite(0, 0, config.width, config.height, 'bg_back').setOrigin(0); 
        this.bg_frontal = this.add.tileSprite(0, 0, config.width, config.height, 'bg_frontal').setOrigin(0); 

        // Spaceship animation
        this.spaceship = this.physics.add.sprite(config.width*0.5, config.height*0.95, 'spaceship').setScale(2); 
        this.spaceship.body.setCollideWorldBounds(true);
        this.loadAnimationSpaceship();
        this.spaceship.anims.play('idle'); 
 
        // Inputs 
        this.cursors = this.input.keyboard.createCursorKeys();

        // Bullet instance
        this.loadBulletPools();
        this.cursors.space.on
        (
            'up',
            function()
            {
                this.createBullet();
            }, 
            this // contexto del this dentro de la funcion pasa a ser el de la escena
        );
    }

    loadAnimationSpaceship()
    {
        // Make the transition for the spritesheets
        this.anims.create(
        {
            key: 'idle',
            frames: this.anims.generateFrameNumbers('spaceship', {start: 0, end: 1}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create(
        {
            key: 'left',
            frames: this.anims.generateFrameNumbers('spaceship', {start: 2, end: 3}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create(
        {
            key: 'right',
            frames: this.anims.generateFrameNumbers('spaceship', {start: 4, end: 5}),
            frameRate: 10,
            repeat: -1
        });
    }

    loadBulletPools()
    {
        this.bulletPool = this.physics.add.group(); 
    }

    createBullet()
    {
        var tempBullet = this.bulletPool.getFirst(false); // search for the first bullet not active

        if(!tempBullet)
        {   // There are no left bullets
            console.log('create bullet'); 
            tempBullet = new bulletPrefab(this, this.spaceship.x, this.spaceship.y); 
            this.bulletPool.add(tempBullet); 
        }
        else
        {   // Existing a bullet active in the pool 
            console.log('recicle bullet'); 
            tempBullet.setActive(true); 
            tempBullet.body.reset(this.spaceship.x, this.spaceship.y); 
        }
        // Give velocity
        tempBullet.body.setVelocityY(gamePrefs.BULLET_SPEED); 
        // Sounds
        // ...
    }

    update()
    {
        // Background move
        this.bg_back.tilePositionY -= 0.25; 
        this.bg_frontal.tilePositionY -= 0.5;
        
        // Spaceship logic (inputs and anim.)
        if(this.cursors.right.isDown) 
        {
            this.spaceship.body.velocity.x += gamePrefs.SPACESHIP_SPEED; // without accelearation ==> this.spaceship.body.setVelocityX(gamePrefs.SPACESHIP_SPEED);
            this.spaceship.anims.play('right', true);
        }
        else if(this.cursors.left.isDown) 
        {
            this.spaceship.body.velocity.x -= gamePrefs.SPACESHIP_SPEED;
            this.spaceship.anims.play('left', true);
        }
        else 
        {
            this.spaceship.anims.play('idle', true);
        }
    }
}