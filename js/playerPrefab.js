class playerPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _posX = config.width * 0.5, _posY = config.height * 0.95, _sprTag = 'player')
    {
        super(_scene, _posX, _posY, _sprTag).setScale(2).setOrigin(0.5); 
        _scene.add.existing(this);
        _scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true);

        this.anims.play('idle'); 

        // Variable 
        this.health = 1; 
    }

    spawn()
    {
        this.health = 1; 
    }
}