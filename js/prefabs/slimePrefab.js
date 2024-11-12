class slimePrefab extends enemyPrefab
{
    constructor(_scene, _posX, _posY, _spriteTag = 'slime')
    { 
        super(_scene, _posX, _posY, _spriteTag);
        this.slime = this; 
    }
}