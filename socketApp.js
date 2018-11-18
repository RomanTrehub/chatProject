const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', function (socket){
   console.log('connection');

  socket.on('send', function (msg) {
    if(msg.length <= 200){
      io.sockets.emit('msgToClients', msg);
    }
  });

});

http.listen(8080, function () {
  console.log('listening on *:8080');
});
