
import GameScene from '../GameScene/Scene'

export class GameObjectBase {
    static basePixelSize = 60
    x : number
    y : number
    lifetime: number
    isRemove: boolean
    context: GameScene
    constructor(p: Point) {

    }
    render(context: CanvasRenderingContext2D): void {
        // const basePixelSize = GameObjectBase.basePixelSize
        // context.drawImage(this.texture, this.x * basePixelSize, this.y * basePixelSize, basePixelSize, basePixelSize)
    }
    update(time: number): void {
        this.lifetime += time
    }
    setGameContext(context : GameScene){
        this.context = context
    }
    delete(){
        this.isRemove = true
    }
}
