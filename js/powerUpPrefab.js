class powerUpPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _posX, _posY, _sprType)
    {
        super(_scene, _posX, _posY, 'power_up_' + _sprType).setScale(1.5);
        _scene.add.existing(this);

        this.type = _sprType; 
    }

    preUpdate(_time, _delta)
    {
        super.preUpdate(_time, _delta);

        if(this.y <= 0)
        {
            this.setActive(false); 
        }
    }
}