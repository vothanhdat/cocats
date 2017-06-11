import Differ, { mergeDiff } from '../src/utilities/Differ'
import * as Equal from 'deep-equal'
import * as cloneDeep from 'clone'



const A = {
    a: 100,
    e: 500,
    r: 500,
    sss: 455,
    ee: {
        z: 100,
        r: 100,
        ee: {
            z: 100,
            r: 100,
            ss: 77,
            aaa: {
                ggg: 0
            },
            ee: {
                z: 100,
                r: 100,
                ss: 77,
            }
        }
    },
    aaa: {
        ggg: 0
    },
    aa : [1,5,8,6,3],
    array : [
        {id : 1 , data : 5},
        {id : 2 , data : 55},
        {id : 3 , data : 77},
        {id : 4 , data : 55},
        {id : 5 , data : 156},
        {id : 6 , data : 122},
        {id : 7 , data : 1263},
        {id : 8 , data : 115,type : 'ssssss'}
    ]
}

var A_clone = cloneDeep(A)

console.log(Differ({},A,16.667))
console.log('========================')
A.array.push({id : 500,data : 400,type : 'ssssssssef sdf '})
console.log(Differ(A_clone,A,16.667))

// var diff = JSON.parse(JSON.stringify(Differ(A, B)) || '0')


// console.log(JSON.stringify(diff))
// mergeDiff(A_clone, diff)
// console.log(A_clone)
// console.log(Equal(A_clone,B_clone))

