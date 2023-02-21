const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employees_db'
    }
);

temp = getDepartments() {
    db.promise().query('SELECT * FROM department')
        .then(([rows,fields]) => {
            console.log(rows);
            return rows;
        })
        .catch(console.log)
        .then(() => db.end())
};

console.log('temp', temp);
