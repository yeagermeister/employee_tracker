INSERT INTO department (name)
VALUES
("Technical Support"),
("Customer Support"),
("Sales"),
("Marketing"),
("IT");

INSERT INTO role (title, salary, department_id)
VALUES
("Tech", 88000, 1),
("Customer Support", 77000, 2),
("Sales", 82000, 3),
("Marketing", 68000, 4),
("IT", 65000, 5);

INSERT INTO employee (last_name, first_name, role_id, manager_id)
VALUES
("Seinfeld", "Jerry", 1, 5),
("Benes", "Elaine", 2, 5),
("Kramer", "Cosmo", 3, 5),
("Costanza", "George", 4, 5),
("Yeager", "John", 5, NULL); -- NULL because they can't be their own manage