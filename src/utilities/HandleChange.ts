




export class HandleChangeMap<T extends Object> {

    _context : any
    _handleAdd : (e : T) => void
    _handleChange : (e : T) => void
    _handleRemove : (e : T) => void
    constructor(context : any,handle : { handleAdd : (e : T) => void, handleChange : (e : T) => void, handleRemove : (e : T) => void  }){
            this._context = context
            this._handleAdd = handle.handleAdd
            this._handleChange = handle.handleChange
            this._handleRemove = handle.handleRemove
    }

    onDiff(diff: {[k:number] : T},newState : {[k:number] : T},oldState : {[k:number] : T}){
        for(var i in diff){
            const i_ = parseInt(i);
            if(!diff[i_] || !newState[i_]){
                console.log('on Remove')
                oldState && this._handleRemove.call(this._context,{id : i_,...oldState[i_] as {}})
            }else if(oldState && oldState[i_]){
                this._handleChange.call(this._context,{id : i_,...diff[i_] as {}})
            }else{
                console.log('on Add')
                this._handleAdd.call(this._context,{id : i_,...diff[i_] as {}})
            }
        }
    }
}