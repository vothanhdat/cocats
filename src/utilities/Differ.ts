


const EQUAL = Symbol('false') 
const REMOVED = Symbol('remove') 

const isPrim = (e:any) => {
    var t = typeof(e)
    return t == 'number' || t == 'string' || t == 'boolean' 
}

function diff(obj_1:any , obj_2 : any) : any{
    let tp2 = typeof(obj_2)
    if(tp2 == 'object'){
        if(obj_2 instanceof Array){
            if(obj_2.every((e:any)  => e.id)){
                return diffArray(obj_1,obj_2)
            }else if(obj_2.every(isPrim)){
                if(obj_1 && obj_2.every((e : any,i : number) => obj_1[i] == e))
                    return EQUAL
                else 
                    return obj_2
            }
        }

        return diffOb(obj_1 || {},obj_2)
    }else {
        // if(tp2 == 'number'){
        //     var objn_2 = (obj_2).toFixed(3);
        //     var objn_1 = obj_1  && (obj_1).toFixed(3);
        //     return objn_1 == objn_2 ? EQUAL : objn_2
        // }

        return obj_1 == obj_2 ? EQUAL : obj_2
    }
}

function diffOb(obj_1:any , obj_2 : any){
    var diffData : any = {}
    for(var i in obj_2){
        var d =  diff(obj_1[i],obj_2[i])
        if(d !== EQUAL){
            diffData[i] = d
        }
    }
    for(var i in obj_1){
        if(!(i in obj_2)){
            diffData[i] = 0;
        }
    }
    return Object.keys(diffData).length > 0 ? diffData : EQUAL
}

function arrayIdToObject(ar : ( {id : string} & {[k:string]:string})[]){
    var ob : any = {}
    for(var e of ar)
        ob[e.id] = {...e,id : undefined}
    return ob
}

function diffArray(ar_1:any[] , ar_2 : any[]){
    return diffOb(arrayIdToObject(ar_1 || []),arrayIdToObject(ar_2));
}


export default function getDiff(obj_1:any , obj_2 : any){
    return diff(obj_1,obj_2)
}

function arrayToIndex(ar : any[]){
    var ob : any = {}
    for(var e of ar)
        ob[e] = 0;
    return ob
}

export function mergeDiff (ob : any,diff : any){
    if(diff instanceof Object){
        for(var i in diff){

            var o = ob[i]
            var v = diff[i]
            if(o instanceof Object && v instanceof Object){
                mergeDiff(o,v)
            }else{
                if(ob instanceof Object && v === 0){
                    delete ob[i]
                }else {
                    ob[i] = v
                }
            }
        }
    }
}
