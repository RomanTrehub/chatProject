window.onload = ()=>{
  //  const IdInfo = document.getElementById('id');
  //  const userId = idInfo.innerHTML();
   // document.remove(IdInfo);
    const messageInput = document.getElementById('mes');
    const chatWindow = document.getElementById('chatWindow');
    const socket = io.connect(`http://localhost:8080?`);//  & передавать токен, который формируется в базе при регистрации
  //  ${userId} добавить к конекту сервера
    socket.on('connect', ()=>{
        console.log("Ok")
    })

    socket.on('msgToClients', (msg)=>{
        let li = document.createElement("li");
        li.innerHTML = msg;
        chatWindow.appendChild(li);
       // chatWindow.value += `\n ${msg}`;
    });

    document.onclick = (e)=>{
        switch (e.target.className){
            case 'send':
                socket.emit('send', messageInput.value);
        }
    }
    return false;
}