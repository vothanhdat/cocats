import 'pixi.js'
import {assets} from '../assets'
import GameUI from './ui-component/GameUI'
import Device from './utilities/Device'


var scale = Device.scalePixel
var resolution = Device.resolution

class Game {
    width : number
    height : number
    renderer : PIXI.WebGLRenderer | PIXI.CanvasRenderer
    container : PIXI.Container
    ui : GameUI
    constructor(){

        this.width = resolution.width
        this.height = resolution.height

        this.renderer = PIXI.autoDetectRenderer(this.width,this.height,{antialias:false,transparent:true})
        this.container = new PIXI.Container()

        this.ui = new GameUI([0.5,0.5,'min(100vw,100vh)','min(100vw,100vh)',0.5,0.5])
        this.ui.resize(this.width,this.height)

        this.container.addChild(this.ui)




        // if(module.hot) {
        //     var self = this
        //     module.hot.accept("./component/UI", function(){
        //         try {
        //             var GameUI_ = require("./component/UI").default;
        //             self.container.removeChild(self.ui)
        //             self.ui = new GameUI_([0.5,0.5,1,1,0.5,0.5])
        //             self.container.addChild(self.ui)
        //             self.resize();
        //         } catch (error) {
        //             console.error(error)                    
        //         }
        //     });
        // }
        
    }

    render(){
        this.renderer.render(this.container)
    }

    update(){
        this.ui.update()
    }

    resize(){
        
        this.width = resolution.width
        this.height = resolution.height
        this.renderer.resize(this.width,this.height)
        this.ui.resize(this.width,this.height)
    }

    get view(){
        return this.renderer.view
    }

    onGamePause(){
        this.render = () =>{}
        this.update = () => {}
    }

    onGameResume(){
        this.render = Game.prototype.render
        this.update = Game.prototype.update
    }

}

export default Game