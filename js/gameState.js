class gameState extends Phaser.Scene
{
    constructor()
    {
        super({key: 'gameState'}); 
    }

    preload()
    {
        //// UPLOAD ASSETS TO MEMORY ////

        this.cameras.main.setBackgroundColor("AAA");

        this.load.image('bg_sky', 'assets/sprites/bg.jpg'); 
        this.load.image('bird', 'assets/sprites/bird.png'); 
        this.load.spritesheet('birdAnim', 'assets/sprites/birdAnim.png', 
            { frameWidth: 17, frameHeight: 12 }
        ); 

        this.load.image('bg_grass', 'assets/sprites/grass.png'); 
        this.load.spritesheet('link', 'assets/sprites/link.png', 
            { frameWidth: 120, frameHeight: 130 }
        ); 

    }

    create()
    {
        //// DRAW ASSETS ////

        /* IMAGES & SPRITES:
            - image: static images with no feedback
            - sprite: for events that need som efeedback
            -  tile sprite: element that must be repited (ex. the floor) With the tile sprite we can make the illusion that the sprite is moving
        */

        //// BIRD ////
            // this.bg_sky = this.add.tileSprite(0, 0, config.width, config.height,'bg_sky').setOrigin(0);
            
            // this.birdAnim = this.add.sprite(config.width/2, config.height/2,'birdAnim').setScale(3);
            // this.loadAnimationBird(); 
            // this.birdAnim.anims.play('fly'); 

        //// LINK ////
        this.bg_grass = this.add.tileSprite(0, 0, config.width, config.height,'bg_grass').setOrigin(0);
        this.link = this.add.sprite(config.width/2, config.height/2,'link').setScale(0.5);
        this.loadAnimationLink(); 

        // Listener to the inputs
        //this.key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); 
        this.cursors = this.input.keyboard.createCursorKeys(); 
    }

    loadAnimationBird()
    {
        // Make the transition for the spritesheets
        this.anims.create(
        {
            key: 'fly', 
            frames: this.anims.generateFrameNumbers('birdAnim', {start: 0, end: 2}), 
            frameRate: 10, 
            repeat: -1, 
            yoyo: true
        });
    }

    loadAnimationLink()
    {
        // Make the transition for the spritesheets
        this.anims.create(
            {
                key: 'walkDown', 
                frames: this.anims.generateFrameNumbers('link', {start: 0, end: 9}), 
                frameRate: 10, 
                repeat: -1
            });
        this.anims.create(
            {
                key: 'walkLeft', 
                frames: this.anims.generateFrameNumbers('link', {start: 10, end: 19}), 
                frameRate: 10, 
                repeat: -1
            });
        this.anims.create(
            {
                key: 'walkUp', 
                frames: this.anims.generateFrameNumbers('link', {start: 20, end: 29}), 
                frameRate: 10, 
                repeat: -1
            });
        this.anims.create(
            {
                key: 'walkRight', 
                frames: this.anims.generateFrameNumbers('link', {start: 30, end: 39}), 
                frameRate: 10, 
                repeat: -1
            });
    }

    update()
    {
        //// LINK INPUTS ////
        this.velocity = 3; 
        if(this.cursors.right.isDown) {
            this.link.x += this.velocity;
            this.link.anims.play('walkRight', true);
        }
        else if(this.cursors.left.isDown) {
            this.link.x -= this.velocity;
            this.link.anims.play('walkLeft', true);
        }
        else if(this.cursors.down.isDown) {
            this.link.y += this.velocity; 
            this.link.anims.play('walkDown', true);
        }
        else if(this.cursors.up.isDown) {
            this.link.y -= this.velocity; 
            this.link.anims.play('walkUp', true);
        }
        else {
            this.link.anims.stop(); 
            if(this.link.progress < 10)
            {
                this.link.setFrame(0);
            }
        }
    }
}