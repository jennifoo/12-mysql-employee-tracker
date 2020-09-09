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
    if (choice === "View departments") {
      viewCol('name', 'department');
    }
    if (choice === "View roles") {
      viewAll('role');
    }
    // if (answer === "Add departments") {
    //   addDepart();
    // }
    // if (answer === "Add roles") {
    //   addRoles();
    // }
    // if (answer === "Add employees") {
    //   addEmployee();
    // }
    // if (answer === "Update employee role") {
    //   updateEmployeeRole();
    // }
  });
}

let viewEmployee = () => {
  connection.query(
    "SELECT employee.id, first_name, last_name, title, department.name, role.salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id",
    function(err, res) {
      if (err) throw err;

      let adjRes = res.map(obj => {
        let rObj = { ...obj }
        rObj["ID"] = obj["id"];
        rObj["First Name"] = obj["first_name"];
        rObj["Last Name"] = obj["last_name"];
        rObj["Title"] = obj["title"];
        rObj["Department"] = obj["name"];
        rObj["Salary"] = obj["salary"];
        delete rObj["id"];
        delete rObj["first_name"];
        delete rObj["last_name"];
        delete rObj["title"];
        delete rObj["name"];
        delete rObj["salary"];
        return rObj
      })
      console.table(adjRes);

      //start();
    }
  )
};

// VIEW DATA - PASS COL + TABLE
let viewCol = (column, tableName) => {
  connection.query("SELECT ?? FROM ??", [column, tableName], function(err, res) {
      if (err) throw err;
      console.table(res)
      start();
    }
  )
};

// VIEW ALL DATA - PASS TABLE
let viewAll = (tableName) => {
  connection.query("SELECT * FROM ??", [tableName], function(err, res) {
      if (err) throw err;
      console.table(res)
      start();
    }
  )
};

 // let viewRoles = () => {
 //   connection.query(
 //     "QUERY", {},
 //     function(err, res) {
 //       if (err) throw err;
 //       console.log("testing3")
 //       start();
 //     }
 //   )
 // };
