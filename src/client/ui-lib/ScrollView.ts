import 'pixi.js'
import UIElement from './UIElement'
import Button from './Button'
import {assets} from '../../assets'
import SmoothAnimation from '../utilities/SmoothAnimation'

enum SCROLLTYPE {
    VERTICAL = 1,
    HORIZONTAL = 2,
}

enum SCROLLANIMATE {
    INERTIA = 1,
    ROUNDED = 2,
}

type ScrollViewConfig = {
    type : SCROLLTYPE
    animate : SCROLLANIMATE
    round : number
}



class ScrollView extends UIElement {
    static SCROLLTYPE = SCROLLTYPE
    static SCROLLANIMATE = SCROLLANIMATE

    type : SCROLLTYPE
    animate : SCROLLANIMATE
    roundValue : number

    
    scrollPosition : number
    scrollPosition1 : number
    scrollPosition2 : number
    lastScrollDelta : number
    scrollPositionPrev : number
    scrollVel : number
    
    isHold : boolean
    lockScroll : boolean
    lastPoint : {x : number ,y : number}
    
    childElement : {
        mask : UIElement,
        container : UIElement
    }

    constructor(option : Option, childParam? : ChildElement<UIElement> ,tagName? : string, config? : ScrollViewConfig) {

        super(null, option, {
            mask : new UIElement(assets.WHITE, [0.5, 0.5, 1, 1, 0.5, 0.5]),
            container : new UIElement(null, [0.5, 0.5, 1, 1, 0.5, 0.5],childParam),
        }, tagName)

        config = config || {
            type : SCROLLTYPE.VERTICAL,
            animate : SCROLLANIMATE.INERTIA,
            round : 1
        }

        this.childElement.container.mask = this.childElement.mask.sprite

        this.type = config.type || SCROLLTYPE.VERTICAL
        this.animate = config.animate || SCROLLANIMATE.INERTIA
        this.roundValue = config.round || 1

        this.interactive = true
        this.isHold = false;
        this.lastPoint = { x: 0, y: 0 }
        this.lockScroll = false

        this.on('touchstart', this.onPressDown)
        this.on('mousedown', this.onPressDown)

        this.on('mousemove', this.onMouseMove)
        this.on('touchmove', this.onMouseMove)


        window.addEventListener('mouseup', this.onPressUp.bind(this))
        window.addEventListener('touchend', this.onPressUp.bind(this))

        this.addElement = this._addElement
        this.removeElement = this._removeElement


        this.scrollPosition = 0
        this.scrollPosition1 = 0
        this.scrollPosition2 = 0
        this.lastScrollDelta = 0
        this.scrollVel = 0      

    }

    get maskSprite(){
        return this.childElement.mask
    }

    get container (){
        return this.childElement.container
    }

    get scrollLength() : number{
        return 2;
    }

    onScrollUpdate() {
        // throw new Error('must implement onScrollUpdate method')
    }

    update() {
        if (!this.isHold) {
            if (this.animate == SCROLLANIMATE.INERTIA) {
                this.scrollPosition -= this.scrollVel
                this.scrollVel *= 0.95
            } else {
                this.scrollPosition += (this.scrollPosition1 - this.scrollPosition) * 0.2
                this.scrollPosition1 += (this.scrollPosition2 - this.scrollPosition1) * 0.2
            }
            this.onScrollUpdate()
        } else if (this.isHold) {
            var delta = -(this.scrollPosition - this.scrollPositionPrev)
            this.scrollVel = (this.scrollVel * 0.8 + delta * 0.2)
            this.scrollPosition1 = this.scrollPosition
            this.scrollPosition2 = this.scrollVel > 0
                ? Math.max(0, Math.floor(this.scrollPosition / this.roundValue) * this.roundValue)
                : Math.min(this.scrollLength - 1, Math.ceil(this.scrollPosition / this.roundValue) * this.roundValue)
            this.scrollPositionPrev = this.scrollPosition
        }

        if (this.scrollPosition < 0) {
            this.scrollPosition *= 0.8
        } else if (this.scrollPosition > this.scrollLength - 1) {
            this.scrollPosition += (this.scrollLength - 1 - this.scrollPosition) * 0.2
        }

        if (this.type == SCROLLTYPE.VERTICAL)
            this.container.y = -this.scrollPosition * this.__height
        else
            this.container.x = -this.scrollPosition * this.__width

        super.update()
    }

    onPressUp(e : PIXI.interaction.InteractionEvent) {
        if (this.isHold) {
            e.stopPropagation && e.stopPropagation()
            this.scrollPositionPrev = this.scrollPosition
        }
        this.isHold = false
        this.lockScroll = false
    }

    onPressDown(e : PIXI.interaction.InteractionEvent) {
        this.isHold = true
        this.lastPoint = e.data.getLocalPosition(this)
        this.scrollPositionPrev = this.scrollPosition
    }

    onMouseMove(e : PIXI.interaction.InteractionEvent) {
        if (this.isHold) {
            var point = e.data.getLocalPosition(this)
            var deltaY = (point.y - this.lastPoint.y) / this.__height
            var deltaX = (point.x - this.lastPoint.x) / this.__width

            if (this.lockScroll) {
                if (this.type == SCROLLTYPE.VERTICAL) {
                    this.scrollPosition -= deltaY
                    this.onScrollUpdate()
                } else {
                    this.scrollPosition -= deltaX
                    this.onScrollUpdate()
                }
                e.stopPropagation()
                this.lastPoint = point
            } else if (!this.lockScroll) {
                if (Math.abs(deltaX) > 0.02 || Math.abs(deltaY) > 0.02) {


                    if (Math.abs(deltaX) > Math.abs(deltaY) ){
                        if(this.type == SCROLLTYPE.HORIZONTAL)
                            this.lockScroll = true
                    } else {
                        if(this.type == SCROLLTYPE.VERTICAL)
                            this.lockScroll = true
                    }
                    
                }
            }

        }
    }

    _addElement(child : UIElement, index : number,key? : string) {
        this.container.addElement(child, index, key)
    }

    _removeElement(child : UIElement) {
        this.container.removeElement(child)
    }

    nextPage() {
        this.scrollPosition2 = Math.min(this.scrollPosition2 + 1, this.scrollLength - 1)
    }

    prevPage() {
        this.scrollPosition2 = Math.max(this.scrollPosition2 - 1, 0)
    }

    setNextButton(e : Button) {
        e.interactive = true
        e.onClick = this.nextPage.bind(this)
    }

    setPrevButton(e : Button) {
        e.interactive = true
        e.onClick = this.prevPage.bind(this)
    }
}

export default ScrollView