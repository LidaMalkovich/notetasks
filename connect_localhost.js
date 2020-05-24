
// берём Express
var express = require('express');
var app = express();
var path = require('path');

const http = require('http');
const bodyParser = require('body-parser');
const authdatabase = require('./routes/connectdb.js'); 

const postRouter = require('./routes/post.js');





// Окно авторизации
// http://localhost:8080/

//Переход основное приложение
app.get('/note', function(req, res) {
  res.sendfile('note.html');
});

app.set('view engine', 'ejs');
app.use(bodyParser())
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.get('/', (req, res)=> res.render('authorization'));



app.post('/about', urlencodedParser, function(req, res){
	if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  console.log(req.body.username);
  console.log(req.body.password);

  const sql = "SELECT * FROM note.users where name ='"+ req.body.username +"' and password::text ='"+ req.body.password +"'";
 
  authdatabase.query(sql,  function(err, result) {
    if(err) console.log(err);
    console.log(result);
    const users = result.rows;

    console.log('users.length '+ users.length);
  
    if(users.length === 0){
      res.render('reauthorization');
    }else{  
      const dataUser = result.rows[0].info;

      res.render('note', {data: dataUser });
    }
  });
});



app.post('/registrate', urlencodedParser, function(req, res){
  if (!req.body) return res.sendStatus(400);
  res.render('registration');
});
app.post('/createuser', urlencodedParser, function(req, res){
	if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  console.log(req.body.username);
  console.log(req.body.password);

  const sql = "INSERT INTO note.users(name,password) VALUES('"+ req.body.username +"',"+ req.body.password +")";
  console.log(sql);
  authdatabase.query(sql,  function(err, results) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body.username);
    //res.sendfile('note.html');
    res.render('note');
  });
	
});



//Подключаю css и js
app.use('/public', express.static('public'));
app.use('/', express.static('public'));
//Подлючаем бд
//app.use('/api/post', postRouter);




// запускаем сервер на порту 8080
app.listen(8080);






// отправляем сообщение
console.log('Сервер стартовал!');



