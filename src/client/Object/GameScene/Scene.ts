import * as GameObject from '../GameObject'
import {assets} from 'assets'
import Game from '../../main'
import {HandleChangeArray} from 'utilities/HandleChange'

class Scene extends PIXI.Container{
    classes : {[k : string] : typeof GameObject.GameObjectBase}
    context : Game
    listHandle : HandleChangeArray
    listChildIndex : {[k : string] : GameObject.GameObjectBase}
    player : GameObject.Player  
    state : any
    
    _playerid : number  

    container : PIXI.Container  

    constructor(context : Game) {
        super();
        this.context = context
        this.classes = GameObject as any
        this.listChildIndex = {}
        this.listHandle = new HandleChangeArray(this,{
            handleAdd : this.onAddObject,
            handleChange : this.onChangeObject,
            handleRemove : this.onRemoveObject
        })
    }

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

    onDiff(diff : any, newState : any,oldState : any){

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

    onPlayerIdChange(id : any,newid : any,oldid : any){
        console.log({id})
        this.playerid = id;
    }

    update(time? : number){
        for(var i in this.listChildIndex){
            if(this.listChildIndex[i])
                this.listChildIndex[i].update(time)
        }
    }

    resize(width : number,height : number){
        var min = Math.min(width,height)
        this.position.set(width/2 - min/2,height/2 - min/2)
        this.scale.set(min / 10);
    }

    getListObject(){
        return this.context.getStorePath('listObject') || []
    }
    
    onAddObject(e : any){
        var type = e.type
        // if(!type)
        //     debugger;
        var newGameObject = new this.classes[type](e)
        this.listChildIndex[newGameObject.id] = newGameObject
        this.addChild(newGameObject);
        newGameObject.setGameScene(this)

        if(!this.player && this.playerid && newGameObject.id == this.playerid){
            this.player = newGameObject as GameObject.Player;
            if(this.player && !(this.player instanceof GameObject.Player))
                console.error('Wrong Play Type')
        }
    }

    onRemoveObject(e : any){
        // console.log('onRemoveObject',e)
        var oldChild = this.listChildIndex[e.id]
        this.removeChild(oldChild);
        delete this.listChildIndex[e.id]
        if(this.playerid && e.id == this.playerid)
            this.player = null;
    }

    onChangeObject(e : any){
        this.listChildIndex[e.id].onDiff(e)
    }

    emitEvent(event : string, ...args : any[]){
        if(this.context && this.context.socket){
            this.context.socket.emit(event,...args);
        }else{
            console.error('Empty context or socket')
        }
    }
    
    onEvent(event : string, callback: any){
        if(this.context && this.context.socket){
            this.context.socket.on(event,callback);
        }else{
            console.error('Empty context or socket')
        }
    }

    offEvent(event : string, callback: any){
        if(this.context && this.context.socket){
            this.context.socket.off(event,callback);
        }else{
            console.error('Empty context or socket')
        }
    }

    onceEvent(event : string, callback: any){
        if(this.context && this.context.socket){
            this.context.socket.once(event,callback);
        }else{
            console.error('Empty context or socket')
        }
    }
}

export default Scene


