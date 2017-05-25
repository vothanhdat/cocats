import * as GameObject from '../GameObject'
import {assets} from 'assets'

class Scene {
    listObject : GameObject.GameObjectBase[]
    classes : typeof GameObject
    constructor() {

        this.classes = GameObject
    }

    render(context : CanvasRenderingContext2D){
        this.listObject.forEach(e => e.render(context))
    }

    update(time : number){

    }
    addGameObject(ob : GameObject.GameObjectBase){
        this.listObject.push(ob)
        ob.setGameContext(this)        
    }
}

export default Scene


