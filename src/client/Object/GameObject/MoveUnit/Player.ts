import {MoveUnit as base}  from './base'
import {ArrowInput,Key} from 'client/GameInput'
import GameScene from '../../GameScene/Scene'
import Event from 'constant/Event'

class Player extends base {
    static texture = PIXI.Texture.fromImage('/assets/boy.png');
    
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
            this.scene.emitEvent(Event.fire)
        }
    }

    onChangeMoveState(dx : number,dy : number){
        console.log({dx,dy})
        if(this.scene){
            this.scene.emitEvent(Event.move,dx,dy)
        }
    }
}

export default Player