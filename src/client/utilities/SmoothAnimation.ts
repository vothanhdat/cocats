


type ObN = {[key : string] : number}
type ObB = {[key : string] : boolean}

class SmoothInterpolate {
    _first : ObB
    _value1 : ObN
    _value2 : ObN
    _value3 : ObN
    constructor(){
        this._first = {}
        this._value1 = {}
        this._value2 = {}
        this._value3 = {}
    }

    setValue(property : string,value : number ,force : boolean){
        if(force || !this._first[property]){
            this._value1[property] 
                = this._value2[property]
                = this._value3[property]
                = value
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
            this._value3[i] += (this._value2[i] - this._value3[i]) * 0.3
            this._value2[i] += (this._value1[i] - this._value2[i]) * 0.3
        }
    }

}



function SmoothAnimation(ob : {[key : string] : any},properties : string[]){

    const original_update : () => any = ob.update
    const smoothValues = new SmoothInterpolate()

    ob.update = function(time : number){
        smoothValues.update(time)
        original_update.call(this,time)
    }


    for (let e of properties){
        const propertyDes = Object.getOwnPropertyDescriptor(ob, e) || {};
        const Set = propertyDes.set

        console.log(e,propertyDes)

        // smoothValues.setValue(e,ob[e],true)

        Object.defineProperty(ob, e, { 
            get: function(){
                return smoothValues.getValue(e,ob._raw)
            }, 
            set: function(v : number){
                smoothValues.setValue(e,v,ob._raw)
                Set && Set.call(this,v)
            }
        });
    }

}

export default SmoothAnimation