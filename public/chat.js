//Make connection

var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    songname = document.getElementById('songname'),
    findmusic = document.getElementById('findmusic');

// Emit events
btn.addEventListener('click', function(){
  socket.emit('chat', {
      	message: message.value,
      	handle: handle.value
  });
  message.value = "";
});

findmusic.addEventListener('click', function(){
  socket.emit('search', {
  	  	message: songname.value,
      	handle: handle.value
  });
  songname.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

// Listen for events
socket.on('chat', function(data){
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    
});

socket.on('search', function(data){
    //output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    output.innerHTML += '<iframe src="https://widget.kkbox.com/v1/?id=Pa0NfMzqWKr80xUY_N&type=song&terr=TW&lang=JA">';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});