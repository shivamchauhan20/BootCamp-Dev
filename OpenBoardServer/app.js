const express = require("express");
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("color",function(color){
    socket.broadcast.emit("colorchange",color);
  })
  socket.on("md",function(point){
    socket.broadcast.emit("onmd",point);
  })
  socket.on("mm",function(point){
    socket.broadcast.emit("onmm",point);
  })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});