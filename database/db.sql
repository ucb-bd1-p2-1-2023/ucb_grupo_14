-- creating the database
CREATE DATABASE db1;

-- Usiing the database
use db1;

-- Creating a table
CREATE TABLE user (
    id int PRIMARY KEY AUTO_INCREMENT,
    firstname varchar(20),
    lastname varchar(20),
    email varchar(30),
    ADRRESS varchar(20)
);

CREATE TABLE worker (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(20),
    lastnamePather VARCHAR(20),
    lastnameMother VARCHAR(20),
    phone INT(10),
    email VARCHAR(30),
    address VARCHAR(20)
);
-- tp show all tables
SHOW TABLES;

-- to describe the table
DESCRIBE user;
