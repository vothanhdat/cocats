const data = {
  playerid: 160,
  
  id: 100,
  listObject: {
    101: {x: 2.3,y: 0.54},
    102: {x: 3.3,y: 0.54},
    103: {x: 4.3,y: 0.54},
    104: {x: 9.3,y: 0.54},
    105: {x: 1.3,y: 1.54},
    107: {x: 3.3,y: 1.54},
    108: {x: 5.3,y: 1.54},
    109: {x: 7.3,y: 1.54},
    110: {x: 8.3,y: 1.54},
    111: {x: 6.3,y: 2.54},
    112: {x: 8.3,y: 2.54},
    113: {x: 9.3,y: 2.54},
    114: {x: 1.3,y: 3.54},
    116: {x: 3.3,y: 3.54},
    117: {x: 4.3,y: 3.54},
    118: {x: 5.3,y: 3.54},
    119: {x: 6.3,y: 3.54},
    120: {x: 7.3,y: 3.54},
    121: {x: 8.3,y: 3.54},
    122: {x: 3.3,y: 4.54},
    123: {x: 4.3,y: 4.54},
    125: {x: 2.3,y: 5.54},
    126: {x: 3.3,y: 5.54},
    127: {x: 6.3,y: 5.54},
    128: {x: 7.3,y: 5.54},
    129: {x: 8.3,y: 5.54},
    130: {x: 9.3,y: 5.54},
    131: {x: 7.3,y: 6.54},
    132: {x: 9.3,y: 6.54},
    133: {x: 1.3,y: 7.54},
    134: {x: 3.3,y: 7.54},
    135: {x: 5.3,y: 7.54},
    136: {x: 7.3,y: 7.54},
    137: {x: 8.3,y: 7.54},
    138: {x: 1.3,y: 8.54},
    139: {x: 2.3,y: 8.54},
    140: {x: 3.3,y: 8.54},
    141: {x: 5.3,y: 8.54},
    142: {x: 6.3,y: 8.54},
    143: {x: 7.3,y: 8.54},
    145: {},
    146: {},
    148: {x: 2.3,y: 2.59,speed: 0.00297},
    150: {x: 7.38,y: 9,speed: 0.00227},
    160: {x: 0.3,y: 0,speed: 0.00833}
  }
}

import * as Protobufjs from 'protobufjs'

const proto = Protobufjs.loadSync('src/datamodel/data.proto')
const root = proto.lookup('Root')

const encodedata = root.encode(data).finish() as Buffer

const decodedata = JSON.parse(JSON.stringify(root.decode(encodedata))) 
console.log(decodedata)
console.log(encodedata.byteLength,' <> ', JSON.stringify(data).length)




