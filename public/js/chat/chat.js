window.onload = ()=>{
    const idInfo = document.getElementById('id');
    const userId = idInfo.innerHTML;
    document.body.removeChild(idInfo);
    const messageInput = document.getElementById('mes');
    const chatWindow = document.getElementById('chatWindow');
    let liFocusElem;
    let usersList = document.getElementsByClassName('user');
    let sendButton = document.getElementsByClassName('send')[0];
    const usersUl = document.getElementById('usersUl');

/*     document.body.onfocus = (e)=>{
        //if(e.target.className == 'user'){
            liFocusElem = e.target;
            console.log(e.target)
       //}
    } */

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

    socket.on('deleteUser', (username)=>{
        for (let i = 0; i <= usersList.length; i++){
            if (usersList[i].innerHTML == username + ': off'){
                usersList[i].innerHTML = username;
            }
        }
    });

/*     socket.on('addUser', (username)=>{
        for (let i = 0; i <= usersList.length; i++){
            if (usersList[i].innerHTML == username){
                usersList[i].innerHTML+= ': оff';
            }
        }
    }); */

    socket.on('muteUser', () => {
        sendButton.disabled = true;
    });

    socket.on('unmuteUser', () => {
        sendButton.disabled = false;
    });



    document.onclick = (e)=>{

        if(e.target.tagName == 'LI'){
            console.log('LI')
        }
        switch (e.target.className){
            case 'send':
                socket.emit('send', messageInput.value);;
                return;
            case 'ban':
                console.log(e.target);
                if(liFocusElem){
                    socket.emit('ban', liFocusElem.innerHTML);
                    
                }
                return;
            case 'mute':
                if(liFocusElem){
                    socket.emit('mute', liFocusElem.innerHTML)
                }
                console.log(e.target)
                return;
            case 'user':
                liFocusElem = e.target;
                console.log(e.target);
                return;
        }
    }

    usersUl.onclick = (e) =>{
        if(e.target.tagName === 'LI') console.log(e.target);
    }
}

console.log('tese');
function setRole(name) {
    console.log(name);
}