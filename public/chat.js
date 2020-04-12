//make conection to the client & server
const socket = io.connect('http://localhost:4100');

//query the DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback =document.getElementById('feedback');

//Emit events
btn.addEventListener('click', () => {
    //emiting the event || message
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

//Listen for an chat events
socket.on('chat', (data) => {
    
    //clear the typing when it send the messages    
    feedback.innerHTML = '';

    //output the chat message into the windows
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

//Emit events
message.addEventListener('keypress', () => {
    //emiting the event || typing
    socket.emit('typing', handle.value);
});
//Listening for an typing keypress event
socket.on('typing', (data) => {
    feedback.innerHTML =  '<p><em>' + data + ' is typing... </em></p>';
});