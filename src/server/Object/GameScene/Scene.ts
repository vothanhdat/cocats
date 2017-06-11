import * as GameObject from '../GameObject'
import * as GameEffect from '../GameEffect'
import {assets} from 'assets'
// import * as GameEffect from '../GameEffect'
import MapReader from './MapReader'
import {injectModel,injectModelMap,typeMeta} from 'utilities/Decorator'

/**
 *     optional uint32 playerid = 1;
    optional string type = 2;
    optional uint32 id = 3;
 */
class Scene {


    @typeMeta(Number)
    playerid : number


    @injectModelMap
    @typeMeta(Object,GameObject.GameObjectBase)
    listObject : {[k : string] : GameObject.GameObjectBase}

    // listEffect : GameEffect.base[]
    mapReader : MapReader
    mapData : MapData
    classes : typeof GameObject

    @typeMeta(Array,GameEffect.EffectBase)
    listEffect : GameStore.EffectBase[]
    
    // effecttype : typeof GameEffect
    constructor() {
        this.listObject = {}
        this.mapReader = new MapReader('./src/assets/screen/screen_1.txt',GameObject)
        this.mapReader.onLoadDone(e => this.onScreenLoadDone(e))
        this.classes = GameObject
        this.listEffect = []
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
        var player = this.listObject[id] as GameObject.Player
        if(player)
            player.delete()
    }

    update(time : number){
        for(var i in this.listObject){
            this.listObject[i].update(time)
            if(this.listObject[i].isRemove){
                this.listObject[i] = null
                delete this.listObject[i]

            }
        }
    }
    addGameObject(ob : GameObject.GameObjectBase){
        this.listObject[ob.id] = ob
        ob.setGameContext(this)        
    }

    getCeil( x : number,y : number): GameObject.GameObjectBase[] {
        var map = this.mapData.map
        return map[y] && map[y][x]
    }

    addEffect(e : GameStore.EffectBase){
        this.listEffect.push(e)
    }

    releaseEffect(): GameStore.EffectBase[] {
        const effects = [...this.listEffect]
        this.listEffect = []
        return effects.length ? effects : []
    }
}

export default Scene


