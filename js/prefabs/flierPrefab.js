class flierPrefab extends enemyPrefab
{
    constructor(_scene, _posX, _posY, _spriteTag = 'flier')
    { 
        super(_scene, _posX, _posY, _spriteTag);
        this.body.setAllowGravity(false);
        this.flier = this; 

        this.health = 2;
    }

    conditionPatrol()
    {
        return this.body.blocked.left || this.body.blocked.right
    }
}