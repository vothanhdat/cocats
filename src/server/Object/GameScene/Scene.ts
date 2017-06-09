import * as GameObject from '../GameObject'
import * as GameEffect from '../GameEffect'
import {assets} from 'assets'
// import * as GameEffect from '../GameEffect'
import MapReader from './MapReader'
import {injectModelArray,typeMeta} from 'utilities/Decorator'

/**
 *     optional uint32 playerid = 1;
    optional string type = 2;
    optional uint32 id = 3;
 */
class Scene {


    @typeMeta(Number)
    playerid : number


    @injectModelArray
    @typeMeta(Object,GameObject.GameObjectBase)
    listObject : GameObject.GameObjectBase[]

    // listEffect : GameEffect.base[]
    mapReader : MapReader
    mapData : MapData
    classes : typeof GameObject

    @typeMeta(Array,GameEffect.EffectBase)
    effectQueue : any[]
    // effecttype : typeof GameEffect
    constructor() {
        this.listObject = []
        // this.listEffect = []
        this.mapReader = new MapReader('./src/assets/screen/screen_1.txt',GameObject)
        this.mapReader.onLoadDone(e => this.onScreenLoadDone(e))
        this.classes = GameObject
        this.effectQueue = []
        // this.effecttype = GameEffect
    }
    onScreenLoadDone(mapdata : MapData){
        this.mapData = mapdata
        for(var gameob of mapdata.object)
            this.addGameObject(gameob)

        this.addGameObject(new GameObject.Zombie({x : 9,y : 9}))
        this.addGameObject(new GameObject.Zombie({x : 9,y : 4}))
        this.addGameObject(new GameObject.Zombie({x : 5,y : 9}))
        this.addGameObject(new GameObject.Zombie({x : 4,y : 7}))
    }

    onPlayerJoin() : GameObject.Player{
        var newPlayer = new GameObject.Player({x : 0,y : 0})
        this.addGameObject(newPlayer)
        return newPlayer
    }

    onPlayerQuit(id:number){
        var player = this.listObject.find(e => e.id == id)
        if(player)
            player.delete()
    }

    render(context : CanvasRenderingContext2D){
        this.listObject.forEach(e => e.render(context))
        // this.listEffect.forEach(e => e.render(context))
    }

    update(time : number){
        this.listObject.forEach(e => e.update(time))
        this.listObject = this.listObject.filter(e => !e.isRemove)

        


        // this.listEffect.forEach(e => e.update(time))
        // this.listEffect = this.listEffect.filter(e => !e.isRemove)
    }
    addGameObject(ob : GameObject.GameObjectBase){
        this.listObject.push(ob)
        ob.setGameContext(this)        
    }
    // addGameEffect(ob : GameEffect.base){
    //     this.listEffect.push(ob)
    //     ob.setGameContext(this)     
    // }
    getCeil( x : number,y : number): GameObject.GameObjectBase[] {
        var map = this.mapData.map
        return map[y] && map[y][x]
    }

    addEffect(e : any){
        this.effectQueue.push(e)
    }

    releaseEffect(): any {
        const effects = [...this.effectQueue]
        this.effectQueue = []
        return effects.length ? effects : 0
    }
}

export default Scene


