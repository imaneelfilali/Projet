#!/bin/sh
# create a db and a table:
echo "Initializing database..."
mysql -u root -pmysql <<-EOSQL
CREATE DATABASE IF NOT EXISTS my_database;
USE my_database;
CREATE TABLE IF NOT EXISTS student (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INT NOT NULL
);
EOSQL
echo "Database initialized."
