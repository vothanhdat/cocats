import Differ, { mergeDiff } from 'utilities/Differ'
import * as cloneDeep from 'clone'

console.log(cloneDeep)

export default class GameStore {
    private data : any
    private socket : SocketIOClient.Socket

    constructor(){
        this.data = {}
        this.onnewdata = this.onnewdata.bind(this)
        this.onupdate = this.onupdate.bind(this)
    }

    initSocket(socket : SocketIOClient.Socket){
        this.socket = socket;
        socket.on('st.update',this.onupdate)
        socket.on('st.newdata',this.onnewdata)
    }

    unload(){
        this.socket.on('st.update',this.onupdate)
        this.socket.on('st.newdata',this.onnewdata)
    }

    onnewdata(data : any){
         Object.assign(this.data,cloneDeep(data))
    }

    onupdate(diff : any){
        mergeDiff(this.data,cloneDeep(diff))
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