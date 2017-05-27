import * as GameObject from '../GameObject'
import {assets} from 'assets'
import Game from '../../main'
import {HandleChangeArray} from 'utilities/HandleChange'

class Scene extends PIXI.Container{
    classes : {[k : string] : typeof GameObject.GameObjectBase}
    context : Game
    listHandle : HandleChangeArray
    listChildIndex : {[k : string] : GameObject.GameObjectBase}

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

    onDiff(diff : any, newState : any,oldState : any){
        diff && diff.listObject && this.listHandle.onDiff(
            diff && diff.listObject,
            newState && newState.listObject,
            oldState && oldState.listObject
        );
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
        var newGameObject = new this.classes[type](e)
        this.listChildIndex[newGameObject.id] = newGameObject
        // console.log('onAddObject',newGameObject)
        this.addChild(newGameObject);
    }

    onRemoveObject(e : any){
        // console.log('onRemoveObject',e)
        var oldChild = this.listChildIndex[e.id]
        this.removeChild(oldChild);
        delete this.listChildIndex[e.id]
    }
    onChangeObject(e : any){
        this.listChildIndex[e.id].onDiff(e)
    }
}

export default Scene


