const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const api = require('./db/api');
const socketsList = []; // нахожу по имени сокет, беру его id и только для этогог id генерирую событие io.sockets.connected[socketid].emit();

var userId;

io.on('connection', async (socket) =>{
  console.log('connection');
  socket.userData = await api.getUserById(socket.handshake.query.id);
  io.sockets.emit('addUser', socket.userData.username);
  //console.log(socket.id)
   //console.log(io.sockets);
/*    for(let mySocket in io.sockets.sockets){
     const id = mySocket.userData;
     console.log(id)
   } */
   socketsList.push(socket);
   //console.log(socketsList);

  socket.on('send', (msg) => {
    if(msg.length <= 200){
      io.sockets.emit('msgToClients', socket.userData.username, msg);
    }
  });

  socket.on('ban', (username) => {
    socketsList.forEach((socket, i, socArr)=>{
      if (socket.userData.username == username){
        if (socket.userData.ban){
          io.sockets.connected[socket.id].disconnect(true);
          io.sockets.emit('deleteUser', username);
          socArr.splice(i,1);
          // бан юзера в бд
          return;
        }
        // разбаниваем юзера в БД
      }
    })
  });

  socket.on('mute', ()=>{
    socketsList.forEach((socket)=>{
      if (socket.userData.username == username){
        if (!socket.userData.mute){
          io.sockets.connected[socket.id].emit('muteUser');
          socket.userData.mute = true;
          // отправка в бд
        }
        io.sockets.connected[socket.id].emit('unmuteUser');
        socket.userData.mute = false;
        // отправкка в бд
      }
    })
  })
});

http.listen(8080, function () {
  console.log('connection on port 8080');
});
