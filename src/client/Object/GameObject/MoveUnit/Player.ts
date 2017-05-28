import {MoveUnit as base}  from './base'
import {ArrowInput,Key} from 'client/GameInput'
class Player extends base {
    static texture = PIXI.Texture.fromImage('/assets/boy.png');
    
    input : ArrowInput

    constructor(point : Point){
        super(point)
        this.input = new ArrowInput()

        this.input.onKey(Key.SPACE,this.onFire.bind(this))
    }

    onFire(){
        console.log('onFire')
    }
}

export default Player