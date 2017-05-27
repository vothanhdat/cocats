import SmoothAnimation from '../src/utilities/SmoothAnimation'



class OB {
    _x : number
    _y : number
    _raw : boolean
    get x(){
        return this._x 
    }
    set x(v){
        console.log('set X')
        this._x = v
    }
    get y(){
        return this._y 
    }
    set y(v){
        this._y = v
    }    
    update(t : any){
        // console.log('update')
    }
    constructor(){
        // this.x = 100;
        // this.y = 100;
    }
}

class OB2 extends OB{
    constructor(){
        super();
    }
}

class OB3 extends OB2{
    constructor(){
        super();
        SmoothAnimation(this,['x','y'])
    }
}


var ob = new OB3()



ob.x = 100
ob.y = 100

ob.x = 1000
ob.y = 300


for(var i = 0; i < 10;i++){
    ob.update(16)
}

console.log(ob.x,ob.y)
ob._raw = true;

ob.update(16)

console.log(ob.x,ob.y)

ob._raw = false;

for(var i = 0; i < 10;i++){
    ob.update(16)
    
}
console.log(ob.x,ob.y)



