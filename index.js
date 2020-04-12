const express = require('express');
const socket = require('socket.io');
const app = express();
const server = app.listen(4100, ()=>{
    console.log('Listening to request on port 4100')
});

//static files
app.use(express.static('public'));

//socket set up
const io = socket(server);


io.on('connection', (socket) => {
    
    console.log('Made socket connection to the socket', socket.id);
    
    //Handle the chat event
    //this socket  refer to a particular between the server in the client sending the message
    socket.on('chat', (data) => {
        //io.sockets is referering all the socket that we connected
        io.sockets.emit('chat', data);
    });

    //handle the typing event
    //this socket  refer to a particular between the server in the client sending the message 
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});



 