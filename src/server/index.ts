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




/**
        socket.on('st.update',this.onupdate)
        socket.on('st.newdata',this.onnewdata)
 */


server.listen(process.env.port || 3000);

var screen = new Scene()
var model = getModel(screen)
var listSocket : SocketIO.Socket[] = [];

setInterval(function () {
    var ob = cloneDeep(model)
    screen.update(20);
    var df = Differ(ob, model)
    listSocket.forEach(e => e.emit('st.update',df))
}, 40)





io.on('connection', function (socket) {
    
    socket.emit('st.update',Differ({}, model))
    
    listSocket.push(socket)

    console.log('new onConnection')
    
    socket.on('disconnect', function () {
        console.log('close Connection')
        listSocket = listSocket.filter(e => e != socket)
    });



});


console.log('server listen on ', process.env.port || 3000)

