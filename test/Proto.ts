const data = {
  playerid: 160,
  type: "Scene",
  id: 100,
  listObject: {
    101: {type: "Tree",x: 2,y: 0},
    102: {type: "Tree",x: 3,y: 0},
    103: {type: "Tree",x: 4,y: 0},
    104: {type: "Tree",x: 9,y: 0},
    105: {type: "Stone",x: 1,y: 1},
    107: {type: "Stone",x: 3,y: 1},
    108: {type: "Stone",x: 5,y: 1},
    109: {type: "Stone",x: 7,y: 1},
    110: {type: "Stone",x: 8,y: 1},
    111: {type: "Tree",x: 6,y: 2},
    112: {type: "Tree",x: 8,y: 2},
    113: {type: "Tree",x: 9,y: 2},
    114: {type: "Stone",x: 1,y: 3},
    116: {type: "Stone",x: 3,y: 3},
    117: {type: "Tree",x: 4,y: 3},
    118: {type: "Stone",x: 5,y: 3},
    119: {type: "Tree",x: 6,y: 3},
    120: {type: "Stone",x: 7,y: 3},
    121: {type: "Stone",x: 8,y: 3},
    122: {type: "Tree",x: 3,y: 4},
    123: {type: "Tree",x: 4,y: 4},
    125: {type: "Tree",x: 2,y: 5},
    126: {type: "Stone",x: 3,y: 5},
    127: {type: "Tree",x: 6,y: 5},
    128: {type: "Stone",x: 7,y: 5},
    129: {type: "Stone",x: 8,y: 5},
    130: {type: "Tree",x: 9,y: 5},
    131: {type: "Tree",x: 7,y: 6},
    132: {type: "Tree",x: 9,y: 6},
    133: {type: "Stone",x: 1,y: 7},
    134: {type: "Stone",x: 3,y: 7},
    135: {type: "Stone",x: 5,y: 7},
    136: {type: "Stone",x: 7,y: 7},
    137: {type: "Stone",x: 8,y: 7},
    138: {type: "Stone",x: 1,y: 8},
    139: {type: "Tree",x: 2,y: 8},
    140: {type: "Stone",x: 3,y: 8},
    141: {type: "Stone",x: 5,y: 8},
    142: {type: "Tree",x: 6,y: 8},
    143: {type: "Stone",x: 7,y: 8},
    145: {type: "Tree",x: 0,y: 9},
    146: {type: "Tree",x: 3,y: 9},
    148: {type: "Zombie",x: 2,y: 2.59,speed: 0.00297},
    150: {type: "Zombie",x: 78,y: 9,speed: 0.00227},
    160: {type: "Player",x: 0,y: 0,speed: 0.00833}
  }
}

import * as Protobufjs from 'protobufjs'

const proto = Protobufjs.loadSync('src/datamodel/data.proto')
const root = proto.lookup('Root')

const encodedata = root.encode(data).finish() as Buffer

const decodedata = root.decode(encodedata)
console.log(decodedata)
console.log(encodedata.byteLength,' <> ', JSON.stringify(data).length)




