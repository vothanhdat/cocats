interface NodeModule {
    hot? :{
        /**
         * Accept code updates for the specified dependencies. 
         * The callback is called when dependencies were replaced.
         */
        accept(dependencies: string[], callback: (...dependencies : any[]) => void) : void

        /**
         * Accept code updates for the specified dependencies. 
         * The callback is called when dependencies were replaced.
         */
        accept(dependency: string, callback: () => void) : void


        /**
         * Accept code updates for this module without notification of parents. 
         * This should only be used if the module doesn’t export anything. 
         * The errHandler can be used to handle errors that occur while loading the updated module.
         */
        accept(e : [Error]) : void

        /**
         * Do not accept updates for the specified dependencies. 
         * If any dependencies is updated, the code update fails with code "decline".
         */
        decline(dependencies: string[]): void

        /**
         * Do not accept updates for the specified dependencies. 
         * If any dependencies is updated, the code update fails with code "decline".
         */
        decline(dependency: string): void

        /**
         * Flag the current module as not update-able. 
         * If updated the update code would fail with code "decline".
         */
        decline() : void

    }
}
declare interface Array<T> {
    remove(elem: T): void;
}
declare  interface Point {
    x : number
    y : number
}
