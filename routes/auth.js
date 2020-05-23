var express = require('express');
const authdatabase = require('./connectdb.js'); 
const bodyParser = require('body-parser');
var app = express();
var router = express.Router();

app.set('view engine', 'ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false })




router.post('/about', urlencodedParser, function(req, res){
	if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.password);

    const sql = "SELECT * FROM note.users where name ='"+ req.body.username +"' and password::text ='"+ req.body.password +"'";
    console.log(sql);
    authdatabase.query(sql,  function(err, results) {
        if(err) console.log(err);
        const users = results.rows;
        console.log('users.length '+ users.length);
        if(users.length === 0){
            res.render('reauthorization');
        }else{  
            res.sendfile('note.html');
        }
    });
	
});


router.post('/registrate', urlencodedParser, function(req, res){
  if (!req.body) return res.sendStatus(400);
  res.render('registration');
});
router.post('/createuser', urlencodedParser, function(req, res){
	if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  console.log(req.body.username);
  console.log(req.body.password);

  const sql = "INSERT INTO note.users(name,password) VALUES('"+ req.body.username +"',"+ req.body.password +")";
  console.log(sql);
  authdatabase.query(sql,  function(err, results) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body.username);
    res.sendfile('note.html');
  });
	
});


module.exports = router;