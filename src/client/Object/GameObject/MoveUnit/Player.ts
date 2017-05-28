import {MoveUnit as base}  from './base'
import {ArrowInput,Key} from 'client/GameInput'
import GameScene from '../../GameScene/Scene'
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
        console.log('onFire')
    }

    onChangeMoveState(dx : number,dy : number){
        console.log({dx,dy})
        if(this.scene){
            this.scene.emitEvent('move',`${dx}_${dy}`)
        }
    }
}

export default Player