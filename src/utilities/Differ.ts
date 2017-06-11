


const EQUAL = Symbol('false')
const REMOVED = Symbol('remove')

const isPrim = (e: any) => {
    var t = typeof (e)
    return t == 'number' || t == 'string' || t == 'boolean'
}

function diff(obj_1: any, obj_2: any, time: number): any {
    let tp2 = typeof (obj_2)
    if (tp2 == 'object') {
        if (obj_2 instanceof Array) {
            if (obj_2.every(isPrim)) {
                if (obj_1 && obj_2.every((e: any, i: number) => obj_1[i] == e))
                    return EQUAL
                else
                    return obj_2
            }
        }

        return diffOb(obj_1 || {}, obj_2, time)
    } else {
        return obj_1 == obj_2 ? EQUAL : obj_2
    }
}

function compareWithSpeed(preval: number, newval: number, deltatime: number, speed: number) {
    return Math.abs(newval - (preval + deltatime * speed)) < 0.01
}

function diffOb(obj_1: any, obj_2: any, time: number) {
    var diffData: any = {}
    for (var i in obj_2) {

        var d = diff(obj_1[i], obj_2[i], time)
        
        if (isFinite(obj_1[i])) {
            if (('v' + i) in obj_1
                && Math.abs(obj_1['v' + i] - obj_2['v' + i]) < 0.01) {
                if (compareWithSpeed(obj_1[i], obj_2[i], time, obj_2['v' + i])) {
                    continue;
                }

            } else if( Math.abs(obj_1[i] - obj_2[i]) > 0.001 && i.startsWith('v')){
                var _i_ = i.substring(1)
                diffData[i] = obj_2[i]
                diffData[_i_] = obj_2[_i_]
            }
        }

        if (d !== EQUAL) {
            diffData[i] = d
        }

    }
    for (var i in obj_1) {
        if (!(i in obj_2)) {
            diffData[i] = obj_1[i] instanceof Object ? {} : 0;
        }
    }
    return Object.keys(diffData).length > 0 ? diffData : EQUAL
}



export default function getDiff(obj_1: any, obj_2: any, time: number) {
    return diff(obj_1, obj_2, time)
}


export function mergeDiff(ob: any, diff: any) {
    if (diff instanceof Object) {
        for (var i in diff) {

            var o = ob[i]
            var v = diff[i]
            if (o instanceof Object && v instanceof Object) {
                if (Object.keys(v).length == 0) {
                    delete ob[i]
                } else {
                    mergeDiff(o, v)
                }
            } else {
                if (ob instanceof Object && (v === 0)) {
                    delete ob[i]
                } else {
                    ob[i] = v
                }
            }
        }
    }
}
