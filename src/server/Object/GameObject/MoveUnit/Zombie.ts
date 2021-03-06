import { MoveUnit as base } from './base'
import { numIsEqual } from 'utilities/Math'
import GameScene from '../../GameScene/Scene'

class Zombie extends base {
    static pathData : number[][]
    pathData: number[][]
    constructor(point: Point) {
        super(point)
        this.speed = Math.round((1 + 2 * Math.random()) * 1000 / 60) * 60 / 1000
        console.log('Zombie constructor')
        console.log(this.id)
    }
    getNextMove(): Point {
        // console.log('getNextMove')
        
        const { x, y, pathData } = this
        var min = Infinity;
        var besti = 0, bestj = 0;

        for (var i = -1; i < 2; i++)
            for (var j = -1; j < 2; j++) if ((!i) != (!j)) {
                var X = x + i, Y = y + j;
                var ceil = this.context.getCeil(X,Y)
                if (ceil && ceil.length == 0 && pathData[Y][X] <= min) {
                    min = pathData[Y][X]
                    besti = i
                    bestj = j
                }
            }
        // if(!besti && !bestj)
        //     console.warn("can't find next move")
        return {
            x : besti,
            y : bestj
        }
    }
    hadMoveTo(x : number,y : number){
        this.pathData[y][x] = Date.now()
    }
    setGameContext(context: GameScene) {
        super.setGameContext(context)
        const st = (this.constructor as typeof Zombie);

        if(!st.pathData)
            st.pathData =  context.mapData.map.map(e => e.map(e => Date.now()));
            
        this.pathData = st.pathData;
    }

}

export default Zombie