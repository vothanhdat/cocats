import { MoveUnit as base } from './base'

class Zombie extends base {
    static texture = PIXI.Texture.fromImage('/assets/monster.png');
}

export default Zombie