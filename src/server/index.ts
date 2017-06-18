import * as express from 'express'
import * as http from 'http'
import * as cloneDeep from 'clone'
import * as Equal from 'deep-equal'
import * as EngineIO from 'engine.io'
import * as compression from 'compression'

import { Root as RootMsg } from 'datamodel/modal'
import Event from 'constant/Event'
import { getModel } from 'utilities/Decorator'
import Differ from 'utilities/Differ'
import { mergeType, splitType } from 'utilities/BufferCombine'

import { Scene, Player } from './Object'





const app = express()
const server = http.createServer(app);
const io = EngineIO.attach(server)

if (process.env.NODE_ENV == 'production') {

    app.use(compression())
    app.use(express.static('build/static/', {
        maxAge: 86400000 * 365,
    }))
} else {
    app.all('/', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });
}





server.listen(process.env.port || process.env.PORT || 3000);


var scene = new Scene()
var model: GameStore.Root = getModel(scene)
var premodel = cloneDeep(model)
var listSocket: { player: Player, socket: EngineIO.Socket }[] = [];


var counter = 0;
var timeperFrame = 1000 / 60
var lastTime = Date.now()

setInterval(function () {
    var deltaTime = Date.now() - lastTime;
    lastTime = Date.now()
    scene.update(deltaTime / 1000);

    const df = Differ(premodel, model, deltaTime / 1000)
    const ef = scene.releaseEffect()
    const tr = { ...df, listEffect: ef }
    const bfsend = mergeType(
        Event.update,
        RootMsg.encode(RootMsg.fromObject(tr)).finish()
    )
    if (Object.keys(df).length > 0 || ef.length > 0)
        for (let { socket } of listSocket)
            socket.send(bfsend)

    premodel = cloneDeep(model)

    counter++;


}, timeperFrame)


io.on('connection', function (socket: EngineIO.Socket) {

    var player = scene.onPlayerJoin()

    var id = player.id
    var diff = Differ({}, { playerid: id, ...model }, 0)


    socket.send(mergeType(
        Event.update,
        RootMsg.encode(RootMsg.fromObject(diff)).finish()
    ))

    listSocket.push({ player: getModel(player), socket })

    console.log('new onConnection', id)

    socket.on('message', player.clientEvent.bind(player))

    socket.on('close', function () {
        console.log(this instanceof EngineIO.Socket)
        listSocket = listSocket.filter(e => e.socket != socket)
        scene.onPlayerQuit(id)
    });

});


console.log('server listen on ', process.env.port || process.env.PORT || 3000)
