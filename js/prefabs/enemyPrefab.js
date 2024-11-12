class enemyPrefab extends Phaser.GameObjects.Sprite 
{
    constructor(_scene, _posX, _posY, _spriteTag)
    { 
        super(_scene, _posX, _posY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);

        
        // Attributes
        this.scene = _scene;
        this.enemy = this;
        this.direction = 1;
        this.anims.play("run_" + _spriteTag,true);
        this.enemy.body.setVelocityX(gamePrefs.ENEMY_JUMPER_SPEED*this.direction);
        
        this.setColliders();
    }

    setHealth(_value)
    {
        this.health = _value;
    }

    setColliders()
    {
        this.scene.physics.add.collider
        (
            this.enemy,
            this.scene.walls
        );

        this.scene.physics.add.collider
        (
            this.scene.hero,
            this.enemy,
            this.scene.hero.hitHero,
            null,
            this.scene.hero
        );
    }

    movement()
    {
        if(this.body.blocked.left || this.body.blocked.right || !this.body.blocked.down)
        {
            this.direction *= -1;
            this.enemy.flipX = !this.enemy.flipX;
            
            this.enemy.body.setVelocityX(gamePrefs.ENEMY_JUMPER_SPEED*this.direction);    
        }
    }

    preUpdate(time,delta)
    {
        this.movement(); 

        super.preUpdate(time,delta); 
    }
}