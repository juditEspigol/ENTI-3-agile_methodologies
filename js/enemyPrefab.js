class enemyPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _posX, _posY, _sprTag = 'enemy')
    {
        super(_scene, _posX, _posY, _sprTag).setScale(2).setOrigin(0.5); 
        _scene.add.existing(this);
        
        this.anims.play('idleEnemy'); 

        _scene.time.addEvent(
        {
            delay: Phaser.Math.Between(2 * 1000, 5 * 1000), 
            callback: this.shoot,
            callbackScope: this, 
            loop: true
        });
        
        // Variables
        this.health = 2;
    }

    preUpdate(_time, _delta)
    {
        super.preUpdate(_time, _delta);

        if(this.y > config.height)
        {
            this.setActive(false); 
        }
    }

    shoot()
    {
        this.scene.createEnemyBullet(this.x, this.y); 
    }

    desactivate()
    {
        this.health = 2.0; 
        this.setActive(false);
        this.setPosition(-500, -500);
    }
}