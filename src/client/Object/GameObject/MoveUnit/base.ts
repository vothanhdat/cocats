import { GameObjectBase } from '../base'
import SmoothAnimation from 'utilities/SmoothAnimation'

export class MoveUnit extends GameObjectBase {
    speed: number
    // _xvalue : number
    // _yvalue : number
    // get x(){
    //     return this._xvalue
    // }   
    // set x(v : number){
    //     this._xvalue = v
    // }
    // get y(){
    //     return this._yvalue
    // }   
    // set y(v : number){
    //     this._yvalue = v
    // }
    constructor(p : Point){
        super(p)
        SmoothAnimation(this,['x','y'])
    }
    update(time? :number){
        this.position.set(this.x,this.y)
        super.update(time)
    }
}