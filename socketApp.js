const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const api = require('./db/api');
const socketsList = []; // нахожу по имени сокет, беру его id и только для этогог id генерирую событие io.sockets.connected[socketid].emit();

var userId;

io.on('connection', async (socket) =>{
  const thisSocket = socket;
  console.log('connection');
  socket.userData = await api.getUserById(socket.handshake.query.id);
  socketsList.push(socket);
  const allUsersNames = await getAllUsersNames();
  io.sockets.emit('addUser', OnlineUsersNames(), allUsersNames);
  //console.log(socket.id)
   //console.log(io.sockets);
/*    for(let mySocket in io.sockets.sockets){
     const id = mySocket.userData;
     console.log(id)
   } */
   //console.log(socketsList);

  socket.on('send', (msg) => {
    if(msg.length <= 200 && !socket.userData.mute){
      io.emit('msgToClients', socket.userData.username, msg);
    }
  });

  socket.on('ban', async (username) => {
    const allUsers = await api.getAllUsers();
/*     socketsList.forEach((socket, i, socArr)=>{
      if (socket.userData.username == username){
        if (!socket.userData.ban){
          socket.disconnect();
          thisSocket.emit('banButton', username);
          console.log(socket.id);

          return;
        }else{
          thisSocket.emit('unbanButton', username);
        }
        // разбаниваем юзера в БД
      }
    });
    api.setUserProp(username, 'ban');  */ 
    allUsers.forEach((user, i, socArr)=>{
      if (user.username == username){        
        if(!user.ban){
          thisSocket.emit('banButton', username);
          for(let i=0; i< socketsList.length; i++){
            if (socketsList[i].userData.username == username){
              socketsList[i].disconnect();
            }          
          }          
          thisSocket.emit('banButton', username);
          api.setUserProp(username, 'ban', true);           
          return;
        }else{
          thisSocket.emit('unbanButton', username);
          api.setUserProp(username, 'ban', false);           
        }
      // разбаниваем юзера в БД
      }
    });      
    
  });

  socket.on('mute', async (username)=>{
    const allUsers = await api.getAllUsers();
/*     socketsList.forEach((socket)=>{
      if (socket.userData.username == username){
        console.log(username);
        if (!socket.userData.mute){
          socket.emit('muteUser', username);
          thisSocket.emit('muteButton', username);
          socket.userData.mute = true;
          // отправка в бд
        }else{
          socket.emit('unmuteUser', username);
          thisSocket.emit('unmuteButton', username);          
          socket.userData.mute = false;
        }
        //отправкка в бд
      }
    }) */
    //api.setUserProp(username, 'mute');
    allUsers.forEach((user, i, socArr)=>{
      if (user.username == username){        
        if(!user.mute){
          thisSocket.emit('muteButton', username);
          for(let i=0; i< socketsList.length; i++){
            if (socketsList[i].userData.username == username){
             // if(socketsList[i].userData.mute){}
              socketsList[i].userData.mute = true;
              socketsList[i].emit('muteUser', username);

              //socketsList[i]
            }          
          }          
          api.setUserProp(username, 'mute', true);           
          return;
        }else{
          thisSocket.emit('unmuteButton', username);
          for(let i=0; i< socketsList.length; i++){
            if (socketsList[i].userData.username == username){
              socketsList[i].userData.mute = false;
              socketsList[i].emit('unmuteUser', username);
            }          
          }            
          api.setUserProp(username, 'mute', false);           
        }
      // разбаниваем юзера в БД
      }
    });  

  })

  socket.on('disconnect', ()=>{
    console.log(socket.userData.username);
    io.emit('deleteUser', socket.userData.username);     
    socketsList.forEach((socket, i, sockArr)=>{
      if(thisSocket.id === socket.id){       
        sockArr.splice(i,1);
      }
    })
  })
});

async function getAllUsersNames(){
  let usersArr = [];
  let usersOfline = await api.getAllUsers();
  usersOfline.forEach((user)=>{
    usersArr.push(user.username)
  })
  return usersArr;
}


function OnlineUsersNames(){
  let usersArr = [];
  socketsList.forEach((socket)=>{
    usersArr.push(socket.userData.username)
  });
  return usersArr;
}



/* AllUsersNames().then( (data) => {
  return data;
}); */

http.listen(8080, function () {
  console.log('connection on port 8080');
});
