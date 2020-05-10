

// берём Express
var express = require('express');
var path = require('path');
// создаём Express-приложение
var app = express();



const postRouter = require('./routes/post.js');
// создаём маршрут для главной страницы
// http://localhost:8080/
app.get('/', function(req, res) {
  res.sendfile('note.html');
});

const { Client } = require('pg');
const connectionString = 'postgres://postgres:postgres@localhost:5432/database_note';
const client = new Client({
    connectionString: connectionString
});


// создаём маршрут для главной страницы
// http://localhost:8080/

app.get('/', function(req, res) {
  res.sendfile('note.html');
});
//Подключаю css и js
app.use('/public', express.static('public'));

//Подлючаем бд
app.use('/api/post', postRouter);




// запускаем сервер на порту 8080
app.listen(8080);





//app.set('port', process.env.PORT || 4000);

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



// отправляем сообщение
console.log('Сервер стартовал!');



