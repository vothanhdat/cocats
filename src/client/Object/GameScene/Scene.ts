import * as GameObject from '../GameObject'
import {assets} from 'assets'
import Game from '../../main'
import {HandleChangeArray} from 'utilities/HandleChange'
class Scene {

    classes : typeof GameObject
    context : Game
    
    arrayHandle : HandleChangeArray

    constructor(context : Game) {
        this.context = context
        this.classes = GameObject
        this.arrayHandle = new HandleChangeArray(this,{
            handleAdd : this.onAddObject,
            handleChange : this.onChangeObject,
            handleRemove : this.onRemoveObject
        })
    }

    onDiff(diff : any, newState : any,oldState : any){
        diff && diff.listObject && this.arrayHandle.onDiff(
            diff && diff.listObject,
            newState && newState.listObject,
            oldState && oldState.listObject
        )
    }

    resize(width : number,height : number){
        
    }

    getListObject(){
        return this.context.getStorePath('listObject') || []
    }
    
    onAddObject(e : any){
        console.log('onAddObject',e)
    }

    onRemoveObject(e : any){
        console.log('onRemoveObject',e)
    }
    onChangeObject(e : any){
        // console.log('onChangeObject',e)
    }

    render(context : CanvasRenderingContext2D){

    }
}

export default Scene


