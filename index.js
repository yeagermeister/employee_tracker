const cTable = require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const helpers = require('./src/helper')

function mainMenu() {
    inquirer
        .createPromptModule([
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
                ]
            }
        ])

        .then(answers =>{
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

mainMenu();
