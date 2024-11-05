class sceneLevel1 extends Phaser.Scene
{
    constructor()
    {
        super({key: 'sceneLevel1'}); 
    }

    preload()
    {
        this.cameras.main.setBackgroundColor("666");

        // Sprites
        this.load.setPath('assets/sprites');
        this.load.image('bg', 'bg_green_tile.png');
        this.load.spritesheet('entry', 'door_entry.png', {frameWidth: 32, frameHeight: 40 }); 
        this.load.spritesheet('hero', 'hero.png', {frameWidth: 32, frameHeight: 32 }); 

        // Tilesets
        this.load.setPath('assets/tilesets');
        this.load.image('tileset_walls', 'tileset_walls.png'); 
        this.load.image('tileset_moss', 'tileset_moss.png'); 

        // Maps
        this.load.setPath('assets/maps');
        this.load.tilemapTiledJSON('level1', 'level1.json');
    }

    create()
    {
        this.cursors = this.input.keyboard.createCursorKeys();

        this.loadAnimations(); 

        this.add.tileSprite(0, 0, gamePrefs.level1Width, gamePrefs.level1Height, 'bg').setOrigin(0);
        this.map = this.add.tilemap('level1'); // Load the json level
        this.map.addTilesetImage('tileset_walls'); // Load the tileset
        this.map.addTilesetImage('tileset_moss'); // Load the tileset
        this.walls = this.map.createLayer('layer_walls', 'tileset_walls'); // Draw the layer
        this.map.createLayer('layer_moss_up', 'tileset_moss'); // Draw the layer
        this.map.createLayer('layer_moss_right', 'tileset_moss'); // Draw the layer
        this.map.createLayer('layer_moss_left', 'tileset_moss'); // Draw the layer
        this.map.createLayer('layer_moss_down', 'tileset_moss'); // Draw the layer

        this.map.setCollisionByExclusion(-1, true, true, 'layer_walls'); 

        this.entry = this.add.sprite(65, 268, 'entry'); 
        this.entry.anims.play('open', true); 

        this.hero = this.physics.add.sprite(65, 100, 'hero');
        this.physics.add.collider(this.hero, this.walls); 
    }

    loadAnimations()
    {
        this.anims.create(
            {
                key: 'run', 
                frames: this.anims.generateFrameNumbers('hero', {start: 2, end: 5}),
                frameRate: 10, 
                repeat: -1
            }
        ); 
        this.anims.create(
            {
                key: 'open', 
                frames: this.anims.generateFrameNumbers('entry', {start: 1, end: 3}),
                frameRate: 10, 
                repeat: -1
            }
        ); 
    }

    update()
    {
       if(this.cursors.left.isDown)
       {
            this.hero.body.setVelocityX(-gamePrefs.HERO_SPEED); 
            this.hero.anims.play('run', true); 
            this.hero.setFlipX(true); 
       }
       else if(this.cursors.right.isDown)
        {
            this.hero.body.setVelocityX(gamePrefs.HERO_SPEED); 
            this.hero.anims.play('run', true); 
            this.hero.setFlipX(false); 
        }
        else
        {
            this.hero.setFrame(0); 
            this.hero.body.setVelocityX(0); 
        }
    }
}