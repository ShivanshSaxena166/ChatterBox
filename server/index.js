
const express = require('express')
const socketio = require('socket.io')
const cors = require('cors')
const http = require('http')
const {addUser,removeUser,getUser,getUsesInRoom, getUsersInRoom} = require('./user')
const app = express()
const PORT = process.env.PORT || 5000
const router= require ('./router')
const server = http.createServer(app)
const io = socketio(server)
app.use(router)
app.use(cors())
io.on('connection',(socket)=>{
console.log('We have a new connection')
socket.on('join',({name,room} ,callback)=>{
const {error,user} = addUser({id:socket.id,name,room})
if(error)
return callback(error)
socket.emit('message',{user:'admin',text:`${user.name}, wecome to the room ${user.room}`})
socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name}, has joined`})
socket.join(user.room);

io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)})
    console.log(name,room)
// const errorw = true;

// if(errorw)
// {
//     callback({error:'error'})

// }


})
socket.on('sendMessage',(message,callback)=>{
const user = getUser(socket.id)
io.to(user.room).emit('message',{user:user.name,text:message}) 
io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)}) 
callback()
})
socket.on('disconnect',()=>{
    const user = removeUser(socket.id)
 
    console.log("user had left!!")
    if(user)
    {
        io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left.`})
        io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)}) 
    }
})
})


server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})