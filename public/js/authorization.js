'use strict'

function check_username(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    console.log('username '+ username);
    console.log('password '+ password);
    
    if(username=='admin'){
    
        let url = new URL('http://localhost:8080/note');
        window.open(url,  '');  //_self
        return true;
    }
    else{
        return(alert('Не верный логин'));       
    }
}