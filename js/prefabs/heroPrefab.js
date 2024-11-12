class heroPrefab extends Phaser.GameObjects.Sprite 
{
    constructor(_scene, _posX, _posY, _spriteTag='hero')
    { 
        super(_scene, _posX, _posY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);

        // Attributes
        this.scene = _scene; 
        this.hero = this; 
        this.health = gamePrefs.HERO_MAX_LIVES;
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        
        this.setColliders();  
    }

    setColliders()
    {
        this.scene.physics.add.collider(
            this.hero,
            this.scene.walls
        );
    }

    hitHero(_hero, _enemy)
    {
        if(_hero.body.touching.down && _enemy.body.touching.up)
        {
            if(--_enemy.health <= 0)
            {
                _enemy.destroy();
                //Incrementar puntos                
            }
            _hero.body.setVelocityY(gamePrefs.HERO_JUMP);
        }
        else
        {
            //Decrementar el shield del hero
            //_hero.health--;
            //Actualizar la UI del shield
            _hero.body.reset(65,100);
            this.scene.cameras.main.shake(500,0.05);
            //this.scene.cameras.main.flash(250,255,0,0);
        }
    }

    hitGem(_hero, _gem)
    {
        console.log(_gem.price); 
        _gem.destroy(); 
    }

    movement()
    {
        if(this.cursors.left.isDown)
        { //ME MUEVO A LA IZQUIERDA
            this.hero.body.setVelocityX(-gamePrefs.HERO_SPEED);
            this.hero.setFlipX(true);
            this.hero.anims.play('run',true);
        }
        else if(this.cursors.right.isDown)
        { //ME MUEVO A LA DERECHA
            this.hero.body.setVelocityX(gamePrefs.HERO_SPEED);
            this.hero.setFlipX(false);
            this.hero.anims.play('run',true);
        }
        else
        { //NO ME MUEVO AT ALL
            this.hero.body.setVelocityX(0);
            this.hero.anims.stop().setFrame(0);
        }
        
        if(/*this.cursors.space.isDown && this.hero.body.blocked.down && this.hero.body.onFloor()*/
            this.hero.body.onFloor() && Phaser.Input.Keyboard.DownDuration(this.cursors.space,250))
        {
            this.hero.body.setVelocityY(gamePrefs.HERO_JUMP);
        }

        if(!this.hero.body.onFloor())
        {
            this.hero.anims.stop().setFrame(6);
        }
    }

    preUpdate(_time, _delta)
    {
        this.movement();

        super.preUpdate(_time, _delta)
    }
}