

const dataSize : {[key : string] : {width : number,height: number}} = {
  "/assets/bomb.png": {
    "width": 128,
    "height": 128
  },
  "/assets/boy.png": {
    "width": 128,
    "height": 128
  },
  "/assets/exploit.png": {
    "width": 128,
    "height": 128
  },
  "/assets/monster.png": {
    "width": 128,
    "height": 128
  },
  "/assets/stone.png": {
    "width": 128,
    "height": 128
  },
  "/assets/tree.png": {
    "width": 128,
    "height": 128
  }
}

export const getSize = function(e : string) {
    return dataSize[e] || {width : 1,height: 1}
}

type T = {[key : string] : string}

export const assets : T = {
  "BOMB": "/assets/bomb.png",
  "BOY": "/assets/boy.png",
  "EXPLOIT": "/assets/exploit.png",
  "MONSTER": "/assets/monster.png",
  "SCREEN_SCREEN_1": "/assets/screen/screen_1.txt",
  "STONE": "/assets/stone.png",
  "TREE": "/assets/tree.png"
}
    
    
    