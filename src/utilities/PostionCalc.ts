var EvalObject = (function(){

    var max = Math.max,
        min = Math.min,
        sqrt = Math.sqrt,
        abs = Math.abs,
        sin = Math.sin,
        cos = Math.cos,
        tan = Math.tan,
        PI = Math.PI,
        SQRT2 = Math.SQRT2,
        inrange = (value : number,min_n : number ,max_n : number) => min(max_n,max(min_n,value));


	var emulateScopeString = Object.getOwnPropertyNames(window)
        .filter(e => 'eval'.indexOf(e) == -1)
        .map(e => `var ${e} = undefined;`)
        .join('')

    eval(emulateScopeString);

    return function(evalstring :string,p : number,w : number,h : number,vw : number,vh : number){
        return eval(`(function(_P_,_W_,_H_,_VW_,_VH_){var eval=0,emulateScopeString=0,evalstring=0;return ${evalstring};})`).call({},p,w,h,vw,vh)
    }
})()

import Device from './Device'

const resolution = Device.resolution
const devicePixelRatio = Device.scalePixel
const cache : {[k : string] : ((...p : any[]) => number)} = {};


console.log({resolution,devicePixelRatio})

export default function getCalc(option : any ) : ((...p : any[]) => number){
    if (isFinite(option)) { 
        return function(p : number){ return option * p; }
    }else if (typeof option == 'string') {
        if(cache[option])
            return cache[option]
        const evalString = option
            .replace(/%/, '*_P_')
            .replace(/px/, `*${devicePixelRatio}`)
            .replace(/vw/, '*_VW_')
            .replace(/vh/, '*_VH_')
            .replace(/w/, '*_W_')
            .replace(/h/, '*_H_')
        
        return cache[option] = function(p : number,w : number,h : number){
            try {
                return EvalObject(evalString,p * 0.01,w * 0.01,h * 0.01,resolution.width * 0.01,resolution.height * 0.01)
            } catch (error) {
                console.error({evalString,error})
                return 1;
            }
        }

    }else if (typeof option == 'function') {
        return function(p : number,w : number,h : number){
            const evalString = option()
                .replace(/%/, '*p')
                .replace(/px/, `*${devicePixelRatio}`)
                .replace(/vw/, '*vw')
                .replace(/vh/, '*vh')
                .replace(/w/, '*w')
                .replace(/h/, '*h')
            try {        
                return EvalObject(evalString,p * 0.01,w * 0.01,h * 0.01,resolution.width * 0.01,resolution.height * 0.01)
            } catch (error) {
                console.error({evalString,error})
                return devicePixelRatio;
            }
        }

    }else {
        return function(){return devicePixelRatio}
    }
}