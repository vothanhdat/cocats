import * as express from 'express'
import * as http from 'http'
import * as socketIO from 'socket.io'
import * as cloneDeep from 'clone'
import * as Equal from 'deep-equal'
import {Root as RootMsg} from 'datamodel/modal'


import { Scene } from './Object/GameScene'
import { getModel } from 'utilities/Decorator'
import Differ from 'utilities/Differ'




console.log(cloneDeep)

const app = express()
const server = http.createServer(app);
const io = socketIO(server, { path: '/ws',origins: '*:*' });



app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/', function (req, res) {
    res.send('Hello World!')
})


server.listen(process.env.port || 3000);
var scene = new Scene()
var model = getModel(scene)
var premodel = cloneDeep(model)
var listSocket : SocketIO.Socket[] = [];





setInterval(function () {
    
    scene.update(20);

    var df = Differ(premodel, model)
    var ef = scene.releaseEffect()
    
    listSocket.forEach(e => e.emit(
        'st.update',
        RootMsg.encode(df).finish(),
        ef
    ))

    premodel = cloneDeep(model)

}, 1000 / 60 * 2)





const onNewContectionTask = function(socket : SocketIO.Socket){

    var player = scene.onPlayerJoin()

    var id = player.id
    var diff = Differ({}, {playerid : id,...model})
    socket.emit('st.update',RootMsg.encode(diff).finish())

    listSocket.push(socket)

    console.log('new onConnection',id)
    
    socket.on('move',player.move.bind(player))
    socket.on('fire',player.fire.bind(player))

    socket.on('disconnect', function () {
        console.log('close Connection')
        listSocket = listSocket.filter(e => e != socket)
        scene.onPlayerQuit(id)
    });

}


io.on('connection', function (socket) {

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
