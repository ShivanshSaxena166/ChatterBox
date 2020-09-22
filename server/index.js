
const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const {addUser,removeUser,getUser,getUsesInRoom} = require('./user')
const app = express()
const PORT = process.env.PORT || 5000
const router= require ('./router')
const server = http.createServer(app)
const io = socketio(server)
io.on('connection',(socket)=>{
console.log('We have a new connection')
socket.on('join',({name,room} ,callback)=>{
const {error,user} = addUser({id:socket.id,name,room})
if(error)
return callback(error)
socket.emit('message',{user:'admin',text:`${user.name}, wecome to the room ${user.room}`})
socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name}, has joined`})
socket.join(user.room);
    console.log(name,room)
// const errorw = true;

// if(errorw)
// {
//     callback({error:'error'})

// }


})
socket.on('sendMessage',(message,callback)=>{
const user = getUser(socket.id)
io.to(user.room).emit('message',{user:user.name,text:message}) //message coming from frontend
callback()
})
socket.on('disconnect',()=>{
    console.log("user had left!!")
})
})
app.use(router)

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})