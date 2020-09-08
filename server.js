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
  .then(function({choice}) {
    if (choice === "View employees") {
      // console.log(choice); output: View employees
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
  connection.query(
    "SELECT employee.id, first_name, last_name, title, department.name, role.salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id",
    function(err, res) {
      if (err) throw err;
      console.log(res);
      start();
    }
  )
};

let viewDepart = () => {
  connection.query(
    "QUERY", {},
    function(err, res) {
      if (err) throw err;
      console.log("testing2")
      start();
    }
  )
};

 let viewRoles = () => {
   connection.query(
     "QUERY", {},
     function(err, res) {
       if (err) throw err;
       console.log("testing3")
       start();
     }
   )
 };
