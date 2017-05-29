
import UIElement from './UIElement'
import Button from './Button'
import SmoothAnimation,{type as animtype} from 'utilities/SmoothAnimation'


class BubbleButton extends Button{

    _scaleX : number
    _scaleY : number
    
    constructor(texture : string, option : Option, childParam? : ChildElement<UIElement>,tagname? : string) {
        super(texture,option,childParam,tagname)
        this._scaleX = 1
        this._scaleY = 1

        SmoothAnimation(this,[
            {key : '_scaleX',v1 : 450,v2 : 0.85},
            {key : '_scaleY',v1 : 900,v2 : 0.85},
        ],animtype.SmoothInterpolate)
    }
    onPressDownEffect(){
        this._scaleX = 1.1
        this._scaleY = 1.1
    }
    onPressUpEffect(){
        this._scaleX = 1
        this._scaleY = 1
    }
    update(time : number){
        this.scale.set(this._scaleX,this._scaleY)
        super.update(time)
    }
}

export default BubbleButton