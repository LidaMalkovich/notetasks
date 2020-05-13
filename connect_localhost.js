
// берём Express
var express = require('express');
var path = require('path');
const http = require('http');
// создаём Express-приложение
var app = express();

const postRouter = require('./routes/post.js');

const JsonText = require('./public/js/jsData.js');

console.log('JsonText'+ String(JsonText));


// Окно авторизации
// http://localhost:8080/
app.get('/', function(req, res) {
  res.sendfile('authorization.html');
});
//Переход основное приложение
app.get('/note', function(req, res) {
  res.sendfile('note.html');
});



const { Client } = require('pg');
const connectionString = 'postgres://postgres:postgres@localhost:5432/database_note';
const client = new Client({
    connectionString: connectionString
});





//Подключаю css и js
app.use('/public', express.static('public'));
app.use('/', express.static('public'));
//Подлючаем бд
app.use('/api/post', postRouter);




// запускаем сервер на порту 8080
app.listen(8080);





//app.set('port', process.env.PORT || 4000);
/*
client.connect(function(err) {
  if (err) throw err;
  client.query("SELECT * FROM note.tasks where id = $1", [1], function (err, result) {
    if (err) throw err;
    console.log(result);
    console.log(result.fields);
  
    let jsonFromDB = result.fields
    module.exports = jsonFromDB;
  });
});
*/
function selectTasks(){
  client.connect(function(err) {
    client.query("SELECT * FROM note.tasks where id = $1", [1], function (err, result) {
      if (err) throw err;
      console.log(result.fields);
      return result.fields;
      
    });
  });
};






// отправляем сообщение
console.log('Сервер стартовал!');



