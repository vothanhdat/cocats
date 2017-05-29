import { MoveUnit as base } from './base'
import SmoothAnimation,{type as animtype} from 'utilities/SmoothAnimation'

class Zombie extends base {
    static texture = PIXI.Texture.fromImage('/assets/monster.png');
    
    constructor(p : Point){
        super(p);
    }
    
    update(time : number){
        super.update(time)
    }
}

export default Zombie