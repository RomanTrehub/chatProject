const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const api = require('./db/api');

var userId;

io.on('connection', async (socket) =>{
  console.log('connection');
  socket.userData = await api.getUserById(socket.handshake.query.id);
  //console.log(socket.id)
   //console.log(io.sockets);
   for(let mySocket in io.sockets.sockets){
     const id = mySocket.userData;
     console.log(id)
   }

  socket.on('send', function (msg) {
    if(msg.length <= 200){
      io.sockets.emit('msgToClients', socket.userData.username, msg);
    }
  });

});

http.listen(8080, function () {
  console.log('connection on port 8080');
});
