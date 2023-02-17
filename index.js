const cTable = require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');


const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );



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
                    {name: 'Update an employee', value: 'upEmployee'}
                ]
            }
        ])
        .then((answers) => {
            if(answers.choice === 'viewDep') {
                getDepartments();
            };
            if(answers.choice === 'viewRoles') {
                getRoles();
            };
            if(answers.choice === 'viewEmp') {
                getEmployees();
            };
            if(answers.choice === 'addDep') {
                addDepartment();
            };
            if(answers.choice === 'addRole') {
                addRole();
            };
            if(answers.choice === 'addEmployee') {
                addEmployee();
            };
            if(answers.choice === 'upEmployee') {
                updateEmployee();
            };
        })
};

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

function getDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
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

function getRoles() {
    db.query('SELECT * FROM role', function (err, results) {
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

function getEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
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

function addDepartment() {
    inquirer
        .prompt([
            {type: 'input',
            message: 'Please enter the name of the department.',
            name: 'department'
            }
        ])
        .then(answers => {
            db.query('INSERT INTO department (name) VALUES (?)', [answers.department], function (err, results) {
                console.clear();
                getDepartments();
            })
        });
};

function addRole() {
    inquirer
        .prompt([
            {type: 'input',
            message: 'Please enter the name of the role.',
            name: 'role'
            }
        ])
        .then(answers => {
            db.query('INSERT INTO role (name) VALUES (?)', [answers.role], function (err, results) {
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
            name: 'role'
            }
        ])
        .then(answers => {
            db.query('INSERT INTO department (first_name) VALUES (?)', [answers.role], function (err, results) {
                console.clear();
                getRoles();
            })
        });
};

function upEmployee() {
    db.query('SELECT * FROM employee', function (err, results) {
    console.log(results);
    })
};


mainMenu();
