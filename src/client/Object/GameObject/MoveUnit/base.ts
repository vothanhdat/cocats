import { GameObjectBase } from '../base'
import SmoothAnimation from 'utilities/SmoothAnimation'
import {makeSmooth} from 'utilities//Decorator'

export class MoveUnit extends GameObjectBase {
    speed: number

    @makeSmooth
    x : number

    @makeSmooth
    y : number

    constructor(p : Point){
        super(p)
    }
    update(time? :number){
        this.position.set(this.x,this.y)
        super.update(time)
    }
}