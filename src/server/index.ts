import * as express from 'express'
import * as http from 'http'
import * as socketIO from 'socket.io'
import * as cloneDeep from 'clone'
import * as Equal from 'deep-equal'


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
var taskInLoop : (() => void)[] = []
var scene = new Scene()
var model = getModel(scene)
var listSocket : SocketIO.Socket[] = [];
var runTask = function(task : () => void){
    taskInLoop.push(task)
}




setInterval(function () {
    var ob = cloneDeep(model)
    
    while(taskInLoop.length > 0)
        taskInLoop.pop()();
    scene.update(20);

    var df = Differ(ob, model)
    
    listSocket.forEach(e => e.emit('st.update',df))

}, 16.7777777)





const onNewContectionTask = function(socket : SocketIO.Socket){

    var player = scene.onPlayerJoin()

    var id = player.id
    var diff = Differ({}, {playerid : id,...model})
    socket.emit('st.update',diff)

    listSocket.push(socket)

    console.log('new onConnection',id)
    
    socket.on('move',function(data : string){
        const [dx,dy] = data.split('_')
        player.dx = parseInt(dx)
        player.dy = parseInt(dy)
        console.log(player.dx,player.dy)
    })


    socket.on('disconnect', function () {
        console.log('close Connection')
        listSocket = listSocket.filter(e => e != socket)
        scene.onPlayerQuit(id)
    });

}


io.on('connection', function (socket) {

    runTask(onNewContectionTask.bind(null,socket))

});


console.log('server listen on ', process.env.port || 3000)

