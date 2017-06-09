import {injectModel,typeMeta} from 'utilities/Decorator'
import {Scene} from '../GameScene'

class EffectBase  {
    @injectModel
    @typeMeta(String)
    type : string

    @injectModel
    @typeMeta(Number)
    x : number


    @injectModel
    @typeMeta(Number)
    y : number | string
    
    constructor(p : {x : number,y : number,type : string}){
        this.x = p.x
        this.y = p.y
        this.type = p.type
    }
}

export default EffectBase