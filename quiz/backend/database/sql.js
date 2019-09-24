const mysql = require("mysql2");
let con = mysql.createConnection({
     host: "localhost",
    user: "root",
    password:"netzwelt",
    database:"quiz"
  });
  con.connect(); 

module.exports=con.promise();

