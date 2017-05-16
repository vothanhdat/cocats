import 'pixi.js'
import {getSize,assets} from '../../assets'

type _TextureInput =  string | PIXI.Texture 
type _TextureInputFrame = {key : string,time : number}
type _TextureFrame = {texture : _TextureInput,time : number}
type TextureInput = string | PIXI.Texture | (_TextureInput | _TextureInputFrame)[]

const TextureWrap = function(e : _TextureInput | _TextureInputFrame ) : (PIXI.Texture | _TextureFrame ){
    if(typeof e == 'string')
        return  PIXI.Texture.fromImage( typeof assets[e] == 'string' 
            ? assets[e] as string 
            : e) 
    else if(e instanceof PIXI.Texture)
        return e
    else if(e.key && e.time)
        return {
            texture : TextureWrap(e.key) as PIXI.Texture ,
            time : e.time
        }
    else 
        return PIXI.Texture.EMPTY
}


export function getSprite( texture : TextureInput ,sprite? : PIXI.Sprite | PIXI.extras.AnimatedSprite) : PIXI.Sprite | PIXI.extras.AnimatedSprite{
    
    
    if(typeof texture == 'string' ){
        sprite = sprite || new PIXI.Sprite()

        const value = assets[texture]
        if(typeof value == 'string'){
            sprite.texture = PIXI.Texture.fromImage(value as string)
        }else if(value instanceof PIXI.Texture){
            sprite.texture = value 
        }else{
            sprite.texture = PIXI.Texture.fromImage(texture)
        }
        return sprite
    }else if(texture instanceof PIXI.Texture){
        sprite = sprite || new PIXI.Sprite()
        sprite.texture = texture
        return sprite
        
    }else if(texture instanceof Array){
        const movie  = (sprite || new PIXI.extras.AnimatedSprite([PIXI.Texture.EMPTY]) ) as PIXI.extras.AnimatedSprite 

        movie.textures = texture.map(e => TextureWrap(e as _TextureInput)) as PIXI.Texture[] | {texture : PIXI.Texture,time? : number}[]

        movie.texture = (movie.textures[0] && (movie.textures[0] as {texture : PIXI.Texture,time? : number}).texture )  
            || (movie.textures[0] as PIXI.Texture)
        movie.gotoAndPlay(0)
        return movie
        
    }else{
        return new PIXI.Sprite()
    }
}

