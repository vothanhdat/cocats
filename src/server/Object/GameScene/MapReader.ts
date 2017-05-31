import * as fs from 'fs'
import * as path from 'path'
import * as GameObject from '../GameObject'


declare global{
    interface MapReaderData{
        object : string[][],
        map : string[][],
    }
    interface MapData{
        object : GameObject.GameObjectBase[],
        map : GameObject.GameObjectBase[][][],
    }
}


export default class MapReader {
    loadTask: Promise<MapData>
    mapUnit : {[key:string]:any}
    constructor(file: string,mapUnit : {[key:string]:any}) {
        this.mapUnit = mapUnit
        

        this.loadTask = new Promise<string>((rs,rj) =>  fs.readFile(file,'utf8',(e,d) => e ? rj(e) : rs(d)))
            .then(e => this.parseMap(e))
            .then(e => ({
                object : this.generateOb(e,mapUnit),
                map : e.map.map(e => e.map(e => []))
            }))
            .catch(e => console.error(e))


    }

    onLoadDone(task : (data : MapData) => void){
        this.loadTask.then(task)
    }

    onLoadErrer(onerror : (e : Error) => void){
        this.loadTask.catch(onerror)
    }

    parseMap(text: string): MapReaderData{
        let size: string[]
        let mapindex: { [key: string]: string } = {}
        let map: string[][] = []
        let object: string[][] = []
        let isblock = false
        let blockdata : string[][] ,blockname : string

        for (let line of text.split('\n')) {
            const [key, ...token] = line.split(' ')
            if (key == 'size')
                size = [token[0], token[1]];
            else if (key == 'mapindex')
                mapindex[token[0]] = token[1].trim();
            else if (key == 'start'){
                isblock = true
                blockname = token[0]
                if(token[0] == 'map')
                    blockdata = map
            }else if(key == 'end'){
                isblock = true
                blockdata =  null;
                blockname = ''
            }else if(isblock){
                if(blockname == 'map'){
                    blockdata.push(line.trim().split(' ').map(e => mapindex[e]))
                }
            }
        }
        return {
            object : map,
            map : map,
        }
    }

    generateOb(data : MapReaderData , mapUnit : {[key:string]:any}){
        let allObject =  data.object.map((line,i) => line.map((e,j) => e && mapUnit[e] && new mapUnit[e]({x : j,y : i})))
        // console.log(allObject)
        return []
            .concat(...allObject)
            .filter(e => e)
    }
}