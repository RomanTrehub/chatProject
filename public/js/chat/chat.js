window.onload = ()=>{
    const messageInput = document.getElementById('message');
    const chatWindow = document.getElementById('chatWindow');
    const socket = io.connect('http://localhost:8080');

    socket.on('connect', ()=>{
        console.log("Ok")
    })

    socket.on('msgToClients', (msg)=>{
        chatWindow.value += `\n ${msg}`;
    });

    document.onclick = (e)=>{
        switch (e.target.className){
            case 'send':
                socket.emit('send', messageInput.value);
        }
    }
    return false;
}