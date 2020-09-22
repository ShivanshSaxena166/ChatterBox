import React,{useState,useEffect} from 'react';
import queryString from 'query-string'
import io from 'socket.io-client'
let socket;
const Chat = ({location}) =>{
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000'
    useEffect(()=>{
        const {name,room} = queryString.parse(location.search)

        socket = io(ENDPOINT)
       setName(name)
       setRoom(room)
       socket.emit('join',{name,room}, ({error})=>{
alert(error)
       } )
        console.log(location.search)
        console.log(name,room)
        console.log(socket)
    },[ENDPOINT,location.search])
    return (
        <h3>Chat</h3>
    )
}
export default Chat