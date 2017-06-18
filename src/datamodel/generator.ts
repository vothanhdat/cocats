import { getTypeMeta } from 'utilities/Decorator'
import {argv} from 'yargs'
import GameModel, * as GameType from 'server/Object'


var allType = new Map()


for (var i in GameType) {
    var t = (GameType as any)[i] as any
    allType.set(t, { key: i, extender: [] })
}

for (var i in GameType) {
    var t = (GameType as any)[i] as any
    if (allType.has(t.__proto__))
        allType.get(t.__proto__).extender.push(t)
}

function getMoldel(o: any) {
    var mos = getTypeMeta(o)
    var mo: any = {
        __name__: o.name
    }
    if (!mos) {
        return o && o.name
    }

    if (allType.get(o).extender) {
        mos = [].concat(mos, ...allType.get(o).extender.map(getTypeMeta))
    }

    for (var { type, key, subtype } of mos) {
        if (subtype && subtype.length) {
            mo[key] = [getMoldel(type), ...subtype.map(getMoldel)]
            // mo[key] = [getMoldel(type),...subtype.map(getMoldel)]
        } else {
            mo[key] = getMoldel(type)
        }
    }
    return mo
}

function getEnum(o : any){
    return Object.keys(o).reduce((e,f,i) => {
        e[f] = i+1;
        return e;
    },{} as any)
}

function modelToProtoBuf(p: any, thiskey: string = '', depth: number = 0, queue: any[] = [],count = 0): string {

    if (depth === 0) {
        queue.push({
            ...p,
            __name__ : 'Root'
        });
        var result = 'syntax = "proto3";\n\n';
        var setType = new Set<string>([]);

        while (queue.length > 0) {
            var { __name__, ...property } = queue.shift()
            if(setType.has(__name__))
                continue;
            else 
                setType.add(__name__);
            
            result += `message ${__name__} {\n`
            + Object.entries(property)
                   .map(([key, value],i) => modelToProtoBuf(value, key, depth + 1, queue,i + 1))
                   .join('\n')
            + '\n}\n\n'
        }

        return result
    } else {
        if (p instanceof Array) {
            const [t, ...subtype] = p
            switch (t) {
                case 'Object':
                    return `   map<uint32, ${modelToProtoBuf(subtype[0], thiskey, depth + 1, queue)}> ${thiskey} = ${count};`;
                case 'Array':
                    return `   repeated ${modelToProtoBuf(subtype[0], thiskey, depth + 1, queue)} ${thiskey} = ${count};`;
            }
        } else if (p instanceof Object) {
             queue.push(p);
            return p.__name__
        } else if (typeof p == 'string') {
            switch (p) {
                case 'Number':
                    if(thiskey.includes('id'))
                        return `   optional uint32 ${thiskey} = ${count};`;
                    else
                        return `   optional float ${thiskey} = ${count};`;
                case 'String':
                    if(thiskey == 'type')
                        return `   optional Type ${thiskey} = ${count};`;
                    else
                        return `   optional string ${thiskey} = ${count};`;
            }
        }
    }
}

function enumToPtotoBuf(p : any){
    return `enum Type {\n` 
        + Object.keys(p).map((e,i) => `    ${e} = ${i + 1};`).join('\n')
        + '\n}'
}

function enumToType(p : any){
    return 'declare namespace GameStore {\n'
        + `    enum Type {\n` 
        + Object.keys(p).map((e,i) => `        ${e} = ${i + 1},`).join('\n')
        + '\n    }\n'
        + '}\n'
}

function modelToType(p: any, thiskey: string = '', isRoot: boolean = true, queue: any[] = []): string {

    if (isRoot) {
        queue.push({
            ...p,
            __name__ : 'Root'
        });
        var result = '';
        var setType = new Set<string>([]);

        while (queue.length > 0) {
            var { __name__, ...property } = queue.shift()
            if(setType.has(__name__))
                continue;
            else 
                setType.add(__name__);
            
            result += `\ninterface ${__name__} {\n`
            + Object.entries(property)
                   .map(([key, value],i) => modelToType(value, key, false, queue))
                   .map(e => '\t' + e).join('\n')
            + '\n}\n\n'
        }

        return `declare namespace GameStore {\n${result.replace(/\n/g,'\n\t')}\n}`
    } else {
        if (p instanceof Array) {
            const [t, ...subtype] = p
            switch (t) {
                case 'Object':
                    return `${thiskey}? : {[k : string] : ${modelToType(subtype[0], thiskey, false, queue)}} `;
                case 'Array':
                    return `${thiskey}? : ${modelToType(subtype[0], thiskey, false, queue)}[] ;`;
            }
        } else if (p instanceof Object) {
             queue.push(p);
            return p.__name__
        } else if (typeof p == 'string') {
            switch (p) {
                case 'Number':
                    if(thiskey.includes('id'))
                        return `${thiskey}? : number ;`;
                    else
                        return `${thiskey}? : number ;`;
                case 'String':
                    return `${thiskey}? : string ;`;
            }
        }
    }
}


const RootModal = getMoldel(GameModel)
const TypeEnum = getEnum(GameType)

if(argv.pb){
    console.log(modelToProtoBuf(RootModal))
    console.log(enumToPtotoBuf(TypeEnum))
}else if(argv.ts){
    console.log(modelToType(RootModal))
    console.log(enumToType(TypeEnum))
    
}else{
    
}




