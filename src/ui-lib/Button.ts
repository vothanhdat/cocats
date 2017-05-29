import 'pixi.js'
import 'howler'
import UIElement from './UIElement'
import ScrollView from './ScrollView'
// import ButtonFx from '../assets/sound/sfx_Button.mp3'

// const ButtonAudio = new Howl({
//   src: [],
// });


class Button extends UIElement{
    isHold : boolean
    buttonAudio : any
    
    
    private _active : boolean

    constructor(texture : string | PIXI.Texture, option : Option, childParam? : ChildElement<UIElement>,tagname? : string) {
        super(texture,option,childParam,tagname)

        this.on('touchstart',this.onPressDown)
        this.on('mousedown',this.onPressDown)

        this.on('touchend',this.onPressUp)
        this.on('mouseup',this.onPressUp)

        this.on('mouseout',this.onOut)
        this.on('touchendoutside',this.onOut)

        this.isHold = false

        this.active = true

        this.buttonAudio = undefined

    }
    

    onOut(){
        this.isHold = false
        this.onPressUp()
    }
    onClick(e? : PIXI.interaction.InteractionEvent){
        
    }


    onPressDown(e? : PIXI.interaction.InteractionEvent){
        if(this.isHold)
            return
        this.isHold = true;
        this.onPressDownEffect()
        // e && e.stopPropagation && e.stopPropagation()
    }

    onPressCancel(e? : PIXI.interaction.InteractionEvent){
        this.isHold && this.onPressUpEffect()
        this.isHold = false;
    }

    onPressDownEffect(){
        this.position.y += this.height * 0.03
        // this.scale.set(1.1);
    }
    onPressUpEffect(){
        this.restorePosition();
        // this.scale.set(1);
    }
    onPressUp(e? : PIXI.interaction.InteractionEvent){
        if(this.isHold)
            this.onClick(e)
        this.isHold = false
        this.onPressUpEffect()
        // e && e.stopPropagation && e.stopPropagation()
    }

    get active(){
        return this._active
    }

    set active(value){
        this._active = value
        this.interactive = value
        this.sprite.tint = value ? 0xffffff : 0x888888
    }
}

export default Button
