const { Client } = require('pg');

DATABASE_URL = 'postgres://postgres:postgres@localhost:5432/database_note';

const client = new Client({
    connectionString: DATABASE_URL
});

client.connect(function(err) {
    if (err) throw err;
    client.query("SELECT * FROM note.tasks where id = $1", [1], function (err, result) {
      if (err) throw err;
      console.log(result);
      console.log(result.fields);
      let jsonFromDB = result.fields   
    });
  });


  module.exports = client;




