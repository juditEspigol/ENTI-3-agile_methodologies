class jumperPrefab extends enemyPrefab
{
    constructor(_scene, _posX, _posY, _spriteTag = 'jumper')
    { 
        super(_scene, _posX, _posY, _spriteTag);
        this.jumper = this; 

        this.health = 2;
    }
}