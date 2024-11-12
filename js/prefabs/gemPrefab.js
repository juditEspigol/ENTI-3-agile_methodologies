class gemPrefab extends Phaser.GameObjects.Sprite 
{
    constructor(_scene, _posX, _posY, _spriteTag = 'gem')
    {
        super(_scene, _posX, _posY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.allowGravity = false; 

        this.gem = this; 
        this.anims.play("gem_idle", true);

        this.setColliders()
    }

    setPrice(_value)
    {
        this.price = _value; 
    }

    setColliders()
    {
        this.scene.physics.add.overlap
        (
            this.scene.hero,
            this.gem,
            this.scene.hero.hitGem,
            null,
            this.scene.hero
        );
    }
}