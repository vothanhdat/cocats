import * as express from 'express'
import * as http from 'http'
import * as cloneDeep from 'clone'
import * as Equal from 'deep-equal'
import { Root as RootMsg } from 'datamodel/modal'
import Event from 'constant/Event'
import * as EngineIO from 'engine.io'


import { Scene } from './Object/GameScene'
import { getModel } from 'utilities/Decorator'
import Differ from 'utilities/Differ'
import { mergeType, splitType } from 'utilities//BufferCombine'




console.log(cloneDeep)

const app = express()
const server = http.createServer(app);
// const io = socketIO(server, { path: '/ws',origins: '*:*' });
const io = EngineIO.attach(server)



app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});



server.listen(process.env.port || 3000);


var scene = new Scene()
var model = getModel(scene)
var premodel = cloneDeep(model)
var listSocket: SocketIO.Socket[] = [];





setInterval(function () {

    scene.update(20);

    const df = Differ(premodel, model)
    const ef = scene.releaseEffect()
    const tr = { ...df, listEffect: ef }
    const bfsend = mergeType(
        Event.update,
        RootMsg.encode(tr).finish()
    )

    listSocket.forEach(e => e.send(bfsend))

    premodel = cloneDeep(model)

}, 1000 / 60 * 2)





const onNewContectionTask = function (socket: SocketIO.Socket) {

    var player = scene.onPlayerJoin()

    var id = player.id
    var diff = Differ({}, { playerid: id, ...model })


    socket.send(mergeType(
        Event.update,
        RootMsg.encode(diff).finish()
    ))

    // socket.emit(Event.update,RootMsg.encode(diff).finish())

    listSocket.push(socket)

    console.log('new onConnection', id)

    socket.on('message', function (data: any) {
        const [event, buffer] = splitType(data)
        switch (event) {
            case Event.move:
                const data = new Int8Array(buffer)
                player.move(data[0], data[1]);
                break;
            case Event.fire:
                player.fire();
                break;
        }

    })

    // socket.on(Event.move,player.move.bind(player))
    // socket.on(Event.fire,player.fire.bind(player))

    socket.on('close', function () {
        console.log('close Connection')
        listSocket = listSocket.filter(e => e != socket)
        scene.onPlayerQuit(id)
    });

}


io.on('connection', function (socket: any) {

    onNewContectionTask(socket)

});


console.log('server listen on ', process.env.port || 3000)


/**
 * 
import * as Protobufjs from 'protobufjs'

const proto = Protobufjs.loadSync('src/datamodel/data.proto')
const root = proto.lookup('Root')

const encodedata = root.encode(data).finish() as Buffer

const decodedata = root.decode(encodedata)
console.log(decodedata)
console.log(encodedata.byteLength,' <> ', JSON.stringify(data).length)

 */
