import * as express from 'express'
import * as http from 'http'
import * as cloneDeep from 'clone'
import * as Equal from 'deep-equal'
import * as EngineIO from 'engine.io'
import * as compression from 'compression'

import { Root as RootMsg, GameObjectBase as GameObjectMsg } from 'datamodel/modal'
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
        // maxAge: 86400000 * 365,
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
var model = getModel(scene)
var premodel = cloneDeep(model)
var listSocket: { player: Player, socket: any }[] = [];


var counter = 0;



setInterval(function () {

    scene.update(16.67);

    if (counter % 3 == 0) {

        const df = Differ(premodel, model)
        const ef = scene.releaseEffect()
        const tr = { ...df, listEffect: ef }
        const bfsend = mergeType(
            Event.update,
            RootMsg.encode(tr).finish()
        )

        for (let { socket } of listSocket)
            socket.send(bfsend)

        premodel = cloneDeep(model)
        

    } else {

        for (let { player, socket } of listSocket) {

            const preplayer = premodel.listObject.find((e: any) => player.id == e.id)

            if (!player || !preplayer)
                continue;

            const df = Differ(preplayer, player);

            Object.keys(df).length > 0 && socket.send(mergeType(
                Event.updateplayer,
                GameObjectMsg.encode(df).finish()
            ));

            Object.assign(preplayer, player)
        }
    }

    counter++;


}, 1000 / 60)





const onNewContectionTask = function (socket: EngineIO.Socket) {

    var player = scene.onPlayerJoin()

    var id = player.id
    var diff = Differ({}, { playerid: id, ...model })


    socket.send(mergeType(
        Event.update,
        RootMsg.encode(diff).finish()
    ))

    // socket.emit(Event.update,RootMsg.encode(diff).finish())

    listSocket.push({ player: getModel(player), socket })

    console.log('new onConnection', id)

    socket.on('message', function (data: Buffer) {
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
        listSocket = listSocket.filter(e => e.socket != socket)
        scene.onPlayerQuit(id)
    });

}


io.on('connection', function (socket) {

    onNewContectionTask(socket)

});


console.log('server listen on ', process.env.port || process.env.PORT || 3000)
