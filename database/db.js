// database/init.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const path = require('path');
const fs = require('fs');

const scripts = [
  path.resolve(__dirname, '../scripts_mysql/create_db.sql'),
  path.resolve(__dirname, '../scripts_mysql/seeders/estado.sql'),
  path.resolve(__dirname, '../scripts_mysql/seeders/cidade.sql'),
  path.resolve(__dirname, '../scripts_mysql/seeders/departamento.sql'),
  path.resolve(__dirname, '../scripts_mysql/seeders/curso.sql'),
  path.resolve(__dirname, '../scripts_mysql/seeders/tipo_ingresso.sql'),
  path.resolve(__dirname, '../scripts_mysql/seeders/categoria_evento.sql'),
];

async function initDB() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    multipleStatements: true
  });

  try {
    console.log('Conexão com MySQL estabelecida!');

    for (const filePath of scripts) {
      const sql = fs.readFileSync(filePath, 'utf8');
      console.log(`Executando script: ${path.basename(filePath)}`);
      await connection.query(sql);
    }

    console.log('Todos os scripts foram executados com sucesso!');
  } catch (err) {
    console.error('Erro ao executar scripts SQL:', err);
  } finally {
    await connection.end();
    console.log('Conexão encerrada.');
  }
}

module.exports = { initDB };