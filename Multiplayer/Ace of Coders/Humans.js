// Global Variables
enemy = []
friend = []
gold = []

enemyArcher = []
enemySoldier = []
enemyArtillery = []
enemyTower = []
enemyMissile = []
enemyGold = []
enemyHero = []

friendArcher = []
friendSoldier = []
friendArtillery = []
friendTower = []
friendMissile = []
friendGold = []
friendHero = []

neutralGold = []
yaks = []


createUnits = function(){
        this.summon("archer")
}
    
  
commandArmy = function(){
    for i, f in enumerate(friend)
        if (f.type == "soldier")
            commandSoldier(f)
        else if (f.type == "archer")
            commandArcher(f)
        else if (f.type == "artillery")
            commandArtillery(f)
        else if (f.type == "arrow-tower")
            commandTower(f)		
}
    
    
commandSoldier = function(unit){
    this.command(unit, "attack", enemyHero[0])
}
    
    
commandArcher = function(unit){
    if (len(enemyArcher)>0)
        this.command(unit, "attack", this.findNearest(enemyArcher))
    else if (len(enemySoldier)>0)
        this.command(unit, "attack", this.findNearest(enemySoldier))
    else
        this.command(unit, "attack", enemyHero[0])
}
        
        
commandArtillery = function(unit){
    if (len(enemyArtillery)>0)
        this.command(unit, "attack", this.findNearest(enemyArtillery))
    else if (len(enemyTower)>0)
        this.command(unit, "attack", this.findNearest(enemyTower))
}
        
        
commandTower = function(unit){
    this.command(unit, "attack", this.findNearest(eenemy))
}
    
initialize = function(){
    this.debug("Time : "+this.now())
    global enemy
    enemy = this.findEnemies()
    global friend = this.findFriends()
    global gold = this.getControlPoints()
    
    for i, e in enumerate(enemy) :
        //this.debug("Type of enemy "+i+" is : "+e.type)
        if (e.type == "soldier")
            enemySoldier.append(e)
        else if (e.type == "archer")
            enemyArcher.append(e)
        else if (e.type == "artillery")
            enemyArtillery.append(e)
        else if (e.type == "arrow-tower")
            enemyTower.append(e)
        else if (e.type == "goliath")
            enemyHero.append(e)
        
    for i, f in enumerate(friend) :
        #this.debug("Type of friend "+i+" is : "+f.type)
        if (f.type == "soldier")
            friendSoldier.append(f)
        else if (f.type == "archer")
            friendArcher.append(f)
        else if (f.type == "artillery")
            friendArtillery.append(f)
        else if (f.type == "arrow-tower")
            friendTower.append(f)
        else if (f.type == "goliath")
            friendHero.append(f)
			
}      

while (True){
    createUnits()
    initialize()
    this.say(len(friend))
    commandArmy()
