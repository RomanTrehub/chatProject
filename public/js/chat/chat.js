window.onload = ()=>{
    const idInfo = document.getElementById('id');
    const userId = idInfo.innerHTML;
    document.body.removeChild(idInfo);
    const messageInput = document.getElementById('mes');
    const chatWindow = document.getElementById('chatWindow');
    const usersList = document.getElementsByClassName('user');
    const sendButton = document.getElementsByClassName('send')[0];


/*     document.body.onfocus = (e)=>{
        //if(e.target.className == 'user'){
            liFocusElem = e.target;
            console.log(e.target)
       //}
    } */

    const socket = io.connect(`http://localhost:8080?id=${userId}`);//  & передавать токен, который формируется в базе при регистрации
   // ${userId} добавить к конекту сервера
    socket.on('connect', ()=>{
        
    })

    socket.on('msgToClients', (userName,msg)=>{
        let li = document.createElement("li");
        li.innerHTML = `${userName}: ${msg}`;
        chatWindow.appendChild(li);
       // chatWindow.value += `\n ${msg}`;
    });

    socket.on('deleteUser', (username)=>{
        console.log(username);
        for (let i = 0; i < usersList.length; i++){
            if (usersList[i].getAttribute('name') == username){
                usersList[i].firstChild.innerHTML = `${username} :off`;
                //usersList[i].lastChild.firstChild.value = 'Unban';
            }
        }
    });

    socket.on('banButton', (username) =>{
        for (let i = 0; i < usersList.length; i++){
            if (usersList[i].getAttribute('name') == username){
                usersList[i].lastChild.firstChild.value = 'Unban';
            }
        }   
    });      

    socket.on('unbanButton', (username) =>{
        for (let i = 0; i < usersList.length; i++){
            if (usersList[i].getAttribute('name') == username){
                usersList[i].lastChild.firstChild.value = 'Ban';
            }
        }   
    });
    
    socket.on('muteButton', (username) =>{
        for (let i = 0; i < usersList.length; i++){
            if (usersList[i].getAttribute('name') == username){
                usersList[i].lastChild.lastChild.value = 'Unmute';
            }
        }   
    });      

    socket.on('unmuteButton', (username) =>{
        //console.log('working')
        for (let i = 0; i < usersList.length; i++){
            if (usersList[i].getAttribute('name') == username){
                usersList[i].lastChild.lastChild.value = 'Mute';
            }
        }   
    });    

     socket.on('addUser', (usernamesArr, allUsersNames)=>{
         if(usersList.length < allUsersNames.length){
            const li = usersList[usersList.length-1].cloneNode(true);
            li.setAttribute('name', allUsersNames[allUsersNames.length-1]);
            li.firstChild.innerHTML = allUsersNames[allUsersNames.length-1];
            usersList[usersList.length-1].parentNode.insertBefore(li,usersList[usersList.length-1].nextSibling);
         }

        outer:for (var i = 0; i < usersList.length; i++){          
            for(let j = 0; j < usernamesArr.length; j++){
                if(usersList[i].getAttribute('name') == usernamesArr[j]){
                    usersList[i].firstChild.innerHTML = usernamesArr[j];                 
                    continue outer;

                }
            }
        }
    });

    socket.on('muteUser', (username) => {
        sendButton.disabled = true;
        console.log('username');
 /*        for (let i = 0; i < usersList.length; i++){
            if (usersList[i].getAttribute('name') == username){
                console.log(usersList[i].getAttribute('name'));
                usersList[i].lastChild.lastChild.value = 'Unmute';
            }
        }  */     
    });
  

    socket.on('unmuteUser', (username) => {
       sendButton.disabled = false;      
    });


    socket.on('disconnect', () =>{
        window.location.replace('http://localhost:3000/')
    });




    document.onclick = (e)=>{
        switch (e.target.className){
            case 'send':
                socket.emit('send', messageInput.value);
                messageInput.value = '';
                return;
            case 'ban':
                socket.emit('ban', e.target.parentNode.parentNode.getAttribute('name'));   
                return;
            case 'mute':
                socket.emit('mute', e.target.parentNode.parentNode.getAttribute('name'))
                return;
        }
    }

}

