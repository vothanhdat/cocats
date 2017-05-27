import Differ, { mergeDiff } from 'utilities/Differ'
import * as cloneDeep from 'clone'

export default class GameStore {
    private data : any
    private socket : SocketIOClient.Socket

    onUpdate : (diff : any,newstate : any,oldstate : any,) => void

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



    onupdate(diff : any){
        const oldData = cloneDeep(this.data);
        mergeDiff(this.data,cloneDeep(diff));
        this.onUpdate && this.onUpdate(diff,this.data,oldData);
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