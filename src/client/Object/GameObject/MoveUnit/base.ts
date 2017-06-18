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
        const lastState = this.lastState
        const deltaTime = (Date.now() - this.lastUpdate) * 0.001

        this.x = lastState.x + lastState.vx * deltaTime
        this.y = lastState.y + lastState.vy * deltaTime

        this.position.set(this.x,this.y)
        super.update(time)
    }
}