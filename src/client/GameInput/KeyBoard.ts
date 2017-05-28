class KeyBoardInput{
    keyState : {[key:string] : boolean}
    event :  {[key:string] : (() => void)[]}
    constructor(){
        this.keyState = {}
        this.event = {}
        this.onKeyDown = this.onKeyDown.bind(this)
        this.onKeyPress = this.onKeyPress.bind(this)
        this.onKeyUp = this.onKeyUp.bind(this)
        this.onBlur = this.onBlur.bind(this)
        this.register()
    }
    register(){
        window.addEventListener('keydown',this.onKeyDown)
        window.addEventListener('keypress',this.onKeyPress)
        window.addEventListener('keyup',this.onKeyUp)
        window.addEventListener('blur',this.onBlur)
    }
    dispose(){
        window.removeEventListener('keydown',this.onKeyDown)
        window.removeEventListener('keypress',this.onKeyPress)
        window.removeEventListener('keyup',this.onKeyUp)
        window.removeEventListener('blur',this.onBlur)
        this.event = {}
        this.keyState = {}
    }

    protected onKeyDown(e : KeyboardEvent){
        this.keyState[e.keyCode] = true
    }

    protected onKeyUp(e : KeyboardEvent){
        this.keyState[e.keyCode] = false
    }

    protected onKeyPress(e : KeyboardEvent){
        if(this.event[e.keyCode])
            this.event[e.keyCode].forEach(e => setTimeout(e,0))
    }

    protected onBlur(){
        this.keyState = {}
    }
    onKey(key : number, hander : () => void){
        (this.event[key] || (this.event[key] = [])).push(hander)
    }
}

export default KeyBoardInput