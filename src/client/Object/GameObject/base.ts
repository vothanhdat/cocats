
import GameScene from '../GameScene/Scene'
export class GameObjectBase extends PIXI.Sprite implements GameStore.GameObjectBase {
    static texture : PIXI.Texture
    id : number

    lastUpdate : number
    lastState : GameStore.GameObjectBase

    isRemove: boolean
    scene: GameScene
    constructor(p: GameStore.GameObjectBase) {
        super();
        this.x = p.x
        this.y = p.y
        this.id = (p as any).id
        this.width = 1;
        this.height = 1;
        this.anchor.set(0.5,1)
        this.lastUpdate = Date.now()
        this.lastState = {...p}

        const constructor : typeof GameObjectBase = this.constructor as typeof GameObjectBase
        if(constructor.texture){
            this.texture = constructor.texture
        }

    }

    update(time: number): void {
        
    }

    onDiff(diff : GameStore.GameObjectBase, newState? : GameStore.GameObjectBase,oldState? : GameStore.GameObjectBase){
        // console.log(diff)
        Object.assign(this.lastState,diff)
        Object.assign(this,diff);
        this.lastUpdate = Date.now()
    }

    setGameScene(scene : GameScene){
        this.scene = scene
    }

    delete(){
        this.isRemove = true
    }
    
}
