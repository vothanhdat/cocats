declare namespace GameStore {

	interface Root {
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
