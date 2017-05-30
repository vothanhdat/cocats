

declare module "clone" {
    function placeholder<T>(a : T): T;
    module placeholder {}
    export = placeholder;
}

declare module "deep-equal" {
    function equal(a : any,b: any): boolean;
    module equal {}
    export = equal;
}

declare module "engine.io" {
    function equal(a : any,b: any): boolean;
    module equal {
        var attach : any
    }
    export = equal;
}