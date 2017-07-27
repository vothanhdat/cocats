
declare module 'util' {
  type Callback<T> = (e : any, d :T) => void


  function promisify<D,E,F,T>(f: (
      ((e0: D,e1: E,e2: F, cb: Callback<T>) => void )
      |((e0: D,e1: E,cb: Callback<T>) => void )
      |((e0: D,cb: Callback<T>) => void )
      |((cb: Callback<T>) => void) 
  )): (e0?: D,e1?: E,e2?: F) => Promise<T>;

//   function promisify<T>(f: (cb: Callback<T>) => void): () => Promise<T>;
//   function promisify<A1, T>(f: (a: A1, cb: Callback<T>) => void): (a: A1) =>
//       Promise<T>;
//   function promisify<A1, A2, T>(
//       f: (a: A1, a2: A2, cb: Callback<T>) => void): (a: A1, a2: A2) =>
//       Promise<T>;
//   function promisify<A1, A2, A3, T>(
//       f: (a: A1, a2: A2, a3: A3, cb: Callback<T>) =>
//           void): (a: A1, a2: A2, a3: A3) => Promise<T>;


}

// import * as fs from 'fs'
// import * as util from 'util'

// var  a = util.promisify(fs.readFile)

// var b = a('url','dddd')
