DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department(
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT
    , name VARCHAR(30)
);

DROP TABLE IF EXISTS role;
CREATE TABLE role(
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT
    , title VARCHAR(30)
    , salary DECIMAL(9,2)
    , department_id INT
);

CREATE TABLE employee(
	id INT PRIMARY KEY
    , first_name VARCHAR(30)
    , last_name VARCHAR(30)
    , role_id INT
    , manager_id INT NULL
);

SELECT * FROM employee;