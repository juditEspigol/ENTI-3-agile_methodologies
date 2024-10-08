class enemyPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _posX, _posY, _sprTag = 'enemy')
    {
        super(_scene, _posX, _posY, _sprTag).setScale(2).setOrigin(0, 1); 
        _scene.add.existing(this);

        this.health = 2;

        this.anims.play('idleEnemy'); 
    }

    preUpdate(_time, _delta)
    {
        super.preUpdate(_time, _delta);

        if(this.y > config.height)
        {
            this.setActive(false); 
        }
    }
    
}