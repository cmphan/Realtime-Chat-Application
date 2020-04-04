import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
let socket;
const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';
    useEffect(() => {
        const {name, room} = queryString.parse(location.search);
        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);
        // pass an event join
        socket.emit('join', {name, room});
        // only call server socket when either endpoint or parameters are changed 
        //Pass in an disconnect event
        return() => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT,location.search])
    return (
        <h1>Chat</h1>
    )
}
export default Chat;