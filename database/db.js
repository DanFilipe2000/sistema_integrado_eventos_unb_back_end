const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
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