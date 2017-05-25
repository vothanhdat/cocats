import {GameObjectBase} from '../base'

import GameScreen from '../../GameScreen/Screen'

export class StaticOb extends GameObjectBase {
    setGameContext(context: GameScreen) {
        super.setGameContext(context)
        this.context.getCeil(this.x,this.y).push(this)
    }
    delete(){
        super.delete()
        this.context.getCeil(this.x,this.y).remove(this)
    }
}
