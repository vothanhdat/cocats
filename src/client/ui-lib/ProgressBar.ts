import 'pixi.js'
import UIElement from './UIElement'
import TextElement from './TextElement'
import { assets } from '../../assets'
import SmoothAnimation from '../utilities/SmoothAnimation'
import 'pixi-extra-filters/bin/pixi-extra-filters.js'



const glowFilter = new (PIXI.filters as any).GlowFilter(2, 2, 0.5, 0xFFFFFF, 0.5)


class ProgressBar extends UIElement {
    progress: number
    childElement: { 
        child: UIElement
        number: TextElement
    }
    constructor(option: Option, tagname?: string) {
        super(assets.WHITE, option, {
            child: new UIElement(assets.WHITE, [0, 0.5, 1, 1, 0, 0.5]),
            number : new TextElement('50%',{fill :0xffffff,fontSize : 4},[0.5,'3vw','10vw','10vw',0.5,0.5])
        }, tagname)
        
        this.sprite.tint = 0x0055ff;
        this.progress = 0;
        SmoothAnimation(this, [{ key: 'progress', v1: 500, v2: 0.3 }])
        this.childElement.child.filters = [glowFilter]
    }

    getStringProgress(){
        return Math.round(this.progress * 100) + '%'
    }

    update(t: number) {
        super.update(t)
        this.childElement.child.scale.x = Math.min(1, this.progress)
        this.childElement.number.text = this.getStringProgress()
    }

}

export default ProgressBar