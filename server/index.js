
const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const app = express()
const PORT = process.env.PORT || 5000
const router= require ('./router')
const server = http.createServer(app)
const io = socketio(server)
io.on('connection',(socket)=>{
console.log('We have a new connection')
socket.on('join',({name,room} ,callback)=>{
console.log(name,room)
const errorw = true;

if(errorw)
{
    callback({error:'error'})

}


})
socket.on('disconnect',()=>{
    console.log("user had left!!")
})
})
app.use(router)

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})