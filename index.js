//3116003a643c081cd539f01054c73b01
//7e9c4c3a31a8966f2e1b85c1103c3a23

var http = require("https");
var express=require('express');
var socket=require('socket.io'); 

var app = express();
var server = app.listen(4000,function(){
	console.log("listen on port 4000");
});

app.use(express.static('public'));
//set up search API
var options = {
  "method": "GET",
  "hostname": "api.kkbox.com",
  "port": null,
  "path": "/v1.1/search?q=Mayday&type=track&territory=TW&offset=0&limit=50",
  "headers": {
    "accept": "application/json",
    "authorization": "8G3DYziIg1bCzrsDW6FfKQ=="
  }
};
var searcher=function () {
	console.log('google master');
}


//setup socket

var io=socket(server);
io.on('connection',function(socket){
	console.log("socket connection",socket.id);
	searcher();
    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });
    //Handle Search Music
    socket.on('search', function(data){
        // console.log(data);

        io.sockets.emit('search', data);
    });    

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });


})