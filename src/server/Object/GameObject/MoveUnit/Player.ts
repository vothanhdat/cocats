import {MoveUnit as base}  from './base'
// import {loadImage} from '../../utilities'
// import {ArrowInput} from '../../GameInput'
// import {Key} from '../../helper'
import Bomb from '../StaticOb/Bomb'
class Player extends base {
    // input : ArrowInput
    constructor(point : Point){
        super(point)
        this.speed = 0.25/60
    }
    update(time : number){
        super.update(time)
    }
    fire(){
        var ceil = this.context.getCeil(this.gx,this.gy)
        if(ceil && !ceil.find(e => e instanceof Bomb)){
            this.context.addGameObject(new Bomb({x :this.gx,y : this.gy}))
        }
    }
    move(x : number,y : number){
        console.log('move')
        this.dx = x
        this.dy = y
    }
}

export default Player