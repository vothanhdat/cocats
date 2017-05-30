import Differ, { mergeDiff } from 'utilities/Differ'
import * as cloneDeep from 'clone'
import {Root,GameObject as GObMsg} from 'datamodel/modal'
import Event from 'constant/Event'
import {splitType} from 'utilities//BufferCombine'

export default class GameStore {
    private data : any
    private socket : SocketIOClient.Socket

    onUpdate : (diff : any,newstate : any,oldstate : any,) => void
    onEffect : (effs : any) => void
    onPlayerUpdate : (data : any) => void

    constructor(){
        this.data = {}
        this.onupdate = this.onupdate.bind(this)
    }

    initSocket(socket : SocketIOClient.Socket){
        this.socket = socket;
        socket.on('message',this.onupdate)
    }

    unload(){
        this.socket.off('message',this.onupdate)
    }



    onupdate(data : ArrayBuffer){
        const [event,buffer] = splitType(data) as [number,ArrayBuffer]

        if(event == Event.update){
            const {
                listEffect,
                ...decodediff,
            } = JSON.parse(JSON.stringify(Root.decode(new Uint8Array(buffer))))

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

    getStore() : any{
        return this.data
    }

    getStorePath(path:string) : any{
        let data = this.data
        for(var e of path.split('.')){
            if(data)
                data = data[e];
        }
        return data
    }
}