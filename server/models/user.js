const conn = require("../models/mysql_connection");

const model = {
  getAll(callback){
    conn.query("SELECT * FROM inclass_person", (err, data) => {
      callback(err, data);
    });
  },
  get(id, callback){
    conn.query("SELECT * FROM inclass_person WHERE ID=(?)", id, 
        (err, data) => {
          callback(err, data[0]);
    });
  },
  add(input, callback){
    if(input.Password.length < 8){
      callback(Error('Password must be 8 characters'));  
      return;
    }
    // ? - We'll pass those values later
    // Why [[]]
    //  - We want an array of arrays
    conn.query("INSERT INTO inclass_person (FirstName, LastName, Birthday, Password, CreatedAt) VALUES (?)", 
                [[input.FirstName, input.LastName, input.Birthday, input.Password, new Date()]], 
                (err, data) => {
                  if(err){
                    callback(err);
                    return;
                  }
                  const id = data.insertId;
                  model.get(id, (err, data) =>{
                    callback(err, data);
                  })
                }
    );
  }

};

module.exports = model;
