class level1 extends Phaser.Scene
{
    constructor()
    {
        super({key:'level1'});
    }

    preload()
    { //Carga assets en memoria
        this.cameras.main.setBackgroundColor("666");

        this.load.setPath('assets/sprites');
        this.load.image('bg','bg_green_tile.png');

        this.load.spritesheet('hero','hero.png',
            {frameWidth:32,frameHeight:32});
        this.load.spritesheet('entry','entry.png',
            {frameWidth:32,frameHeight:40});
        this.load.spritesheet('jumper','jumper.png',
            {frameWidth:32,frameHeight:32});
        this.load.spritesheet('slime', 'slime.png', 
            {frameWidth:32,frameHeight:32}); 
        this.load.spritesheet('flier', 'flier.png', 
            {frameWidth:32,frameHeight:32}); 
        this.load.spritesheet('gem', 'gem.png', 
            {frameWidth:32,frameHeight:32}); 

        this.load.setPath('assets/tilesets');
        this.load.image('tileset_walls','tileset_walls.png');
        this.load.image('tileset_moss','tileset_moss.png');

        this.load.setPath('assets/maps');
        this.load.tilemapTiledJSON('level1','level1.json');
    }

    create()
    { //Pinta assets en pantalla
        //Pintamos el fondo
        this.add.tileSprite(0,0,gamePrefs.level1Width,gamePrefs.level1Height,'bg')
        .setOrigin(0);

        //Pintamos el nivel
        //Cargo el JSON
        this.map = this.add.tilemap('level1');
        //Cargo los tilesets
        this.map.addTilesetImage('tileset_walls');
        this.map.addTilesetImage('tileset_moss');
        //Pinto las CAPAS/LAYERS
        this.walls = this.map.createLayer('layer_walls','tileset_walls');
        this.map.createLayer('layer_moss_up','tileset_moss');
        this.map.createLayer('layer_moss_left','tileset_moss');
        this.map.createLayer('layer_moss_right','tileset_moss');
        this.map.createLayer('layer_moss_down','tileset_moss');

        //Defino con qué se colisiona en la layer_walls
        //this.map.setCollisionBetween(1,11,true,true,'layer_walls');
        //Ponemos -1, ya que phaser lo interpreta como un 0 en el json
        this.map.setCollisionByExclusion(-1, true, true, 'layer_walls'); 

        this.loadAnimations();

        //this.entry = this.physics.add.sprite(65,268,'entry');
        this.entry = this.add.sprite(65,268,'entry');
        //this.entry.body.allowGravity = false; 
        //this.entry.body.immovable = true;
        this.entry.anims.play('entry_idle',true);

        this.hero = new heroPrefab(this, 65, 100, 'hero');
        //this.jumper = new jumperPrefab(this, 240, 304);
        //this.slime = new slimePrefab(this, 656, 272);
        this.addEnemies(); 

        this.cameras.main.startFollow(this.hero).setBounds(0, 0, gamePrefs.level1Width, gamePrefs.level1Height);
    }

    addEnemies()
    {
        this.gameObjects = this.map.getObjectLayer('layer_objects'); 
        this.gameObjects.objects.forEach(
            function(element) 
            {
                var object; 
                switch(element.type)
                {
                    case 'jumper': 
                        object = new jumperPrefab(this, element.x, element.y);
                        object.setHealth(element.properties[0].value); 
                        break; 
                    case 'slime':
                        object = new slimePrefab(this, element.x, element.y); 
                        object.setHealth(element.properties[0].value); 
                        break; 
                    case 'flier':
                        object = new flierPrefab(this, element.x, element.y); 
                        object.setHealth(element.properties[0].value); 
                        break; 
                    case 'gem':
                        object = new gemPrefab(this, element.x, element.y); 
                        object.setPrice(element.properties[0].value); 
                        break; 
                }    
        }, this);
    }

    loadAnimations()
    {
        this.anims.create(
        {
            key: 'run',
            frames:this.anims.generateFrameNumbers('hero', 
            {start:2, end: 5}),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create(
        {
            key: 'entry_idle',
            frames:this.anims.generateFrameNumbers('entry', 
            {start:1, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create(
        {
            key: 'run_jumper',
            frames:this.anims.generateFrameNumbers('jumper', 
            {start:0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create(
            {
                key: 'run_slime',
                frames:this.anims.generateFrameNumbers('slime', 
                {start:0, end: 3}),
                frameRate: 10,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'run_flier',
                frames:this.anims.generateFrameNumbers('flier', 
                {start:0, end: 2}),
                frameRate: 10,
                repeat: -1
            });

        this.anims.create(
            {
                key: 'gem_idle',
                frames:this.anims.generateFrameNumbers('gem', 
                {start:0, end: 4}),
                frameRate: 10,
                repeat: -1
            });
    }
}    