var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
// https://www.npmjs.com/package/console.table

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: root,
  password: "password",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("0.connected as id " + connection.threadId);
  start();
}

//view employees / departments / roles
function view() {
  connection.connect(function(err) {
    if (err) throw err;
    console.log("1.connected as id " + connection.threadId);
    add();
  }
}

// add departments / roles / employees
function add(){
  connection.connect(function(err) {
    if (err) throw err;
    console.log("2.connected as id " + connection.threadId);
    add();
  }
}

// update employee roles
function update() {
connection.connect(function(err) {
    if (err) throw err;
    console.log("3.connected as id " + connection.threadId);
    add();
  }
}
