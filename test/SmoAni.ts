import SmoothAnimation from '../src/client/utilities/SmoothAnimation'



var ob = {
    _x : 100,
    get x(){
        return ob._x 
    },
    set x(v){
        ob._x = v
    },
    _y : 100,
    get y(){
        return ob._y 
    },
    set y(v){
        ob._y = v
    },    
    update(t : any){
        // console.log('update')
    },
    _raw : false,
}

SmoothAnimation(ob,['x','y'])


ob.x = 1000
ob.y = 300


for(var i = 0; i < 10;i++){
    ob.update(16)
    console.log(ob.x,ob.y)
}

ob._raw = true;

ob.update(16)

console.log(ob.x,ob.y)

ob._raw = false;

for(var i = 0; i < 10;i++){
    ob.update(16)
    console.log(ob.x,ob.y)
    
}



