
/* window.onload = ()=>{
 var form = document.getElementById('f');

    function sendForm(){
        console.log(form.elements.name.value);
        const xhr = new XMLHttpRequest();

        var body = {};
        body.name = form.elements.name.value;
        body.pass = form.elements.pass.value;

        xhr.open('POST', '/', true); 
        xhr.setRequestHeader('Content-Type', 'application/json');

        var data = JSON.stringify(body);
        console.log(data);
        xhr.send(data);
    }

    form.onsubmit = function(e){
        sendForm();
        return false;
        window.location.reload();
    }
}*/