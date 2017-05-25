
import GameScene from '../GameScene/Scene'
import {injectModel} from 'utilities/Decorator'

let id = 1000;



Array.prototype.remove = function(item : any){
    var itemIndex = this.findIndex((e : any) => e == item)
    if(itemIndex > -1 && itemIndex < this.length - 1){
        var item = this.pop()
        this[itemIndex] = item
    }else if (itemIndex == this.length - 1){
        this.pop()
    }
}


export class GameObjectBase {
    static basePixelSize = 60

    @injectModel
    x: number

    @injectModel
    y: number

    lifetime: number

    isRemove: boolean
    texture: HTMLImageElement
    context: GameScene
    constructor(p: Point) {
        this.x = p.x
        this.y = p.y
        this.lifetime = 0
    }
    render(context: CanvasRenderingContext2D): void {
        const basePixelSize = GameObjectBase.basePixelSize
        context.drawImage(this.texture, this.x * basePixelSize, this.y * basePixelSize, basePixelSize, basePixelSize)
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
