import Differ, { mergeDiff } from 'utilities/Differ'
import * as cloneDeep from 'clone'
import {Root,
    GameObjectBase as GObMsg,
} from 'datamodel/modal'
import Event from 'constant/Event'
import {splitType} from 'utilities//BufferCombine'
import * as EngineIOClient from 'engine.io-client'

let totalTransfer = 0;

export default class GameStore {
    private data : GameStore.Root
    private socket : EngineIOClient.Socket

    onUpdate : (diff : GameStore.Root,newstate : GameStore.Root,oldstate : GameStore.Root) => void
    onEffect : (effs : GameStore.EffectBase[]) => void
    onPlayerUpdate : (data : GameStore.GameObjectBase) => void

    constructor(){
        this.data = {}
        this.onupdate = this.onupdate.bind(this)
    }

    initSocket(socket : EngineIOClient.Socket){
        this.socket = socket;
        socket.on('message',this.onupdate)
    }

    unload(){
        this.socket.off('message',this.onupdate)
    }



    onupdate(data : ArrayBuffer){
        const [event,buffer] = splitType(data as any)

        const byteLength = data.byteLength;
        totalTransfer += byteLength;
        setTimeout((byteLength : number) => totalTransfer-= byteLength,1000,byteLength);

        console.log('transferSpeed : ',totalTransfer)

        if(event == Event.update){
            const {
                listEffect,
                ...decodediff,
            } = Root.decode(new Uint8Array(buffer)).toObject()

            const oldData = cloneDeep(this.data);

            mergeDiff(this.data,cloneDeep(decodediff));

            this.onUpdate 
                && Object.values(decodediff).length > 0 
                && this.onUpdate(decodediff,this.data,oldData);

            this.onEffect 
                && listEffect 
                && this.onEffect(listEffect);
        }else if(event == Event.updateplayer){
            
            const playerid = this.data.playerid
            const playerData = JSON.parse(JSON.stringify(GObMsg.decode(new Uint8Array(buffer))))
            const decodediff = {listObject : { [playerid] : playerData }}
            const oldData = cloneDeep(this.data);
            mergeDiff(this.data,decodediff);
            this.onUpdate 
                && playerData
                && this.onUpdate(decodediff,this.data,oldData);       
            };


    }

    getStore() : GameStore.Root {
        return this.data
    }

    getStorePath(path:string) : any{
        let data = this.data as any
        for(var e of path.split('.')){
            if(data)
                data = data[e];
        }
        return data
    }
}