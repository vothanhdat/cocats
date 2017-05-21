import 'pixi.js'
import UIElement from './UIElement'

declare interface TextStyle extends PIXI.TextStyleOptions {
    mask?: boolean,
}

const defaultStyle = { fill: 0xffffff, fontSize: 1 }

class TextElement extends UIElement {

    textSprite: PIXI.Text
    maskGraphs?: PIXI.Graphics

    private _text: string
    private _text_fn: () => string
    private _textSize: number | string

    constructor(text: string | (() => string), style: TextStyle, option? : Option, tagname?: string) {

        super(null, option, [], tagname)

        this.textSprite = new PIXI.Text(this.text, { ...defaultStyle, ...style })
        this.textSprite.anchor.set(this.option[4] || 0, this.option[5] || 0)
        this.isMask = style.mask

        this.textSize = style.fontSize

        this.addChild(this.textSprite)


        if (text instanceof Function) {
            this.text = text()
        } else {
            this.text = text
        }

    }

    get style() {
        return this.textSprite.style
    }

    set style(value) {
        this.textSprite.style = value
    }

    get text() {
        return this._text
    }

    set text(value) {
        if (value != this._text) {
            this._text = value
            this._text_fn = null;
            this.textSprite.text = value
        }
    }
    get text_fn() {
        return this._text_fn
    }

    set text_fn(value) {
        this._text_fn = value
    }

    update() {
        if (this._text_fn) {
            let value = this._text_fn()
            if (value != this._text) {
                this._text = value
                this.textSprite.text = value
            }
        }

        super.update()

        // if(this.zoom > 1.001){
        //     this.zoom *= 0.95
        //     this.scale.set(this.zoom)
        // }else if(this.zoom > 1){
        //     this.scale.set(1)
        //     this.zoom = 1;
        // }
    }

    resize(width: number, height: number) {
        super.resize(width, height)
        this.updateMaskSize()
        this.textSprite.style.fontSize = this.textSize
    }

    get textSize(): number | string {
        return this.width * 0.08 * (this._textSize as number || 1)
    }
    set textSize(value: number | string) {
        this._textSize = value
        this.textSprite.style.fontSize = this.textSize
    }

    set isMask(value) {
        if (value) {
            if (!this.maskGraphs) {
                this.maskGraphs = new PIXI.Graphics()
                this.addChildAt(this.maskGraphs, 0)
                this.textSprite.mask = this.maskGraphs
                this.updateMaskSize()
                console.log('SetMask Done')
            }
        } else {
            if (this.maskGraphs) {
                this.textSprite.mask = null
                this.removeChild(this.maskGraphs)
                this.maskGraphs = null
            }
        }
    }

    get isMask() {
        return this.maskGraphs instanceof PIXI.Graphics
    }

    updateMaskSize() {
        if (!this.maskGraphs)
            return
        var anchor = this.__anchor

        this.maskGraphs.clear()
        this.maskGraphs.beginFill(0x000000);
        this.maskGraphs.drawRect(this.width * (anchor.x - 1), this.height * (anchor.y - 1), this.width, this.height);
        this.maskGraphs.endFill();
    }
}

export default TextElement