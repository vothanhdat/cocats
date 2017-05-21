


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
            var v1 = timer && timer.v1 || 500
            var v2 = timer && timer.v2 || 0.8
            this._valueV[i] += (this._valueX[i] - this._value_[i]) * 0.016 * v1
            this._valueV[i] *= v2
            this._value_[i] += this._valueV[i] * 0.016
        }
    }

}



type Timmer = {key : string,v1 : number,v2 : number}

function SmoothAnimation(ob : {[key : string] : any},properties : (string | Timmer)[]){

    const original_update : () => any = ob.update
    const smoothValues = new SmoothInterpolate()

    ob.update = function(time : number){
        smoothValues.update(time)
        original_update.call(this,time)
    }


    for (let e of properties){
        const key = typeof e == 'string' ? e : e.key
        const propertyDes = Object.getOwnPropertyDescriptor(ob, key) || {};
        const Set = propertyDes.set

        smoothValues.setValue(key,ob[key],true)
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