const _mS = Symbol('model')
const _mAS = Symbol('array-model')


export const getModel = function (e : any){
    return e[_mS]
}


export const injectModel = function <T>(target: any, propertyKey: string) {

    Object.defineProperty(target, propertyKey, {
        get(): T {
            return this[_mS][propertyKey]
        },
        set(v: T) {
            if(!this[_mS])
                this[_mS] = {type : this.constructor.name};
            this[_mS][propertyKey] = v
        }
    })
}


function createSyncArray(array : any){
    var syncArray = array.map((e : any) => e[_mS]);
    var newArray = new Proxy(array,{
        set: function(target: any, key : string, value : any){
            if(key != 'length'){
                syncArray[key] = value[_mS];
            }else{
                syncArray[key] = value;
            }
            target[key] = value;
            return true
        }
    })
    return { newArray,syncArray}
}

export const injectModelArray = function <T>(target: any, propertyKey: string) {

    Object.defineProperty(target, propertyKey, {
        get(): T {
            return this[_mAS][propertyKey]
        },
        set(v: T) {
            if(!this[_mS]){
                this[_mS] = {type : this.constructor.name};
                this[_mAS] = {};
            }
            var { newArray,syncArray} = createSyncArray(v)

            this[_mAS][propertyKey] = newArray
            this[_mS][propertyKey] = syncArray
        }
    })
}
