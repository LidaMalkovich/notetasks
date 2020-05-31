

var express = require('express');
var app = express();

const bodyParser = require('body-parser');
const authdatabase = require('./routes/connectdb.js'); 







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

app.post('/save', function(req, res){
  const upInfo = req.body.jsonText2;
  const upId = Number(req.body.idUser);
  console.log(upId);
  console.log(upInfo);
  const sql = "update note.users set info = '"+ upInfo +"' where  id = "+ upId;
console.log(sql);
  authdatabase.query(sql)
    .then(result =>{
      console.log(result[0]);
      console.log('зашло!');
    })
    .catch(err =>{
      console.log(err);
    }); 
});

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
      const idUser = result.rows[0].id;
      res.render('note', {data: dataUser, idUser: idUser});
      console.log('dataUser'+ JSON.stringify(dataUser));
      console.log('idUser'+ JSON.stringify(idUser));
    }
  });
});



app.post('/registrate', urlencodedParser, function(req, res){
  if (!req.body) return res.sendStatus(400);
  //res.render('registration');

  res.render('registration', {data: '', err: false});
});


app.post('/createuser', urlencodedParser, function(req, res){
	if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  console.log(req.body.username);
  console.log(req.body.password);

  const sql = "INSERT INTO note.users(name,password,mail, telephone) VALUES('"+ req.body.username +"',"
  + req.body.password +", '"+ req.body.email +"',  '"+ req.body.tel +"')";
  console.log(sql);
  authdatabase.query(sql)
    .then(result =>{   
      res.render('authorization');
    })
    .catch(err =>{  
      res.render('registration', {data: 'Пользователь с таким логином уже существует!', err: true});
    }); 	
});



//Подключаю css и js
app.use('/public', express.static('public'));
app.use('/', express.static('public'));





// запускаем сервер на порту 8080
app.listen(8080);






// отправляем сообщение
console.log('Сервер стартовал!');



