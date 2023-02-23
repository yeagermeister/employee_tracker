const cTable = require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');

// sql queries
const sqlEmployees = "SELECT employee.id AS eid, first_name AS firstName, last_name AS lastName, role.title AS title, department.name AS department, role.salary AS salary, manager_id AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.department_id;";
const sqlRoles = "select * from role;";
const sqlDepartments = "SELECT * FROM department";
const insDept = "INSERT INTO department (name) VALUES (?)"


// Create the connection to the database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

// ******************************************************************
// ************* Sql Queries and Display ****************************
//******************************************************************* 

// Function to hande select queries
  function getData(queryString) {
    db.query(queryString, function (err, results) {
        if (err) {
            console.log(err);
            return mainMenu();
        } else {
            console.clear();
            console.table(results);
            clearConsole()
        };
    });
};


// ******************************************************************
// ********** Inquirer Functions section ****************************
//******************************************************************* 

// Generate the main menu
function mainMenu() {
    inquirer
        .prompt([
            {type: 'list',
            message: 'What would you like to do?',
            name: 'choice',
            choices: [
                    {name: 'View all departments', value: 'viewDep'},
                    {name: 'View all roles', value: 'viewRoles'},
                    {name: 'View all employees', value: 'viewEmp'},
                    {name: 'Add a department', value: 'addDep'},
                    {name: 'Add a role', value: 'addRole'},
                    {name: 'Add an employee', value: 'addEmployee'},
                    {name: 'Update an employee', value: 'upEmployee'},
                    {name: 'End the program', value: 'stop'}
                ]
            }
        ])
        .then((answers) => {
            switch (answers.choice) {
                case 'viewDep':
                    getData(sqlDepartments);
                case 'viewEmp':
                    getData(sqlEmployees);   
                case 'viewRoles':
                    getData(sqlRoles); 
                case 'addDep':
                    addDepartment();       
                case 'addRole':
                    addRole();   
                case 'addEmployee':
                    addEmployee;      
                case 'upEmployee':
                    updateEmployee();
                case 'stop':
                    endSession();
            }
        })
};



// ******************************************************************
// ******************** Helper Functions ****************************
//******************************************************************* 

// Prompts the user to continue and clears the console
function clearConsole() {
    inquirer
        .prompt([
        {type: 'input',
        message: 'Press enter to proceed',
        name: 'proceed'}
        ])
        .then((answers) => {
            console.clear();
            return mainMenu();
        })
};

// I could find no way to gracefully shut this program down from within inquirer so using this.
function endSession() {
   throw "Thank you for using the employee tracker";
};

function addDepartment() {
    inquirer
        .prompt([
            {type: 'input',
            message: 'Please enter the name of the department.',
            name: 'department'
            }
        ])
        .then(answers => {
            db.query(insDept, [answers.department], function (err, results) {
                console.clear();
                getDepartments();
            })
        });
};

function addRole() {
    getDepartments();
    console.log(myDepartments);
    inquirer
        .prompt([
            {type: 'input',
            message: 'Please enter the name of the role.',
            name: 'role'
            },
            {type: 'input',
            message: 'Please enter the salary for this role.',
            name: 'salary'
            }

        ])
        .then(answers => {
            db.query('INSERT INTO role (name, salary, dept) VALUES (?)', [answers.role], function (err, results) {
                console.clear();
                getRoles();
                
            })
        });
};

function addEmployee() {
    inquirer
        .prompt([
            {type: 'input',
            message: 'Please enter the first name of the employee.',
            name: 'employee'
            }
        ])
        .then(answers => {
            db.query('INSERT INTO department (first_name) VALUES (?)', [answers.employee], function (err, results) {
                console.clear();
                getRoles();
            })
        });
};

function updateEmployee() {
    db.query('SELECT * FROM employee', function (err, results) {
    console.log(results);
    })
};


mainMenu();
