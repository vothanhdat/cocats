import {GameObjectBase} from '../base'

import GameScene from '../../GameScene/Scene'

export class StaticOb extends GameObjectBase {
    setGameContext(context: GameScene) {
        super.setGameContext(context)
        this.context.getCeil(this.x,this.y).push(this)
    }
    delete(){
        super.delete()
        this.context.getCeil(this.x,this.y).remove(this)
    }
}
