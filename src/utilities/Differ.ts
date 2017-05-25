


const EQUAL = Symbol('false') 
const REMOVED = Symbol('remove') 

const isPrim = (e:any) => {
    var t = typeof(e)
    return t == 'number' || t == 'string' || t == 'boolean' 
}

function diff(obj_1:any , obj_2 : any) : any{

    let tp1 = typeof(obj_1)
    let tp2 = typeof(obj_2)

    if(tp1 == 'object' && tp2 == 'object'){
        var isArray1 = obj_1 instanceof Array 
        var isArray2 = obj_2 instanceof Array 
        if(isArray1 && isArray2){
            if(obj_1.every((e:any) => e.id) && obj_2.every((e:any)  => e.id)){
                return diffArray(obj_1,obj_2)
            }else if(obj_1.every(isPrim) && obj_2.every(isPrim)){
                if(obj_1.every((e : any,i : number) => obj_2[i] == e))
                    return EQUAL
                else 
                    return obj_2
            }
        }

        return diffOb(obj_1,obj_2)
    }else {
        return obj_1 == obj_2 ? EQUAL : obj_2
    }
}

function diffOb(obj_1:any , obj_2 : any){
    var diffData : any = {}
    var hasDiff = false
    for(var i in obj_2){
        var d =  diff(obj_1[i],obj_2[i])
        if(d !== EQUAL){
            diffData[i] = d
            hasDiff = true
        }
    }
    for(var i in obj_1){
        if(!(i in obj_2)){
            diffData[i] = 0;
            hasDiff = true
        }
    }
    return hasDiff ? diffData : EQUAL
}

function arrayToIndex(ar : any[]){
    var ob : any = {}
    for(var e of ar)
        ob[e] = 0;
    return ob
}
function arrayIdToObject(ar : ( {id : string} & {[k:string]:string})[]){
    var ob : any = {}
    for(var e of ar)
        ob[e.id] = e;
    return ob
}

function diffArray(ar_1:any[] , ar_2 : any[]){
    var obj_1 = arrayIdToObject(ar_1);
    var obj_2 = arrayIdToObject(ar_2);
    var removedID :any = [];
    var diffData : any = {};
    var hasDiff = false
    for(var i in obj_2){
        var d =  diff(obj_1[i],obj_2[i])
        if(d !== EQUAL){
            var {id,...newd} = d
            diffData[i] = newd
            hasDiff = true
        }
    }
    for(var i in obj_1){
        if(!(i in obj_2)){
            removedID.push(i)
            hasDiff = true
        }
    }
    diffData.__ = removedID.join(' ');
    return hasDiff ? diffData : EQUAL
}


export default function getDiff(obj_1:any , obj_2 : any){
    return diff(obj_1,obj_2)
}

function mergeDiffArray(ob : any,diff : any){
    if(diff instanceof Object){
        var removeIndex = arrayToIndex((diff.__ || '').split(' ') || [])
        var newArray = [...ob].filter(e => e && e.id && !(e.id in removeIndex))
        var dataIndex = arrayIdToObject(newArray)

        for(var i in diff) if(i != '__') {
            if(dataIndex[i])
                mergeDiff(dataIndex[i],{id : i,...diff[i]})
            else
                newArray.push({id : i,...diff[i]})
        }
        ob.length = 0
        ob.push(...newArray)
    }
}



function mergeDiffOb (ob : any,diff : any){
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


export function mergeDiff(ob : any,diff : any){
    if(ob instanceof Array && ob.some(e => e && e.id)){
        console.log('')
        mergeDiffArray(ob,diff)
    }else if(ob instanceof Object && diff instanceof Object){
        mergeDiffOb(ob,diff)
    }
}
