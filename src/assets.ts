


function assetInfoType<T>(e : T) : (T &  {[key : string] : {width : number,height : number}}) {
  return e as (T &  {[key : string] : {width : number,height : number}})
}

function asseType<T>(e : T) : (T &   {[key : string] : string} ) {
  return e as (T &   {[key : string] : string} )
}

export const assetInfo = assetInfoType({
  BLACK: {width: 1,height: 1},
  BOMB: {width: 128,height: 128},
  BOY: {width: 128,height: 128},
  EXPLOIT_5_4: {width: 480,height: 384},
  EXPLOIT: {width: 128,height: 128},
  MONSTER: {width: 128,height: 128},
  STONE: {width: 128,height: 128},
  TREE: {width: 128,height: 128},
  WHITE: {width: 1,height: 1},
})



export const assets = asseType({
  BLACK : "/assets/black.png",
  BOMB : "/assets/bomb.png",
  BOY : "/assets/boy.png",
  EXPLOIT_5_4 : "/assets/exploit_5_4.png",
  EXPLOIT : "/assets/exploit.png",
  MONSTER : "/assets/monster.png",
  SCREEN_SCREEN_1 : "/assets/screen/screen_1.txt",
  STONE : "/assets/stone.png",
  TREE : "/assets/tree.png",
  WHITE : "/assets/white.png",
})
