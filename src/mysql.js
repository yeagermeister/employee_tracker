const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employees_db'
    }
);

class Sql {
    constructor(dbname) {
        this.host = '127.0.0.1';
        this.dbname = dbname;
        this.password = 'password'
        this.user = 'root';
    }

    getDepartments() {
        db.promise().query('SELECT * FROM department')
            .then(([rows,fields]) => {
                console.log(rows);
                return rows;
            })
            .catch(console.log)
            .then(() => db.end())

        
        
        // function (err, results) {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log("class", results);
        //         return results}
        // });
    };


};

module.exports = Sql;