-- get employee info
SELECT 
employee.id AS eid, 
first_name AS firstName, 
last_name AS lastName, 
role.title AS title,
department.name AS department,
role.salary AS salary,
manager_id AS manager
FROM employee
JOIN role 
ON employee.role_id = role.id
JOIN department
ON department.id = role.department_id;

-- get departments
SELECT * FROM department;

-- get roles
SELECT * FROM role;

-- add department
INSERT INTO department (name) VALUES test;

-- add role
INSERT INTO role (name, salary, dept) VALUES (test,111111,1);