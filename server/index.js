const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const PORT = process.env.PORT || 5000;
const router = require('./router');
const app = express();
const {addUser, removeUser, getUser, getUsersInRoom} = require('./users.js');
const server = http.createServer(app);
const io = socketio(server);
io.on('connection',(socket)=>{
    console.log('we have a new connection');
    socket.on('join', ({name, room}) => {
        const {error, user} = addUser({id: socket.id, name, room});
        // get out the the function because of the return statement
        // if(error) return callback(error);
        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message',{user:'admin', text: `${user.name}, has joined`});
        socket.join(user.room)
        // callback();
    });
    // when user send message
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', {user: user.name, text: message});
        callback();
    })
    // on the socket that join => if user disconnect
    socket.on('disconnect', () => {
        console.log('user had left');
    })
})
app.use(router);
server.listen(PORT, () => console.log('Server has started on port ' + PORT));
