
import GameScene from '../GameScene/Scene'
export class GameObjectBase extends PIXI.Sprite{
    static texture : PIXI.Texture
    id : number

    isRemove: boolean
    scene: GameScene
    constructor(p: Point) {
        super();
        this.x = p.x
        this.y = p.y
        this.id = (p as any).id
        this.width = 1;
        this.height = 1;
        this.anchor.set(0.5,1)
        

        const constructor : typeof GameObjectBase = this.constructor as typeof GameObjectBase
        if(constructor.texture){
            this.texture = constructor.texture
        }

    }

    update(time: number): void {
        
    }

    onDiff(diff : any, newState? : any,oldState? : any){
        // console.log(diff)
        Object.assign(this,diff);
    }

    setGameScene(scene : GameScene){
        this.scene = scene
    }

    delete(){
        this.isRemove = true
    }
    
}
