import {MoveUnit as base}  from './base'
import {ArrowInput,Key} from 'client/GameInput'
import GameScene from '../../GameScene/Scene'
import Event from 'constant/Event'
import {mergeType} from 'utilities//BufferCombine'

class Player extends base {
    static texture = PIXI.Texture.fromImage('/assets/boy.png');
    _smoothspeed = Math.SQRT1_2;


    input : ArrowInput

    setGameScene(scene : GameScene){
        super.setGameScene(scene)
        if(scene && scene.playerid == this.id){
            this.registerInput()
        }
    }

    registerInput(){
        console.log('register Input Done')
        this.input = new ArrowInput()
        this.input.onKey(Key.SPACE,this.onFire.bind(this))
        this.input.onChangeMoveState = this.onChangeMoveState.bind(this)
    }

    unRegisterInput(){
        this.input && this.input.dispose();
        this.input = null;
    }

    onFire(){
        if(this.scene){

            this.scene.send(mergeType(Event.fire, new Uint8Array([])))
        }
    }

    onChangeMoveState(dx : number,dy : number){
        console.log({dx,dy})
        if(this.scene){
            this.scene.send(mergeType(Event.move, new Uint8Array(new Int8Array([dx,dy]))))
            // this.scene.emitEvent(Event.move,dx,dy)
        }
    }

    // onDiff(diff : GameStore.GameObjectBase, newState? : GameStore.GameObjectBase,oldState? : GameStore.GameObjectBase){
    //     // console.log(diff)
    //     var lastState = this.lastState
    //     const deltaTime = Date.now() - this.lastUpdate

    //     var x = lastState.x + lastState.vx * deltaTime
    //     var y = lastState.y + lastState.vy * deltaTime

    //     super.onDiff(diff,newState,oldState)

    //     // diff && console.log(diff)    
        
    //     if(diff.x)
    //         console.log(diff.x - x);

    // }
}

export default Player