import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
let socket;
const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
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
    }, [ENDPOINT,location.search]);
    useEffect(()=> {
        socket.on('message',(message)=> {
            setMessages([...messages, message]);
        })
    }, [message])
    const sendMessage = (event) => {
        // Prevent default behavior of refreshing the page 
        event.preventDefault();
        if(message) {
            // Erase messages on callback function after sending messages
            socket.emit('sendMessage', message, () => setMessage(''));
        }
        console.log(message, messages);
    }
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Input message = {message} setMessage = {setMessage} setMessages = {setMessages}/>
            </div>
        </div>
    )
}
export default Chat;