import * as GameObject from '../GameObject'
import * as GameEffect from '../GameEffect'
import {assets} from 'assets'
import Game from '../../main'
import {HandleChangeMap} from 'utilities/HandleChange'

class Scene extends PIXI.Container{
    classes : (typeof GameObject) & {[k : string] : typeof GameObject.GameObjectBase}
    effects : (typeof GameEffect) & {[k : string] : typeof GameEffect.EffectBase}
    context : Game
    listHandle : HandleChangeMap
    listChildIndex : {[k : string] : GameObject.GameObjectBase}
    listEffect : GameEffect.EffectBase[]
    player : GameObject.Player  
    state : GameStore.Root
    

    obContainer : PIXI.Container  
    efContainer : PIXI.Container  

    constructor(context : Game) {
        super();
        this.context = context
        this.classes = GameObject as any
        this.effects = GameEffect as any
        this.listChildIndex = {}
        this.listEffect = []
        this.listHandle = new HandleChangeMap(this,{
            handleAdd : this.onAddObject,
            handleChange : this.onChangeObject,
            handleRemove : this.onRemoveObject
        })

        this.obContainer = new PIXI.Container()
        this.efContainer = new PIXI.Container()
        this.addChild(this.obContainer)
        this.addChild(this.efContainer)
    }

    _playerid : number  
    get playerid(){
        return this._playerid
    }

    set playerid(v : number){
        if(v){
            this.player = Object.values(this.listChildIndex).find(e => e.id == v) as GameObject.Player
            if(this.player && !(this.player instanceof GameObject.Player)){
                console.error(this.player)
            }
        }
        this._playerid = v;
    }

    onDiff(diff : GameStore.Root, newState : GameStore.Root,oldState : GameStore.Root){

        this.state = newState;

        
        diff && diff.playerid && this.onPlayerIdChange(
            diff.playerid,
            newState && newState.playerid,
            oldState && oldState.playerid
        )

        diff && diff.listObject && this.listHandle.onDiff(
            diff && diff.listObject,
            newState && newState.listObject,
            oldState && oldState.listObject
        );
    }

    onPlayerIdChange(id : number,newid : number,oldid : number){
        this.playerid = id;
    }

    update(time? : number){
        for(var i in this.listChildIndex){
            if(this.listChildIndex[i])
                this.listChildIndex[i].update(time)
        }
        this.listEffect.forEach(e => e.update(time))
        this.listEffect = this.listEffect.filter(e => !e.isRemove)
    }

    resize(width : number,height : number){
        var min = Math.min(width,height)
        this.position.set(width/2 - min/2 + min * 0.05,height/2 - min/2 + min * 0.1)
        this.scale.set(min / 10);
    }

    getListObject(){
        return this.context.getStorePath('listObject') || []
    }
    
    onAddObject(e : GameStore.GameObjectBase){
        var type = e.type
        var newGameObject = new this.classes[type](e)
        this.listChildIndex[newGameObject.id] = newGameObject
        this.obContainer.addChild(newGameObject);
        newGameObject.setGameScene(this)

        if(!this.player && this.playerid && newGameObject.id == this.playerid){
            this.player = newGameObject as GameObject.Player;
            if(this.player && !(this.player instanceof GameObject.Player))
                console.error('Wrong Play Type')
        }
    }

    onRemoveObject(e : GameStore.GameObjectBase){
        // console.log('onRemoveObject',e)
        var oldChild = this.listChildIndex[e.id]
        this.obContainer.removeChild(oldChild);
        delete this.listChildIndex[e.id]
        if(this.playerid && e.id == this.playerid)
            this.player = null;
    }

    onAddEffect(e : GameStore.EffectBase){
        var type = e.type
        var newEffect = new this.effects[type](e)
        newEffect.context = this
        this.listEffect.push(newEffect)
        this.efContainer.addChild(newEffect);
    }

    onChangeObject(e : GameStore.GameObjectBase){
        this.listChildIndex[e.id].onDiff(e)
    }

    send(data : ArrayBuffer){
        this.context.socket.send(data);
    }
}

export default Scene


