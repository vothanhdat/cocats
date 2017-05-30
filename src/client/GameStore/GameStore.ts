import Differ, { mergeDiff } from 'utilities/Differ'
import * as cloneDeep from 'clone'
import {Root} from 'datamodel/modal'

console.log({Root})
const sss : any[]= [] ;

(window as any).sss = sss;
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
        socket.on('st.update',this.onupdate)
    }

    unload(){
        this.socket.off('st.update',this.onupdate)
    }



    onupdate(diff : any, effect : any){
        
        const decodediff = JSON.parse(JSON.stringify(Root.decode(new Uint8Array(diff)))) 

        sss.push(decodediff)
        
        const oldData = cloneDeep(this.data);
        mergeDiff(this.data,cloneDeep(decodediff));
        this.onUpdate && this.onUpdate(decodediff,this.data,oldData);
        this.onEffect && this.onEffect(effect);


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