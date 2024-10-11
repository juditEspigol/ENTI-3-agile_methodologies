class explosionPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _posX, _posY, _scale, _sprTag = 'explosion')
    {
        super(_scene, _posX, _posY, _sprTag).setScale(_scale).setOrigin(0.5); 
        _scene.add.existing(this);

        this.anims.play('explote'); 

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, 
            function () { this.desactivate(); }, 
            this
        );
    }

    desactivate()
    {
        console.log('desactivate explosion'); 
        this.setActive(false);
        this.setPosition(-700, -700);
    }
}