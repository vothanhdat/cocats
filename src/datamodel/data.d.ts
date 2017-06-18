declare namespace GameStore {

	interface Root {
		row? : number ;
		col? : number ;
		playerid? : number ;
		listObject? : {[k : string] : GameObjectBase} 
		listEffect? : EffectBase[] ;
	}
	
	
	interface GameObjectBase {
		type? : string ;
		id? : number ;
		x? : number ;
		y? : number ;
		vx? : number ;
		vy? : number ;
	}
	
	
	interface EffectBase {
		type? : string ;
		x? : number ;
		y? : number ;
	}
	
	
}
declare namespace GameStore {
    enum Type {
        Scene = 1,
        GameObjectBase = 2,
        StaticOb = 3,
        Tree = 4,
        Stone = 5,
        Bomb = 6,
        MoveUnit = 7,
        Player = 8,
        Zombie = 9,
        EffectBase = 10,
        Exploition = 11,
        default = 12,
    }
}

