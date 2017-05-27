import 'pixi.js'
import * as SocketIO from 'socket.io-client'
import {assets} from 'assets'
// import GameUI from './ui-component/GameUI'
import Device from 'utilities/Device'

import GameUI from "./ui-component/GameUI";
import GameStore from './GameStore/GameStore'
import {Scene} from './Object/GameScene'


const scale = Device.scalePixel
const resolution = Device.resolution
const mainUISizeConfig : Option = [0.5,0.5,'min(100vw,50vh)','min(200vw,100vh)',0.5,0.5]

class Main {
    width : number
    height : number
    renderer : PIXI.WebGLRenderer | PIXI.CanvasRenderer
    container : PIXI.Container

    ui : GameUI
    scene : Scene
    store : GameStore

    socket : SocketIOClient.Socket

    constructor(){

        //Init Render
        this.width = resolution.width
        this.height = resolution.height

        this.renderer = PIXI.autoDetectRenderer(this.width,this.height,{antialias:false,transparent:true})
        this.container = new PIXI.Container()


        //Init game Store
        //All game will be store here
        this.store = new GameStore()
        this.store.onUpdate = this.onDiff.bind(this)

        //Init for GameScene
        this.scene = new Scene(this)
        this.scene.resize(this.width,this.height)
        this.container.addChild(this.scene)

        //Init for UI
        this.ui = new GameUI(this,mainUISizeConfig)
        this.ui.resize(this.width,this.height)
        this.container.addChild(this.ui)





        if(module.hot) {
            var self = this
            console.log('CHECK MODULE')
            module.hot.accept("./ui-component/GameUI", function(){
                
                var NewGameUI = require("./ui-component/GameUI").default as typeof GameUI
                self.container.removeChild(self.ui)

                self.ui = new NewGameUI(self,mainUISizeConfig)
                self.container.addChild(self.ui)
                self.ui.resize(this.width,this.height)

            });
        }

        this.initSocket()
        
    }

    initSocket(){
        this.socket = SocketIO('http://localhost:3000',{path:'/ws'});
        this.store.initSocket(this.socket)
    }

    render(){
        this.renderer.render(this.container)
    }

    onDiff(diff : any, newState : any,oldState : any){
        this.scene.onDiff(diff,newState,oldState)
    }

    update(){
        this.scene.update()
        this.ui.update()
    }

    resize(){
        
        this.width = resolution.width
        this.height = resolution.height
        this.renderer.resize(this.width,this.height)
        this.ui.resize(this.width,this.height)
        this.scene.resize(this.width,this.height)
    }

    get view(){
        return this.renderer.view
    }

    onGamePause(){
        this.render = () =>{}
        this.update = () => {}
    }

    onGameResume(){
        this.render = Main.prototype.render
        this.update = Main.prototype.update
    }
    
    getStore() : any{
        return this.store.getStore()
    }

    getStorePath(path:string) : any{
        return this.store.getStorePath(path)
    }

}

export default Main