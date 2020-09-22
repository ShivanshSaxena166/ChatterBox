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
        console.log(location.search)
        console.log(name,room)
        console.log(socket)
    })
    return (
        <h3>Chat</h3>
    )
}
export default Chat