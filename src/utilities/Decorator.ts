import './Polyfill'

const _mS = Symbol('model')
const _mI = Symbol('model-index')
const _mAS = Symbol('array-model')

let idCounter = 100;


export const getModel = function (e: any) {
    return e[_mS]
}

interface TypeMeta {
    key: string
    type: Function
    subtype: Function[] 
}

export const getTypeMeta = function (e: any): TypeMeta[] {
    return e.prototype[_mI]
}

export const injectModel = function <T>(target: any, propertyKey: string) {

    Object.defineProperty(target, propertyKey, {
        get(): T {
            return this[_mS][propertyKey]
        },
        set(v: T) {
            if (!this[_mS])
                this[_mS] = {
                    type: this.constructor.name,
                    id: idCounter++
                };
            this[_mS][propertyKey] = v
        }
    })
}


export const typeMeta = function <T>(type: any, ...subtype: any[]) {
    return function <T>(target: any, key: string) {
        Object.defineProperty(target, _mI, {
            enumerable: false,
            writable: false,
            configurable: true,
            value: [
                ...(target[_mI] || []),
                subtype.length
                    ? {key, type, subtype }
                    : {key, type }
            ] as TypeMeta[]
        })
    }
}


function createSyncArray(array: any) {
    var syncArray = array.map((e: any) => e[_mS]);
    var newArray = new Proxy(array, {
        set: function (target: any, key: string, value: any) {
            if (key != 'length') {
                syncArray[key] = value[_mS];
            } else {
                syncArray[key] = value;
            }
            target[key] = value;
            return true
        }
    })
    return { newArray, syncArray }
}

function createSyncObject(object: any) {
    var syncObject = Object.entries(object).reduce((ob,[k,value]) => {
        ob[k] = value[_mS];
        return ob
    },{} as {[k : string] : any})  
    var newObject = new Proxy(object, {
        set: function (target: any, key: string, value: any) {
            if(value){
                syncObject[key] = value[_mS];
            }else{
                delete syncObject[key]
            }
            target[key] = value;
            return true
        }
    })
    return { newObject, syncObject }
}

export const injectModelArray = function <T>(target: any, propertyKey: string) {

    Object.defineProperty(target, propertyKey, {
        get(): T {
            return this[_mAS][propertyKey]
        },
        set(v: T) {
            if (!this[_mS]) {
                this[_mS] = {
                    type: this.constructor.name,
                    id: idCounter++
                };
                this[_mAS] = {};
            }
            var { newArray, syncArray } = createSyncArray(v)

            this[_mAS][propertyKey] = newArray
            this[_mS][propertyKey] = syncArray
        }
    })
}

export const injectModelMap = function <T>(target: any, propertyKey: string) {

    Object.defineProperty(target, propertyKey, {
        get(): T {
            return this[_mAS][propertyKey]
        },
        set(v: T) {
            if (!this[_mS]) {
                this[_mS] = {
                    type: this.constructor.name,
                    id: idCounter++
                };
                this[_mAS] = {};
            }
            var { newObject,syncObject } = createSyncObject(v)

            this[_mAS][propertyKey] = newObject
            this[_mS][propertyKey] = syncObject
        }
    })
}



function _handleChange_<T>(target: any, propertyKey: string, onChangeCallback : string) {
    const key = '_' + propertyKey;
    const onChangeKey = onChangeCallback;
    const onChangeKeyT = onChangeCallback + '@T';
    if (!target[onChangeKey]) {
        console.error(`${target.constructor.name}: missing method ${onChangeKey}`)
    }
    Object.defineProperty(target, propertyKey, {
        get(): T {
            return this[key]
        },
        set(v: T) {
            console.log('set Context')
            console.log(v)
            if (this[key] != v && this[onChangeKey]) {
                this[key] = v;
                clearTimeout(this[onChangeKeyT])
                this[onChangeKeyT] = setTimeout(this[onChangeKey].bind(this),0,v)
            }
        }
    })
}

function handleChangeFunc<T>(p1  : string): <T>(v1 : any, v2 : string) => void;
function handleChangeFunc<T>(p1 : any, p2 : string): void;

function handleChangeFunc<T>(p1 : any, p2? : any) : any {
    if (typeof p2 == "undefined") {
        const onChangeKey = p1;
        return function<T>(p1 : any,p2 : string){
            return _handleChange_<T>(p1,p2,onChangeKey)
        }
    }else{
        const onChangeKey = p2 + 'Change';
        return _handleChange_<T>(p1,p2,onChangeKey)
    }

}

export const handleChange = handleChangeFunc

var a = handleChangeFunc<number>('ss')



export const makeSmooth = function (target: any, propertyKey: string) {

    const key1 = '__sm1_' + propertyKey
    const key2 = '__sm2_' + propertyKey
    const key3 = '__sm3_' + propertyKey

    if (!target._originalupdate) {
        target._smoothkey = []
        target._originalupdate = target.update

        target.update = function (t: any) {
            const speed = this._smoothspeed || 0.5
            for (var [e1, e2, e3] of this._smoothkey) {
                this[e3] += (this[e2] - this[e3]) * speed
                this[e2] += (this[e1] - this[e2]) * speed
            }
            this._originalupdate(t)
        }
    }

    target._smoothkey.push([key1, key2, key3])

    Object.defineProperty(target, propertyKey, {
        get(): any {
            return this['__sm3_' + propertyKey]
        },
        set(v) {
            if (this[key1] === undefined) {
                this[key1] = v;
                this[key2] = v;
                this[key3] = v;
            } else {
                this[key1] = v;
            }

        }
    })
}