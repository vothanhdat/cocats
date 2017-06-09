import { GameObjectBase } from '../base'
import { injectModel,typeMeta } from 'utilities/Decorator'
import { addInRange, numIsEqual, } from 'utilities/Math'

import GameScene from '../../GameScene/Scene'

export class MoveUnit extends GameObjectBase {
    gx: number
    gy: number
    dx: number
    dy: number
    nextMove: Point
    
    @injectModel
    @typeMeta(Number)
    speed: number

    constructor(point: Point) {
        super(point)
        this.gx = point.x
        this.gy = point.y
        this.dx = 0
        this.dy = 0
        this.nextMove = null
    }
    getNextMove(): Point {
        return null
    }
    update(time: number) {
        super.update(time)
        var checkX = !numIsEqual(this.x, this.gx, 0.01)
        var checkY = !numIsEqual(this.y, this.gy, 0.01)

        if (checkX && checkY)
            console.warn('Wrong Move')
        else if (!checkX && !checkY) {
            this.x = this.gx
            this.y = this.gy
            this.hadMoveTo(this.x, this.y)
            var nextMove = this.getNextMove()
            if (nextMove) {
                this.dx = nextMove.x
                this.dy = nextMove.y
            }

            if (this.dx || this.dy)
                this.moveTo(this.dx, this.dy)
            else if (this.nextMove && this.moveTo(this.nextMove.x, this.nextMove.y)) {
                console.log('MoveToNext', this.nextMove)
                this.nextMove = null
            }
        } else if (checkX) {
            this.x = addInRange(this.x, this.gx, this.speed * time)
            this.y = this.gy
        } else if (checkY) {
            this.x = this.gx
            this.y = addInRange(this.y, this.gy, this.speed * time)
        }

        if (checkX && this.dy) {
            this.nextMove = { x: 0, y: this.dy }
        } else if (checkY && this.dx) {
            this.nextMove = { x: this.dx, y: 0 }
        } else if (checkX && this.dx) {
            this.nextMove = null
            if (this.dx * (this.gx - this.x) < 0) {
                this.moveTo(this.dx, 0)
            }
        } else if (checkY && this.dy) {
            this.nextMove = null
            if (this.dy * (this.gy - this.y) < 0) {
                this.moveTo(0, this.dy)
            }
        }
    }
    canMoveTo(dx: number, dy: number): boolean {
        if (dx && dy)
            return false
        const nextCeil = this.context.getCeil(this.gx + dx, this.gy + dy)
        return nextCeil && nextCeil.length == 0
    }
    moveTo(dx: number, dy: number): boolean {
        if (this.canMoveTo(dx, dy)) {
            const thisCeil = this.context.getCeil(this.gx, this.gy)
            const nextCeil = this.context.getCeil(this.gx + dx, this.gy + dy)
            thisCeil.remove(this)
            nextCeil.push(this)
            this.gx += dx
            this.gy += dy
            return true
        } else {
            return false
        }
    }
    hadMoveTo(x: number, y: number): void {

    }
    setGameContext(context: GameScene) {
        super.setGameContext(context)
        context.getCeil(this.gx, this.gy).push(this)
    }
    delete() {
        super.delete()
        this.context.getCeil(this.gx, this.gy).remove(this)
    }
}