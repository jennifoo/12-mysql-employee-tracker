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
  return inquirer
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
    if (choice === "Add departments") {
      let addDepart = () => {
         inquirer
        .prompt({
          name: "departAdd",
          type: "input",
          message: "What department would you like to add?"
        })
        .then(function({departAdd}){
          insertVal('department', 'name', departAdd);
          console.log(`The department, ${departAdd} has been added:`)
          viewCol('name', 'department');
        })
      }
      addDepart();
    }
    if (choice === "Add roles") {
    connection.query("SELECT name FROM department", function(err, res) {
            let addRoles = () => {
              return inquirer
              .prompt([
                {
                  name: "roleAdd",
                  type: "input",
                  message: "What role would you like to add?"
                },
                {
                  name: "roleSalary",
                  type: "input",
                  message: "What is the salary of this new role?"
                },
                {
                  name: "roleDepart",
                  type: "list",
                  message: "What department would you like to assign to this new role?",
                  choices: res.map(row => row.name)
                }
              ])
              .then(function(data){

                let getDepartId = (inputDepartName) => {
                  connection.query(
                    "SELECT id FROM department WHERE (name = ?)", [inputDepartName],
                    function(err, res) {
                          //res generates an array
                          insertRole('role', 'title', 'salary', 'department_id', data.roleAdd, data.roleSalary, res[0].id);

                          console.log(`${data.roleAdd} has been added:`)
                          viewAll('role');

                          start();

                  })
                }
                getDepartId(data.roleDepart);
              })
            }
            addRoles();
    })} //Connection Query and If For AddRoles
    if (choice === "Add employees") {
    connection.query("SELECT title FROM role", function(err, res) {
            let addRoles = () => {
              return inquirer
              .prompt([
                {
                  name: "firstAdd",
                  type: "input",
                  message: "What is the first name of the employee?"
                },
                {
                  name: "lastAdd",
                  type: "input",
                  message: "What is the last name of the employee?"
                },
                {
                  name: "employeeRole",
                  type: "list",
                  message: "What role would you like to assign to this new employee?",
                  choices: res.map(row => row.title)
                }
              ])
              .then(function(data){

                let getRoleId = (inputRoleTitle) => {
                  connection.query(
                    "SELECT id FROM role WHERE (title = ?)", [inputRoleTitle],
                    function(err, res) {
                          //res generates an array
                          insertRole('employee', 'first_name', 'last_name', 'role_id', data.firstAdd, data.lastAdd, res[0].id);

                          console.log(`${data.firstAdd} has been added:`)
                          viewEmployee();
                  })
                }
                getRoleId(data.employeeRole);
              })
            }
            addRoles();
    })} //Connection Query and If For AddRoles
  }) //End Then
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
      console.log("\n");
      console.table(adjRes);
      start();
    }
  )
};

// VIEW DATA - PASS COL + TABLE
let viewCol = (column, tableName) => {
  connection.query("SELECT ?? FROM ??", [column, tableName], function(err, res) {
      if (err) throw err;
      console.log("\n");
      console.table(res)
      start();
    }
  )
};

// VIEW ALL DATA - PASS TABLE
let viewAll = (tableName) => {
  connection.query("SELECT * FROM ??", [tableName], function(err, res) {
      if (err) throw err;
      console.log("\n");
      console.table(res)
      start();
    }
  )
};

// ADD DEPARTMENTS
 let insertVal = (tableName, column, value) => {
   connection.query("INSERT INTO ??(??) VALUES (?)", [tableName, column, value], function(err, res) {
       if (err) throw err;
     }
   )
 };

 // ADD ROLES, ADD EMPLOYEES
  let insertRole = (tableName, colTitle, colSal, colDepart, valTitle, valSal, valDepart) => {
    connection.query("INSERT INTO ??(??, ??, ??) VALUES (?, ?, ?)", [tableName, colTitle, colSal, colDepart, valTitle, valSal, valDepart], function(err, res) {
        if (err) throw err;
      }
    )
  };
