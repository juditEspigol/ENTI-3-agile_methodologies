class bulletPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _posX, _posY, _sprTag = 'bullet')
    {
        super(_scene, _posX, _posY, _sprTag).setScale(1.5);
        _scene.add.existing(this);
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