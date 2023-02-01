const mysql = require('mysql2');

class Mysql {
    constructor(db) {
        this.db = db;
        this.user = user;
        this.password = password;
        this.database = database;
    }

    getEmployees() {
        db.querry
    }
}

const db = mysql.createConnection (
    {
    host: '127.0.0.1',
    user: 'root',
    passowrd: 'password',
    database: 'employees'
    }
);




module.exports = Mysql;