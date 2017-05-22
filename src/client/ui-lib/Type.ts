
declare type FunctionAny<T> = (...args : any[]) => T
declare type NewAny<T> = new(...args : any[]) => T
declare type Option = [string|number,string|number,string|number,string|number,number,number]
declare type OptionFunc = [FunctionAny<number>,FunctionAny<number>,FunctionAny<number>,FunctionAny<number>,number,number]
declare type ChildElement<T> = {[key : string] : T}
declare type IsType<T> = (e : any) => e is T