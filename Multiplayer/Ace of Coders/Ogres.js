// Global Variables
var enemy = [];
var friend = [];
var gold = [];

var enemyArcher = [];
var enemySoldier = [];
var enemyArtillery = [];
var enemyTower = [];
var enemyMissile = [];
var enemyGold = [];
var enemyHero = [];

var friendArcher = [];
var friendSoldier = [];
var friendArtillery = [];
var friendTower = [];
var friendMissile = [];
var friendGold = [];
var friendHero = [];

var neutralGold = [];
var yaks = [];

clearAll = function(){
    enemy = [];
    friend = [];
    gold = [];
    
    enemyArcher = [];
    enemySoldier = [];
    enemyArtillery = [];
    enemyTower = [];
    enemyMissile = [];
    enemyGold = [];
    enemyHero = [];
    
    friendArcher = [];
    friendSoldier = [];
    friendArtillery = [];
    friendTower = [];
    friendMissile = [];
    friendGold = [];
    friendHero = [];
    
    neutralGold = [];
    yaks = [];
};

var getKeys = function(obj){
   var keys = [];
   for(var key in obj){
      keys.push(key);
   }
   return keys;
};

this.createUnits = function(){
    while(this.gold > this.costOf("archer")){
        this.summon("archer");
    }
};

this.initialize = function(){
    this.debug("Time : "+this.now());
    clearAll();
    enemy = this.findEnemies();
    friend = this.findFriends();
    gold = this.getControlPoints();
    for (i=0; i<enemy.length; i++) {
        var e = enemy[i];
        //this.debug("Type of enemy "+i+" is : "+e.type)
        if (e.type == "soldier")
            enemySoldier.push(e);
        else if (e.type == "archer")
            enemyArcher.push(e);
        else if (e.type == "artillery")
            enemyArtillery.push(e);
        else if (e.type == "arrow-tower")
            enemyTower.push(e);
        else if (e.type == "ice-yaks")
            yaks.push(e);
        else if (e.type == "goliath" || e.type=="knight")
            enemyHero.push(e);
    }
        
    for (i=0; i<friend.length; i++){
        var f = friend[i];
        //this.debug("Type of friend "+i+" is : "+f.type)
        if (f.type == "soldier")
            friendSoldier.push(f);
        else if (f.type == "archer")
            friendArcher.push(f);
        else if (f.type == "artillery")
            friendArtillery.push(f);
        else if (f.type == "arrow-tower")
            friendTower.push(f);
        else if (f.type == "goliath")
            friendHero.push(f);
    }		
};

this.commandSoldier = function(unit){
    if(enemyHero.length > 0)
        this.command(unit, "attack", enemyHero[0]);
};


this.commandArcher = function(unit){
    if(friendArcher[0].id==unit.id){
        this.command(unit, "defend", gold[1].pos);
    }
    else if(friendArcher[1].id==unit.id){
        this.command(unit, "defend", gold[2].pos);
    }
    else if (enemyArcher.length>0){
        this.command(unit, "attack", unit.findNearest(enemyArcher));
    }
    else if (enemySoldier.length>0){
        this.command(unit, "attack", unit.findNearest(enemySoldier));
    }
    else if(enemyHero.length > 0){
        this.command(unit, "attack", enemyHero[0]);
    }
};


this.commandArtillery = function(unit){
    if (enemyArtillery.length>0)
        this.command(unit, "attack", this.findNearest(enemyArtillery));
    else if (enemyTower.length>0)
        this.command(unit, "attack", this.findNearest(enemyTower));
};


this.commandTower = function(unit){
    this.command(unit, "attack", this.findNearest(enemy));
};

this.commandArmy = function(){
    
    for (var i=0; i<friend.length; i++){
        var f = friend[i];
        if (f.type == "soldier")
            this.commandSoldier(f);
        else if (f.type == "archer")
            this.commandArcher(f);
        else if (f.type == "artillery")
            this.commandArtillery(f);
        else if (f.type == "arrow-tower")
            this.commandTower(f);	
    }
};

this.showHeroism = function(){
    if(enemyHero.length > 0){
        if(this.isReady("stomp") && this.distanceTo(enemyHero[0])<15){
            this.stomp();
        }
        if(this.isReady("throw")){
            if(enemyArtillery.lenght>0){
                this.throw(enemyArtillery[0]);
            }
            else if(enemyArcher.length>0 && this.distanceTo(this.findNearest(enemyArcher))<=25){
                this.throw(this.findNearest(enemyArcher));
            }
            else if(this.distanceTo(enemyHero[0])<=30){
                this.throw(enemyHero[0]);
            }
        }
        this.attack(enemyHero[0]);
    }
    else{
        this.say("Take that B!t¢#");
    }
};


while (true){
    
    this.createUnits();
    this.initialize();
    this.commandArmy();
    this.showHeroism();
}




