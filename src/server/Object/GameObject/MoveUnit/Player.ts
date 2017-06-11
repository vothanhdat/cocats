import {MoveUnit as base}  from './base'
import { mergeType, splitType } from 'utilities/BufferCombine'
import Event from 'constant/Event'

// import {loadImage} from '../../utilities'
// import {ArrowInput} from '../../GameInput'
// import {Key} from '../../helper'
import Bomb from '../StaticOb/Bomb'
class Player extends base {
    // input : ArrowInput
    constructor(point : Point){
        super(point)
        this.speed = 0.25/60
        this.clientEvent = this.clientEvent.bind(this)
    }

    clientEvent(data: Buffer){
        const [event, buffer] = splitType(data)
        switch (event) {
            case Event.move:
                const data = new Int8Array(buffer)
                this.move(data[0], data[1]);
                break;
            case Event.fire:
                this.fire();
                break;
        }
    }

    private fire(){
        var ceil = this.context.getCeil(this.gx,this.gy)
        if(ceil && !ceil.find(e => e instanceof Bomb)){
            this.context.addGameObject(new Bomb({x :this.gx,y : this.gy}))
        }
    }
    private move(x : number,y : number){
        this.dx = x
        this.dy = y
    }
}

export default Player