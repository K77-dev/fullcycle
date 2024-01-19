const mysql = require('mysql');
const http = require('http');

const connection = mysql.createConnection({
    host: 'fullcycle-db', 
    user: 'mysql',
    password: 'root',
    database: 'dbfullcycle'
});

connection.connect();

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        connection.query('CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL)', (err) => {
            if (err) throw err;

            const sql = `INSERT INTO people (name) VALUES ('Full Cycle - Desafio 1 - Kelsen Brito ${Math.floor(Math.random() * 1000)}')`;
            connection.query(sql, (err) => {
                if (err) throw err;

                connection.query('SELECT * FROM people', (err, results) => {
                    if (err) throw err;

                    res.write('<html><body><ul>');
                    results.forEach(person => {
                        res.write(`<li>${person.name}</li>`);
                    });
                    res.write('</ul></body></html>');
                    res.end();
                });
            });
        });
    } else {
        res.writeHead(404);
        res.end('404 - Url não encontrado');
    }
});

server.listen(9000, () => {
    console.log('Servidor rodando na porta 9000');
});
