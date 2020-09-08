var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
// https://www.npmjs.com/package/console.table

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("0.connected as id " + connection.threadId);
  start();
});


 let start = () => {
  inquirer
  .prompt({
    name: "choice",
    type: "list",
    message: "Please select an option listed below:",
    choices: [
      "View employees",
      "View departments",
      "View roles",
      "Add departments",
      "Add roles",
      "Add employees",
      "Update employee roles"
    ]
  })
  .then(function(answer) {
    if (answer === "View employees") {
      viewEmployee();
    }
    if (answer === "View departments") {
      viewDepart();
    }
    if (answer === "View roles") {
      viewRoles();
    }
    if (answer === "Add departments") {
      addDepart();
    }
    if (answer === "Add roles") {
      addRoles();
    }
    if (answer === "Add employees") {
      addEmployee();
    }
    if (answer === "Update employee role") {
      updateEmployeeRole();
    }
  });
}

let viewEmployee = () => {
  connection.connect(function(err) {
    if (err) throw err;
    console.log("1.connected as id " + connection.threadId);
    add();
  });
}

function viewDepart(){
  connection.connect(function(err) {
    if (err) throw err;
    console.log("2.connected as id " + connection.threadId);
    add();
  });
}

function viewRoles() {
connection.connect(function(err) {
    if (err) throw err;
    console.log("3.connected as id " + connection.threadId);
    add();
  });
}
