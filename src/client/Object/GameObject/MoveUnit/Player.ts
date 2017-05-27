import {MoveUnit as base}  from './base'
// import {loadImage} from '../../utilities'
// import {ArrowInput} from '../../GameInput'
// import {Key} from '../../helper'
class Player extends base {
    static texture = PIXI.Texture.fromImage('/assets/boy.png');

    // input : ArrowInput
    // constructor(point : Point){
    //     super(point)
    //     this.texture = loadImage('assets/boy.png')
    //     this.input = new ArrowInput()
    //     this.speed = 0.003

    //     this.input.onKey(Key.SPACE,this.onFire.bind(this))
    // }

}

export default Player