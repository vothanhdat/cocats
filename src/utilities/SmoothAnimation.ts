


type ObN = {[key : string] : number}
type ObB = {[key : string] : boolean}



class SmoothInterpolate {
    _first : ObB
    _valueX : ObN
    _valueV : ObN
    _valueA : ObN
    _value_ : ObN
    _timer1_ : {[key : string] : {v1 : number,v2 : number}}
    constructor(){
        this._first = {}
        this._valueX = {}
        this._valueV = {}
        this._value_ = {}
        this._timer1_ = {}
    }
    
    setTimmer(key :string,v1 : number,v2 : number){
        this._timer1_[key] = {v1,v2}
    }

    setValue(property : string,value : number ,force : boolean){
        if(force || !this._first[property]){
            this._valueX[property] = value;
            this._value_[property] = value;
            this._valueV[property] = 0;
            this._first[property] = true
        }else{
            this._valueX[property] = value
        }
    }

    getValue(property : string ,raw : boolean) : number{
        if(raw)
            return this._valueX[property] 
        else 
            return this._value_[property] 
    }

    update(time : number) {
        for(var i in  this._first){
            var timer = this._timer1_[i]
            var v1 = timer && timer.v1 || 700
            var v2 = timer && timer.v2 || 0.7
            this._valueV[i] += (this._valueX[i] - this._value_[i]) * 0.016 * v1
            this._valueV[i] *= v2
            this._value_[i] += this._valueV[i] * 0.016
            
        }
    }

}



class SmoothAni {

    _first : ObB
    _value1 : ObN
    _value2 : ObN
    _value3 : ObN
    _timer1_ : {[key : string] : {v1 : number,v2 : number}}
    constructor(){
        this._first = {}
        this._value1 = {}
        this._value2 = {}
        this._value3 = {}
        this._timer1_ = {}
    }
    
    setTimmer(key :string,v1 : number,v2 : number){
        this._timer1_[key] = {v1,v2}
    }

    setValue(property : string,value : number ,force : boolean){
        if(force || !this._first[property]){
            this._value1[property] = value;
            this._value2[property] = value;
            this._value3[property] = 0;
            this._first[property] = true
        }else{
            this._value1[property] = value
        }
    }

    getValue(property : string ,raw : boolean) : number{
        if(raw)
            return this._value1[property] 
        else 
            return this._value3[property] 
    }

    update(time : number) {
        for(var i in  this._first){
            var timer = this._timer1_[i]
            var v1 = timer && timer.v1 || 0.5
            var v2 = timer && timer.v2 || 0.5
            this._value3[i] += (this._value2[i] - this._value3[i]) * 0.5      
            this._value2[i] += (this._value1[i] - this._value2[i]) * 0.5      
        }
    }

}



type Timmer = {key : string,v1 : number,v2 : number}


function findSetterAndGetter(ob : any,key : string){
    var propertyDes = Object.getOwnPropertyDescriptor(ob, key);
    while(ob && (!propertyDes || !propertyDes.set)){
        console.log('t')
        ob = ob.__proto__
        propertyDes = Object.getOwnPropertyDescriptor(ob, key);
    }
    return propertyDes
}

function SmoothAnimation(ob : {[key : string] : any},properties : (string | Timmer)[],aniType? : (typeof SmoothAni | typeof SmoothInterpolate) ){
    const type = aniType || SmoothAni
    const original_update : () => any = ob.update
    const smoothValues = new type()

    ob.update = function(time : number){
        smoothValues.update(time)
        original_update.call(this,time)
    }


    for (let e of properties){
        const key = typeof e == 'string' ? e : e.key
        const propertyDes = findSetterAndGetter(ob, key) || {};
        const Set = propertyDes.set

        ob[key] && smoothValues.setValue(key,ob[key],true)

        if((e as Timmer).key){
            smoothValues.setTimmer(key,(e as Timmer).v1,(e as Timmer).v2)
        }

        Object.defineProperty(ob, key, { 
            get: function(){
                return smoothValues.getValue(key,ob._raw)
            }, 
            set: function(v : number){
                smoothValues.setValue(key,v,ob._raw)
                Set && Set.call(this,v)
            }
        });
    }

}

export default SmoothAnimation
export const type = {
    SmoothAni,
    SmoothInterpolate,
}