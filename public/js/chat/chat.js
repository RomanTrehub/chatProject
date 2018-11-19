window.onload = ()=>{
    const idInfo = document.getElementById('id');
    const userId = idInfo.innerHTML;
    document.body.removeChild(idInfo);
    const messageInput = document.getElementById('mes');
    const chatWindow = document.getElementById('chatWindow');
    let liFocusElem;

    document.onfocus = (e)=>{
        if(e.target.className == 'user'){
            liFocusElem = e.target;
       }
    }

    const socket = io.connect(`http://localhost:8080?id=${userId}`);//  & передавать токен, который формируется в базе при регистрации
   // ${userId} добавить к конекту сервера
    socket.on('connect', ()=>{
        console.log("Ok")
    })

    socket.on('msgToClients', (userName,msg)=>{
        let li = document.createElement("li");
        li.innerHTML = `${userName}: ${msg}`;
        chatWindow.appendChild(li);
       // chatWindow.value += `\n ${msg}`;
    });

    document.onclick = (e)=>{
        switch (e.target.className){
            case 'send':
                socket.emit('send', messageInput.value);
                return;
            case 'ban':
                if(liFocusElem){
                    socket.emit('bun', );
                    
                }
            case 'mute':
                if(liFocusElem){
                    socket.emit('mute', )
                }
        }
    }
}