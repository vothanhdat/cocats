
export function addInRange(start : number,end : number,value : number) : number {
    if(start < end){
        return Math.min(Math.max(start,start + Math.abs(value)),end)
    }else{
        return Math.min(Math.max(end,start - Math.abs(value)),start)
    }
}

export function numIsEqual(num1 : number, num2 : number,approximation : number) : boolean {
    return Math.abs(num1 - num2) < approximation
}
