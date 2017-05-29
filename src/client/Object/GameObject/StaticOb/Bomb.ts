import { StaticOb as base } from './base'
import { injectModel } from 'utilities/Decorator'
import { Zombie,Player } from '../MoveUnit'
import { Stone,Tree } from '../StaticOb'
import GameContext from '../../GameScene/Scene'
import SmoothAnimation,{type as animtype} from 'utilities/SmoothAnimation'

class Bomb extends base {
    static texture = PIXI.Texture.fromImage('/assets/bomb.png');
    _scaleX : number
    _scaleY : number
    
    constructor(p : Point){
        super(p);
        this._scaleX = 0.5;
        this._scaleY = 0.5;
        
        SmoothAnimation(this,[
            {key : '_scaleX',v1 : 450,v2 : 0.85},
            {key : '_scaleY',v1 : 900,v2 : 0.85},
        ],animtype.SmoothInterpolate)
        
        this._scaleX = 1;
        this._scaleY = 1;
    }
    
    update(time : number){
        this.width = this._scaleX
        this.height = this._scaleY
        super.update(time)
    }
}

export default Bomb