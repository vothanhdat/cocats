import {Scene} from '../GameScene'
class EffectBase extends PIXI.Sprite {
    static texture : PIXI.Texture

    isRemove : boolean
    timelife : number;
    context : Scene
    
    constructor(p : Point){
        super()
        this.x = p.x
        this.y = p.y - 0.5
        this.width = 1.3;
        this.height = 1.3;
        this.timelife = 0
        this.anchor.set(0.5,0.5)
    }

    remove(){
        this.context.efContainer.removeChild(this)
        this.isRemove = true
    }

    update(time : number){
        this.timelife += time;
    }
}

export default EffectBase