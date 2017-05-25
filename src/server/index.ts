import * as express from 'express'
import * as http from 'http'
import * as socketIO from 'socket.io'
import * as cloneDeep from 'clone-deep'
import * as Equal from 'deep-equal'



console.log(cloneDeep)

const app = express()
const server = http.createServer(app);
const io = socketIO(server, { path: '/ws' });


import { Screen } from './GameScreen/index'
import { getModel } from '../utilities/Decorator'
import Differ, { mergeDiff } from '../utilities/Differ'



app.get('/', function (req, res) {
    res.send('Hello World!')
})




io.on('connection', function (socket) {

});

server.listen(process.env.port || 3000);

var screen = new Screen()


/**
 * 
var A_clone = cloneDeep(A)
var B_clone = cloneDeep(B)
var diff = JSON.parse(JSON.stringify(Differ(A, B)) || '0')

console.log(JSON.stringify(diff))
mergeDiff(A_clone, diff)
console.log(A_clone)
console.log(Equal(A_clone,B_clone))
 */


setInterval(function () {
    var ob = cloneDeep(getModel(screen))
    screen.update(20);
    // var df = JSON.parse(JSON.stringify(Differ(ob, mo)) || '0')
    // var newOB = cloneDeep(ob)
    // mergeDiff(newOB, df)
    // console.log(Equal(newOB,mo))
    // console.log(df)
}, 20)

setTimeout(function () {
    var mo = getModel(screen)

    console.log(mo)
}, 400)



console.log('server listen on ', process.env.port || 3000)

