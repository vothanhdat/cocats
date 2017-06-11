import { getTypeMeta } from 'utilities/Decorator'

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

function stringfilyModel(p: any, thiskey: string = '', depth: number = 0, queue: any[] = [],count = 0): string {

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
                   .map(([key, value],i) => stringfilyModel(value, key, depth + 1, queue,i + 1))
                   .join('\n')
            + '\n}\n\n'
        }

        return result
    } else {
        if (p instanceof Array) {
            const [t, ...subtype] = p
            switch (t) {
                case 'Object':
                    return `   map<uint32, ${stringfilyModel(subtype[0], thiskey, depth + 1, queue)}> ${thiskey} = ${count};`;
                case 'Array':
                    return `   repeated ${stringfilyModel(subtype[0], thiskey, depth + 1, queue)} ${thiskey} = ${count};`;
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
                    return `   optional string ${thiskey} = ${count};`;
            }
        }
    }
}


const RootModal = getMoldel(GameModel)

console.log(stringfilyModel(RootModal))



