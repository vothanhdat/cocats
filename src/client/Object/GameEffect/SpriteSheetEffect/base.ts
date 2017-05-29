import base from '../base'



function LoadPromise(texture : PIXI.Texture) : Promise<PIXI.Texture>{
    if(texture.baseTexture.hasLoaded)
        return Promise.resolve(texture)
    else
        return new Promise<PIXI.Texture>((resolve,reject) => texture.on('update',resolve))
}

class SpriteEffect extends base{
    // static direct : DIRECT
    static row : number
    static col : number
    static time : number
    static textures : PIXI.Texture[]
    static set texture(texture: PIXI.Texture){

        const totalFrame = this.row * this.col
        this.textures = new Array(totalFrame)

        for(var i = 0; i < totalFrame; i++)
            this.textures[i] = new PIXI.Texture(texture.baseTexture)
        
        LoadPromise(texture).then((texture) => {
            const {x,y,width,height} = texture.frame
            const ceilw = width /  this.col
            const ceilh = height /  this.row

            for(var i = 0; i < totalFrame; i++){
                this.textures[i].frame = new PIXI.Rectangle(
                    (i%this.col) * ceilw,
                    (i/this.col|0) * ceilh,
                    ceilw,
                    ceilh
                )
            }
        })

        
    }

    curentFrame : number

    constructor(p : Point){
        super(p);
        this.curentFrame = 0
        // this.texture = PIXI.Texture.fromImage('/assets/exploit_5_4.png')
        this.texture = (this.constructor as typeof SpriteEffect).textures[this.curentFrame]
        console.log(this.texture)
    }

    update(time : number){
        super.update(time)
        const thisClass = (this.constructor as typeof SpriteEffect)
        const textures = thisClass.textures
        const curentFrame = this.timelife / thisClass.time | 0;
        if(curentFrame != this.curentFrame){
            if(curentFrame < textures.length){
                this.curentFrame = curentFrame;
                this.texture = textures[this.curentFrame]
            }else{
                console.log('Removed')
                this.remove()
            }
        }
    }
}

export default SpriteEffect