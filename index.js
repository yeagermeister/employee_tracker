const cTable = require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');

// sql queries
const sqlEmployees = "SELECT employee.id AS eid, first_name AS firstName, last_name AS lastName, role.title AS title, department.name AS department, role.salary AS salary, manager_id AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.department_id;";
const sqlRoles = "select * from role;";
const sqlDepartments = "SELECT * FROM department";
const insDept = "INSERT INTO department (name) VALUES (?)";
const insRole = "INSERT INTO role (title, salary, department_id) VALUES (?)";
const insEmp = "INSERT INTO employee (last_name, first_name, role_id, manager_id) VALUES (?)";

// Create the connection to the database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employees_db'
    }
);

// ******************************************************************
// ************* Sql Queries and Display ****************************
//******************************************************************* 

// Function to hande generic select queries
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

// Gets the departments while adding a new role
const selectDepartment = async () => {
    const departments = await db.promise().query('SELECT id AS value, name FROM department;');
    return departments[0];
};

// Gets the roles while adding new emloyee
const selectRole = async () => {
    const roles = await db.promise().query('SELECT id AS value, title as name FROM role;');
    return roles[0];
};

// Gets the employes to either select a manager or update a role
const selectEmployee = async () => {
    const employees= await db.promise().query('SELECT id AS value, last_name as name FROM employee;');
    return employees[0];
};



// ******************************************************************
// ********** Inquirer Functions section ****************************
// ****************************************************************** 

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
                    {name: 'Change an employees role', value: 'upEmployee'},
                    {name: "Update an employee's manager", value:'upManager'},
                    {name: "View employees by manager", value:'viewEmpMgr'},
                    {name: 'End the program', value: 'stop'}
                ]
            }
        ])
        .then((answers) => {
            if (answers.choice === 'viewDep') {
                getData(sqlDepartments);
            };
            if (answers.choice === 'viewEmp') {
                getData(sqlEmployees);
            };
            if (answers.choice === 'viewRoles') {
                getData(sqlRoles);
            }; 
            if (answers.choice === 'addDep') {
                addDepartment();
            }; 
            if (answers.choice === 'addRole') {
                addRole();
            }; 
            if (answers.choice === 'addEmployee') {
                addEmployee();
            };      
            if (answers.choice === 'upEmployee') {
                updateEmployee();
            };  
            if (answers.choice === 'upManager') {
                updateManager();
            };
            if (answers.choice === 'viewEmpMgr') {
                viewEmpMgr();
            };  
            if (answers.choice === 'stop') {
                console.clear;
                console.log("Press control + c to finish.")
                return;
            };
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

// This function adds a department after being given the name by the user
function addDepartment() {
    inquirer
        .prompt([
            {type: 'input',
            message: 'Please enter the name of the department.',
            name: 'department'
            }
        ])
        .then(answers => {
            db.query(insDept, [answers.department])
                console.clear();
                getData(sqlDepartments);
        })
};


// This function adds a role after being given info by the user
const addRole = async () => {
    return inquirer.prompt([
        {type: 'input',
        message: 'Please enter the name of the role.',
        name: 'role'
        },
        {type: 'input',
        message: 'Please enter the salary for this role.',
        name: 'salary'
        },
        {type: 'list',
        name: 'departmentRole',
        message: 'Which department does the role belong to?',
        choices: await selectDepartment()
        }
    ])
    .then(function(answers) {
        let insSQLRole = [answers.role, answers.salary, answers.departmentRole];
        db.query(insRole, [insSQLRole]);
        console.clear();
        getData(sqlRoles);
    })
};

// This function adds an employee after being given info by the user
const addEmployee = async () => {
    return inquirer.prompt([
        {type: 'input',
        message: 'Please enter the first name of the employee.',
        name: 'fName'
        },
        {type: 'input',
        message: 'Please enter the last name of the employee.',
        name: 'lName'
        },
        {type: 'list',
        name: 'employeeRole',
        message: 'Which role does the employee fill?',
        choices: await selectRole()
        },
        {type: 'list',
        name: 'employeeMgr',
        message: 'Which manager does the employee report to?',
        choices: await selectEmployee()
        }
    ])
    .then(function(answers) {
        let insSQLEmp = [answers.lName, answers.fName, answers.employeeRole, answers.employeeMgr];
        db.query(insEmp, [insSQLEmp]);
        console.clear();
        getData(sqlEmployees);
    })
};

// function to update and employee's role
const updateEmployee = async () => {
    return inquirer.prompt([
        {type: 'list',
        name: 'employee',
        message: "Which employee's role would you like to update?",
        choices: await selectEmployee()
        },
        {type: 'list',
        name: 'role',
        message: "What is the employee's new role?",
        choices: await selectRole()
        }
    ])
    .then(function(answers) {
        let upEmp = `UPDATE employee SET role_id = ${answers.role} WHERE id = ${answers.employee}`;
        db.query(upEmp);
        console.clear();
        getData(sqlEmployees);
    })
};

// function to update an employee's manager
const updateManager = async () => {
    return inquirer.prompt([
        {type: 'list',
        name: 'employee',
        message: "Which employee's would you like to have report to a new manager?",
        choices: await selectEmployee()
        },
        {type: 'list',
        name: 'manager',
        message: 'Who is the employees new manager?',
        choices: await selectEmployee()
        }
    ])
    .then(function(answers) {
        let upMgr = `UPDATE employee SET manager_id = ${answers.manager} WHERE id = ${answers.employee}`;
        db.query(upMgr);
        console.clear();
        getData(sqlEmployees);
    })
};

// function to view employee's by manager
const viewEmpMgr = async () => {
    return inquirer.prompt([
        {type: 'list',
        name: 'manager',
        message: 'Select a Manager to see thier direct reports?',
        choices: await selectEmployee()
        }
    ])
    .then(function(answers) {
        let getEmps = `SELECT employee.id AS eid, first_name AS firstName, last_name AS lastName, role.title AS title, department.name AS department, role.salary AS salary, manager_id AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.department_id where employee.manager_id = ${answers.manager};`;
        db.query(getEmps, function (err, results) {
            if (err) {
                console.log(err);
                return mainMenu();
            } else {
                console.clear();
                console.table(results);
                clearConsole()
            };
        })
    })
};

mainMenu();
