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

       // Load UI
       this.load.spritesheet('armor', 'spr_armor.png', 
        {frameWidth: 66, frameHeight: 28}); 

       // Load bullet
       this.load.image('bullet', 'spr_bullet_0.png'); 
       this.load.image('enemy_bullet', 'spr_enemy_bullet_0.png'); 

       // Load explosion
       this.load.spritesheet('explosion', 'explosion.png', 
        {frameWidth: 16, frameHeight: 16});

       // Load enemy
       this.load.spritesheet('enemy', 'enemy-medium.png', 
        {frameWidth: 32, frameHeight: 16}); 

       // Load spaceship
       this.load.spritesheet('player', 'naveAnim.png', 
       {frameWidth: 16, frameHeight: 24}); 

    }

    create()
    {  
        // Inputs 
        this.cursors = this.input.keyboard.createCursorKeys();
        // Animations
        this.loadAnimationExplosion();
        this.loadAnimationEnemy();
        this.loadAnimationSpaceship();
        // Pools
        this.loadPools(); 
        
        // Last layer --> Background variables
        this.bg_back = this.add.tileSprite(0, 0, config.width, config.height, 'bg_back').setOrigin(0); 
        this.bg_frontal = this.add.tileSprite(0, 0, config.width, config.height, 'bg_frontal').setOrigin(0); 
        // 1st layer --> Load UI
        this.armor = this.add.sprite(5, 5, 'armor').setOrigin(0).setFrame(4).setDepth(1); 

        // 2nd layer --> Spaceship animation
        this.spaceship = new playerPrefab(this, config.width * 0.5, config.height * 0.95);

        // Instanicate elements
        this.instanciateEnemy(); 
        this.instanciateBullet(); 

        //Collisions
        this.detectCollisions(); 
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
        this.anims.create(
        {
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', {start: 2, end: 3}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create(
        {
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {start: 4, end: 5}),
            frameRate: 10,
            repeat: -1
        });
    }
    loadAnimationEnemy()
    {
        this.anims.create(
            {
                key: 'idleEnemy',
                frames: this.anims.generateFrameNumbers('enemy', {start: 0, end: 1}),
                frameRate: 10,
                repeat: -1
            });
    }
    loadAnimationExplosion()
    {
        this.anims.create(
            {
                key: 'explote',
                frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 4}),
                frameRate: 10,
                repeat: 0
            });
    }

    // Pools
    loadPools()
    {
        this.enemyPool = this.physics.add.group(); 
        this.bulletPool = this.physics.add.group(); 
        this.enemyBulletPool = this.physics.add.group(); 
        this.explosionPool = this.add.group(); 
    }

    // Instanciate elements
    instanciateEnemy()
    {
        this.time.addEvent(
            {
                delay: 2 * 1000, 
                callback: this.createEnemy,
                callbackScope: this, 
                loop: true
            });
    }
    instanciateBullet()
    {
        this.cursors.space.on
        (
            'up',
            function() { this.createBullet(); }, 
            this // contexto del this dentro de la funcion pasa a ser el de la escena
        ) ;
    }

    // Collisions
    detectCollisions()
    {
        // Collision enemy with bullet
        this.physics.add.overlap
        (
            this.bulletPool, // obj 1
            this.enemyPool, // obj 2
            this.killEnemy, // callback
            null, // process callback: lo que devolveria el callback
            this // callback context
        );
       // Collision enemy with bullet and with enemy
       this.physics.add.overlap
       (
           this.spaceship, // obj 1
           this.enemyBulletPool, // obj 2
           this.killPlayerByBullet, // callback
           null, // process callback: lo que devolveria el callback
           this // callback context
       );
       this.physics.add.overlap
       (
           this.spaceship, // obj 1
           this.enemyPool, // obj 2
           this.killPlayerByEnemy, // callback
           null, // process callback: lo que devolveria el callback
           this // callback context
       );
    }
    killEnemy(_bullet, _enemy) // be carefull with the order
    {   
        _bullet.setActive(false);
        this.createExplosion(_bullet.x, _bullet.body.top, 2);
        _bullet.body.reset(-300);

        _enemy.health--; 
        if(_enemy.health <= 0)
        {
            this.createExplosion(_enemy.x, _enemy.body.bottom, 4);
            _enemy.desactivate();
            // update score ...
            // drop power ups ...
        }
    }
    killPlayerByBullet(_player, _collision)
    {
        _collision.setActive(false); 
        this.createExplosion(_collision.x, _collision.body.bottom, 2); 
        _collision.body.reset(-1000); 

        _player.health--; 
        // Update UI
        this.armor.setFrame(_player.health); 
        if(_player.health <= 0)
        { 
            this.createExplosion(_player.x, _player.body.top, 4); 
            this.time.addEvent(
                {
                    delay: 1 * 1000, 
                    callback: this.resetLevel,
                    callbackScope: this, 
                    loop: false
                });
        }
    }
    killPlayerByEnemy(_player, _collision)
    {
        _collision.setActive(false); 
        this.createExplosion(_collision.x, _collision.body.bottom, 2); 
        _collision.body.reset(-100); 

        // Update UI
        this.armor.setFrame(0); 
        this.createExplosion(_player.x, _player.body.top, 4); 
        this.time.addEvent(
            {
                delay: 1 * 1000, 
                callback: this.resetLevel,
                callbackScope: this, 
                loop: false
            });
    }

    // Creations
    createEnemy()
    {
        var tempEnemy = this.enemyPool.getFirst(false); 

        var posX = Phaser.Math.Between(32, config.width - (32));
        var posY = 0;

        if(!tempEnemy)
        {
            tempEnemy = new enemyPrefab(this, posX, posY);
            this.enemyPool.add(tempEnemy); 
        }
        else
        {
            tempEnemy.setActive(true);
            tempEnemy.body.reset(posX, posY);
        }
        tempEnemy.body.setVelocityY(gamePrefs.ENEMY_SPEED);
        // Sounds ...
    }
    createBullet()
    {
        var tempBullet = this.bulletPool.getFirst(false); // search for the first bullet not active

        if(!tempBullet)
        {   // There are no left bullets
            tempBullet = new bulletPrefab(this, this.spaceship.x, this.spaceship.body.top); 
            this.bulletPool.add(tempBullet); 
        }
        else
        {   // Existing a bullet active in the pool 
            tempBullet.setActive(true); 
            tempBullet.body.reset(this.spaceship.x, this.spaceship.body.top); 
        }
        // Give velocity
        tempBullet.body.setVelocityY(gamePrefs.BULLET_SPEED); 
        // Sounds ...
    }
    createEnemyBullet(_posX, _posY)
    {
        var tempBullet = this.enemyBulletPool.getFirst(false);

        if(!tempBullet)
        {   
            tempBullet = new bulletPrefab(this, _posX, _posY, 'enemy_bullet'); 
            this.enemyBulletPool.add(tempBullet); 
        }
        else
        {   
            tempBullet.setActive(true); 
            tempBullet.body.reset(_posX, _posY); 
        }
        tempBullet.body.setVelocityY(gamePrefs.ENEMY_BULLET_SPPED); 
        // Sounds ...
    }
    createExplosion(_posX, _posY, _scale)
    {
        var tempExplosion = this.explosionPool.getFirst(false); 

        if(!tempExplosion)
        {
            tempExplosion = new explosionPrefab(this, _posX, _posY, _scale); 
            this.explosionPool.add(tempExplosion); 
        }
        else
        {
            tempExplosion.setActive(true);
            tempExplosion.anims.play('explote'); 
            tempExplosion.setPosition(_posX, _posY).setScale(_scale); 
        }
        // Sounds ...
    }

    resetLevel()
    {
        this.scene.restart(); 
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