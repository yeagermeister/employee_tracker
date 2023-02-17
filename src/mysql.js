const mysql = require('mysql2');

class Mysql {
    constructor(dbname) {
        this.establishedConnection = null;
        this.dbname = dbname;
        this.password = 'password';
    }

    connection() {
        return new Promise((resolve, reject) => {
            resolve(mysql.createConnection({
                host: "127.0.0.1",
                user: "root",
                password: this.dbpassword,
                database: this.dbname
            }))
        })
    }
    
    connect() {
        if (!this.establishedConnection) {
            this.establishedConnection = this.connection().then(res => {
                res.connect(function(err) {
                    if (err) {
                        this.dropConnection();
                        throw err;
                    }
              
                console.log(res.state, "connected")
                })
            });
        }
    }
    
    dropConnection() {
        if (this.establishedConnection) {
            this.establishedConnection.then(res => {
                res.end();
                console.log(res.state, 'connection dropped');
            });
          
            this.establishedConnection = null;
        }
    }

    // getDepartments() {
    //     this.establishedConnection.query('SELECT * FROM dpartment', function (err, results) {
    //     console,log(results);
    //     })
    // }
}

module.exports = Mysql;