




export class HandleChangeArray {
    _context : any
    _handleAdd : (e : any) => void
    _handleChange : (e : any) => void
    _handleRemove : (e : any) => void
    constructor(context : any,handle : { handleAdd : any, handleChange : any, handleRemove : any  }){
            this._context = context
            this._handleAdd = handle.handleAdd
            this._handleChange = handle.handleChange
            this._handleRemove = handle.handleRemove
    }

    onDiff(diff: any,newState : any,oldState : any){
        for(var i in diff){
            if(diff[i] == 0)
                this._handleRemove.call(this._context,oldState && oldState[i])
            else if(oldState && oldState[i]){
                this._handleChange.call(this._context,diff[i])
            }else{
                this._handleAdd.call(this._context,diff[i])
            }
        }
    }
}