import { StaticOb as base } from './base'
import { injectModel,typeMeta } from 'utilities/Decorator'
import { Zombie,Player } from '../MoveUnit'
import { Stone,Tree } from '../StaticOb'
import GameContext from '../../GameScene/Scene'
class Bomb extends base {

    @injectModel
    @typeMeta(Number)
    range: number

    constructor(p: Point) {
        super(p)
        this.range = 1
    }
    update(time: number) {
        super.update(time)

        if (this.lifetime >= 1000)
            this.exploit()
    }

    exploit() {
        const context = this.context
        const map = this.context.mapData.map
        const zombieMap =  Object.values(context.listObject)
            .filter(e => e instanceof Zombie)
            .reduce((e: { [k: string]: Zombie }, f: Zombie) => {
                e[Math.round(f.gx) + '_' + Math.round(f.gy)] = f
                return e
            }, {})

        this.effectTo({
            x : Math.round(this.x),
            y : Math.round(this.y),
        })
        
        for (let [x, y] of [[this.x + 1, this.y], [this.x - 1, this.y], [this.x, this.y + 1], [this.x, this.y - 1]]) {
            if(this.context.getCeil(x,y))
                this.effectTo({x,y})
        }

        this.delete()
    }
    effectTo(point: Point) {
        var ceil = this.context.getCeil(point.x,point.y)
        if(ceil.some(e => e instanceof Stone)){

        }else{
            this.context.addEffect({x : point.x,y : point.y,type : 'Exploition'})
            // this.context.addGameEffect(new this.context.effecttype.Exploit({ ...point }))
            for(var e of ceil) {
                if(e instanceof Tree || e instanceof Zombie){
                    e.delete()
                }else if(e instanceof Bomb && !e.isRemove){
                    setTimeout((e : Bomb) => e.isRemove ||  e.exploit(),160,e)
                }
            }
        }
    }
}

export default Bomb