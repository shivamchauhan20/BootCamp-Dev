const mysql = require('mysql');
const {user,password,db} = require("../utility/credentials.json");
const con = mysql.createConnection({
  host: "localhost",
  user: user,
  password: password,
  database:db
});

con.connect();
console.log("Connected");
module.exports = con;
