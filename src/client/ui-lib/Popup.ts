import 'pixi.js'
import UIElement from './UIElement'
import {assets} from '../../assets'
import SmoothAnimation from '../utilities/SmoothAnimation'

class Popup extends UIElement{

    childElement : {
        overlay : UIElement,
        main : UIElement,
        close : UIElement,
    }

    _scaleX : number
    _scaleY : number

    overlayHold : boolean

    constructor(texture : string, option : Option, childParam? : {[key : string] : UIElement},tagname? : string) {
        super(null,option,{
            overlay : new UIElement(assets.BLACK,[0.5,0.5,'1000vw','1000vh',0.5,0.5]),
            main : new UIElement(texture,[0.5,0.5,1,1,0.5,0.5],childParam,tagname)
        })

        const {overlay,main} = this.childElement
        const overlayInteractive = this.overlayInteractive.bind(this)
        const mainInteractive = this.mainInteractive.bind(this)

        overlay.interactive = true
        main.interactive = true

        overlay.alpha = 0.5;
        overlay.on('touchstart',overlayInteractive)
        overlay.on('mousedown',overlayInteractive)
        overlay.on('mouseup',overlayInteractive)
        overlay.on('touchend',overlayInteractive)

        main.on('touchstart',mainInteractive)
        main.on('mousedown',mainInteractive)
        main.on('mouseup',mainInteractive)
        main.on('touchend',mainInteractive)

        this._scaleX = 0.5
        this._scaleY = 0.5
        this.alpha = 0


        SmoothAnimation(this,[
            {key : '_scaleX',v1 : 400,v2 : 0.8},
            {key : '_scaleY',v1 : 200,v2 : 0.8},
            {key : 'alpha',v1 : 800,v2 : 0.5},
        ])

        this._scaleX = 1
        this._scaleY = 1
        this.alpha = 1

    }

    overlayInteractive(e : PIXI.interaction.InteractionEvent){
        console.log(e)
        switch(e.type){
            case 'touchstart':
            case 'mousedown':
                this.overlayHold = true;
                break;
            case 'mouseup':
            case 'touchend':
                if(this.overlayHold)
                    this.remove()
                this.overlayHold = false;
                break;
        }
    }
    mainInteractive(e : PIXI.interaction.InteractionEvent){
        // e.stopPropagation();
        return true
    }
    update(time : number){
        this.childElement.main.scale.set(this._scaleX,this._scaleY)
        super.update(time)
    }
    remove(){
        this._scaleX = 0.5
        this._scaleY = 0.5
        this.alpha = 0
        setTimeout(super.remove.bind(this),200)
        this.remove = () => 0
    }
}

export default Popup