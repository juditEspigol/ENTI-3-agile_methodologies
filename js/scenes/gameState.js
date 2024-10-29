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
       this.load.image('ui_score', 'spr_score_0.png'); 

       // Load explosion
       this.load.spritesheet('explosion', 'explosion.png', 
        {frameWidth: 16, frameHeight: 16});

       // Load enemy
       this.load.spritesheet('enemy', 'enemy-medium.png', 
        {frameWidth: 32, frameHeight: 16}); 

       // Load spaceship
       this.load.spritesheet('player', 'naveAnim.png', 
       {frameWidth: 16, frameHeight: 24}); 

       // Load Power ups
       this.load.spritesheet('power_up_1', 'spr_power_up.png', 
        {frameWidth: 16, frameHeight: 16});
       this.load.spritesheet('power_up_2', 'spr_power_up_2.png', 
        {frameWidth: 16, frameHeight: 16});

        this.load.setPath('assets/sounds');
        this.load.audio('shoot', 'snd_shoot.mp3');
        this.load.audio('enemy_shoot', 'snd_laser.wav');
        this.load.audio('explosion', 'explosion.wav');

    }

    create()
    {  
        // Inputs 
        this.cursors = this.input.keyboard.createCursorKeys();
        // Animations
        this.loadAnimationExplosion();
        this.loadAnimationEnemy();
        this.loadAnimationSpaceship();
        this.loadAnimationPowerUp();
        // Pools
        this.loadPools(); 
        this.loadSounds();
        
        // Last layer --> Background variables
        this.bg_back = this.add.tileSprite(0, 0, config.width, config.height, 'bg_back').setOrigin(0); 
        this.bg_frontal = this.add.tileSprite(0, 0, config.width, config.height, 'bg_frontal').setOrigin(0); 
        // 1st layer --> Load UI
        this.armor = this.add.sprite(5, 5, 'armor').setOrigin(0).setFrame(4).setDepth(1); 
        this.ui_score = this.add.sprite(config.width - 5, 5, 'ui_score').setOrigin(1, 0).setDepth(1); 
        this.ui_score.score = 0; 
        this.ui_score.scoreText = this.add.text(config.width - 10, 21, "0000", 
            {
                fontFamily: 'Arial',
                fill: '#FFFFFF',
                fontSize: 20
            }).setOrigin(1, 0.5).setDepth(2); 

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
                repeat: 0,
                showOnStart:true,
                hideOnComplete:true
            });
    }
    loadAnimationPowerUp()
    {
        this.anims.create(
            {
                key: 'standPowerUp_1',
                frames: this.anims.generateFrameNumbers('power_up_1', {start: 0, end: 1}),
                frameRate: 10,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'standPowerUp_2',
                frames: this.anims.generateFrameNumbers('power_up_2', {start: 0, end: 1}),
                frameRate: 10,
                repeat: -1
            });
    }

    // Pools
    loadPools()
    {
        this.enemyPool = this.physics.add.group(); 
        this.bulletPool = this.physics.add.group(); 
        this.enemyBulletPool = this.physics.add.group(); 
        this.powerUpPool = this.physics.add.group(); 
        this.explosionPool = this.add.group(); 
    }
    // Sounds
    loadSounds()
    {
        this.sound_shoot = this.sound.add('shoot');
        this.sound_enemyShoot = this.sound.add('enemy_shoot');
        this.sound_explosion = this.sound.add('explosion');
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
       this.physics.add.overlap
       (
           this.spaceship, // obj 1
           this.powerUpPool, // obj 2
           this.pickPowerUp, // callback
           null, // process callback: lo que devolveria el callback
           this // callback context
       );
    }
    pickPowerUp(_spaceship, _powerUp)
    {
        switch(_powerUp.type)
        {
            case 1: 
                var _delay = 200; 
                this.time.addevent ({
                    delay:_delay,
                    callback:this.createBullet,
                    callbackScope:this, 
                    repeat: 10000 /_delay
                });
            case 2: 
        }
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
            this.updateScore(100);
            // calculate % of drop
            var rnd = Phaser.Math.Between(1, 1); // 100%
            if(rnd == 1)
            {
                var typePowerUp = Phaser.Math.Between(1, 2); 
                this.createPowerUp(_enemy.x,_enemy.y, typePowerUp); 
            }
            _enemy.desactivate();
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
    createPowerUp(_posX, _posY, _powerUpType)
    {
        var tempPowerUp = this.powerUpPool.getFirst(false); // search for the first bullet not active

        if(!tempPowerUp)
        {   // There are no left bullets
            tempPowerUp = new powerUpPrefab(this, _posX, _posY, _powerUpType); 
            this.bulletPool.add(tempPowerUp); 
        }
        else
        {   // Existing a bullet active in the pool 
            tempPowerUp.setTexture('power_up_' + _powerUpType, 0)
            tempPowerUp.setActive(true); 
            tempPowerUp.body.reset(_posX, _posY); 
        }
        tempPowerUp.anims.play('standPowerUp_' + _powerUpType);
        tempPowerUp.type = _powerUpType;
        // Give velocity
        tempPowerUp.body.setVelocityY(gamePrefs.POWER_UP_SPEED); 
        // Sounds ...
    }
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
        this.sound_shoot.play();
    }
    createEnemyBullet(_posX, _posY, _sprTag = 'bullet')
    {
        var tempBullet = this.enemyBulletPool.getFirst(false);

        if(!tempBullet)
        {   
            tempBullet = new bulletPrefab(this, _posX, _posY, _sprTag); 
            this.enemyBulletPool.add(tempBullet); 
        }
        else
        {   
            tempBullet.setActive(true); 
            tempBullet.body.reset(_posX, _posY); 
        }
        tempBullet.body.setVelocityY(gamePrefs.ENEMY_BULLET_SPPED); 
        this.sound_enemyShoot.play();
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
        this.sound_explosion.play(); 
    }
    updateScore(_scoreSum)
    {
        this.ui_score.score += _scoreSum;
        
        if(this.ui_score.score / 100 < 1)
        {
            this.ui_score.scoreText.text = "00" + this.ui_score.score;
        }
        else if(this.ui_score.score / 1000 < 1)
        {
            this.ui_score.scoreText.text = "0" + this.ui_score.score;
        }
    }

    resetLevel()
    {
        localStorage.setItem('actualScore', this.ui_score.score);
        this.scene.start('gameOverState');
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