class explosionPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _posX, _posY, _sprTag = 'explosion')
    {
        super(_scene, _posX, _posY, _sprTag).setScale(4).setOrigin(0.5); 
        _scene.add.existing(this);

        this.anims.play('explote'); 
    }
}