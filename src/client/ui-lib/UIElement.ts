import 'pixi.js'
import {getSprite} from '../utilities/SpriteGenerator'
import PostionCalc from '../utilities/PostionCalc'

import './Type'

class UIElement extends PIXI.Sprite {
    // option : Option
    tagname? : string
    childElement : ChildElement<UIElement>
    child : (UIElement)[]
    sprite? : PIXI.Sprite | PIXI.extras.AnimatedSprite


    __anchor : {x : number , y : number}
    __privateKey__ : string
    __isloaddone : boolean
    __calcExpress : FunctionAny<number>[]
    __option : any
    __width : number
    __height : number

    constructor(texture : string, option? : Option, childParam? : ChildElement<UIElement>,tagname? : string) {
        super()
        this.option = option || [0.5,0.5,'100%','100%',0.5,0.5]

        if(this.option[4] === undefined)
            this.option[4] = 0.5
        if(this.option[5] === undefined)
            this.option[5] = 0.5
            
        this.tagname = tagname || ''

        if(childParam instanceof Array){
            this.childElement = {}
            this.child = childParam
        }else{
            this.childElement = childParam || {}
            this.child = Object.values(childParam)
            for(var i in childParam)
                childParam[i].__privateKey__ = i
        }

        this.sprite = null

        this.updateTexture(texture)
  
        this.__anchor = {x : this.option[4] || 0,y : this.option[5] || 0}
        
        for (var e of this.child) 
            this.addChild(e)
    }

    updateTexture(texture : string){
        if (this.sprite)
            this.removeChild(this.sprite)
              

        this.sprite = getSprite(texture)

        this.__isloaddone = this.sprite && this.sprite.texture && !this.sprite.texture.noFrame

        if (this.sprite) {
            this.addChild(this.sprite)
            this.sprite.anchor.set(this.option[4] || 0, this.option[5] || 0)
        }
    }

    set option(value){
        const [l, t, w, h, ax, ay] = value
        this.__option = value
        this.__isloaddone = false
        this.__calcExpress = [
            PostionCalc(l),
            PostionCalc(t),
            PostionCalc(w),
            PostionCalc(h)
        ]
    }

    get option() : Option{
        return this.__option
    }

    update(time? : number) {
        for(var e of this.child)
            e.update();

        var isloadone = this.sprite && this.sprite.texture && !this.sprite.texture.noFrame

        if(isloadone != this.__isloaddone){
            this.__isloaddone = isloadone;
            if(this.parent instanceof UIElement)
                this.resize(this.parent.width,this.parent.height)
        }
    }

    getTextureRatio(){
        if(this.sprite instanceof PIXI.Sprite && this.sprite.texture){
            let {width,height} = this.sprite.texture
            return width / height
        }else if(this.sprite instanceof PIXI.extras.AnimatedSprite){
            let {width = 1,height = 1} = this.sprite.texture || this.sprite.textures[0] || {}
            return width / height
        }
        return 1
    }

    resize(width : number, height : number) {

        var [l, t, w, h, ax, ay] = this.option
        var [get_l, get_t, get_w, get_h, get_ax, get_ay] = this.__calcExpress

        if(w == 'auto'){
            var textureRatio = this.getTextureRatio()
            this.height = get_h(height, width, height)
            this.width = this.height * textureRatio
        }else if(h == 'auto'){
            var textureRatio = this.getTextureRatio()
            this.width = get_w(width, width, height)
            this.height = this.width / textureRatio
        }else{
            this.width = get_w(width, width, height)
            this.height = get_h(height, width, height)
        }


        if(this.parent instanceof UIElement){
            var anchor = this.parent.__anchor
            var offsetX = anchor.x * width
            var offsetY = anchor.y * height
            this.position.set(
                get_l(width, width, height) - offsetX,
                get_t(height, width, height) - offsetY
            )
        }else{
            this.position.set(
                get_l(width, width, height),
                get_t(height, width, height)
            )
        }

        for (var e of this.child)
            e && e.resize && e.resize(this.width, this.height)

    }

    restorePosition(){
        if(this.parent instanceof UIElement){
            var {width,height} = this.parent
            this.resize(width,height)
        }
    }


    get width() {
        return this.__width
    }
    set width(value) {
        this.__width = value
        this.sprite && (this.sprite.width = value)
    }
    get height() {
        return this.__height
    }
    set height(value) {
        this.__height = value
        this.sprite && (this.sprite.height = value)
    }

    getChildByType<T extends UIElement>(type : NewAny<T>,recurse = false) : T[]{
        if(recurse){
            return this.child
                .filter((e,i) => e && e instanceof type)
                .concat(...this.child.map(e => e.getChildByType(type,true))) as T[]
        }
        return this.child.filter(e => e instanceof type) as T[]
    }

    getChildByTagname<T extends UIElement>(tagname : string,recurse = false) : T[]{
        if(recurse){
            return this.child
                .filter((e,i) => e && e.tagname == tagname)
                .concat(...this.child.map(e => e.getChildByTagname(tagname,true)))  as T[]
        }
        return this.child.filter((e,i) => e && e.tagname == tagname)  as T[]
    }

    get rootElement() : UIElement{
        var root = this as UIElement
        while(root.parent && root.parent instanceof UIElement)
            root = root.parent
        return root
    }

    addElement(child : UIElement,index : number,key : string){
        this.child = [...this.child.filter(e => e != child),child]
        if(typeof index == 'number'){
            this.addChildAt(child,index)
        }else{
            this.addChild(child)
        }
        if(key && !(this.childElement instanceof Array)){
            child.__privateKey__ = key
            this.childElement[key] = child
        }
        child.resize(this.width,this.height)
    }

    removeElement(child: UIElement){
        this.child = this.child.filter(e => e != child)
        this.removeChild(child)
        if(child.__privateKey__ && !(this.childElement instanceof Array)){
            this.childElement[child.__privateKey__] = undefined
        }
    }

}

export default UIElement