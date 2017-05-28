class KeyBoardInput{
    keyState : {[key:string] : boolean}
    event :  {[key:string] : (() => void)[]}
    constructor(){
        this.keyState = {}
        this.event = {}
        window.addEventListener('keydown',this.onKeyDown.bind(this))
        window.addEventListener('keypress',this.onKeyPress.bind(this))
        window.addEventListener('keyup',this.onKeyUp.bind(this))
        window.addEventListener('blur',this.onBlur.bind(this))
    }
    onKeyDown(e : KeyboardEvent){
        this.keyState[e.keyCode] = true
    }
    onKeyUp(e : KeyboardEvent){
        this.keyState[e.keyCode] = false
    }
    onKeyPress(e : KeyboardEvent){
        if(this.event[e.keyCode])
            this.event[e.keyCode].forEach(e => setTimeout(e,0))
    }
    onBlur(){
        this.keyState = {}
    }
    onKey(key : number, hander : () => void){
        (this.event[key] || (this.event[key] = [])).push(hander)
    }
}

export default KeyBoardInput