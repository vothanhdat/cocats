
import GameScene from '../GameScene/Scene'
import {injectModel,typeMeta} from 'utilities/Decorator'

let id = 1000;



Array.prototype.remove = function<T>(item : T){
    var itemIndex = this.findIndex((e : T) => e == item)
    if(itemIndex > -1 && itemIndex < this.length - 1){
        var item = this.pop() as T
        this[itemIndex] = item
    }else if (itemIndex == this.length - 1){
        this.pop()
    }
}


export class GameObjectBase implements GameStore.GameObjectBase {

    @injectModel
    @typeMeta(String)
    readonly type : string

    @injectModel
    @typeMeta(Number)
    readonly id : number

    @injectModel
    @typeMeta(Number)
    x: number

    @injectModel
    @typeMeta(Number)
    y: number

    lifetime: number

    isRemove: boolean
    context: GameScene
    constructor(p: Point) {
        this.x = p.x
        this.y = p.y
        this.lifetime = 0
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
