import Differ, { mergeDiff } from 'utilities/Differ'
import * as cloneDeep from 'clone'
import {Root} from 'datamodel/modal'
import Event from 'constant/Event'
import {splitType} from 'utilities//BufferCombine'

export default class GameStore {
    private data : any
    private socket : SocketIOClient.Socket

    onUpdate : (diff : any,newstate : any,oldstate : any,) => void
    onEffect : (effs : any) => void

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