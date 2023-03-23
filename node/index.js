const express = require('express')
const app = express()
const port = 3000
const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sqlTable = `CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))`
connection.query(sqlTable)

const sql = `INSERT INTO people(name) VALUES('Henrique')`
connection.query(sql)
connection.end()

app.get('/', (req, res) => {
    var html = '<h1>Full Cycle!!!</h1>'
  
    conn = mysql.createConnection(config)
    conn.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL database:', err)
            return
        }

        conn.query('SELECT * FROM people', (err, rows) => {
            if (err) {
                console.error('Error reading data from table:', err)
                return
            }
        
            html += '<table>'

            rows.forEach((row) => {
                html += `<tr><td>${row.name}</td></tr>`
                console.log(row)
            });

            html += '</table>'
        
            conn.end((err) => {
                if (err) {
                console.error('Error closing MySQL connection:', err);
                return;
                }
        
                console.log('MySQL connection closed.');
            });

            res.send(html)
        });

        console.log('Database connections is ok.');
    })
})

app.listen(port, () => {
    console.log('Running in port ' + port)
})