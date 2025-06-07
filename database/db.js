const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '172.24.160.1',
  user: 'root',
  port: '3306',
  password: 'daniel_db_pass',
  database: 'eventos_db',
  multipleStatements: true
});

const { create_db } = require('./sql_scripts');

connection.connect(err => {
  if (err) throw err;
  
  connection.query(create_db, err => {
    if (err) {
      console.error('Erro ao executar o script SQL:', err);
    } else {
      console.log('Banco de dados e tabelas criados com sucesso!');
    }
    connection.end();
  });
});

module.exports = connection;