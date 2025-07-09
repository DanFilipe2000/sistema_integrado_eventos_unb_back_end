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
  path.resolve(__dirname, '../scripts_mysql/seeders/participante.sql'),
  path.resolve(__dirname, '../scripts_mysql/seeders/expositor.sql'),
  path.resolve(__dirname, '../scripts_mysql/seeders/endereco.sql'),
  path.resolve(__dirname, '../scripts_mysql/seeders/evento.sql'),
  path.resolve(__dirname, '../scripts_mysql/seeders/ingresso.sql'),
  path.resolve(__dirname, '../scripts_mysql/seeders/produto.sql'),
  path.resolve(__dirname, '../scripts_mysql/seeders/rel_evento_categoria.sql'),
  path.resolve(__dirname, '../scripts_mysql/seeders/rel_evento_expositor.sql'),
  path.resolve(__dirname, '../scripts_mysql/seeders/avaliacao.sql'),
  path.resolve(__dirname, '../scripts_mysql/procedures/inscricaoEvento.sql'),
  path.resolve(__dirname, '../scripts_mysql/views/vw_resumo_evento.sql'),
];

async function initDB() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    multipleStatements: true
  });

  console.log('Conexão com MySQL estabelecida!');

  for (const filePath of scripts) {
    try {
      const sql = fs.readFileSync(filePath, 'utf8');
      console.log(`Executando script: ${path.basename(filePath)}`);
      await connection.query(sql);

      if (filePath.includes('create_db.sql')) {
        await connection.changeUser({ database: process.env.DB_NAME });
      }
    } catch (err) {
      console.error(`❌ Erro no script ${path.basename(filePath)}:`, err.message);
      break;
    }
  }

  await connection.end();
  console.log('Conexão encerrada.');
}

module.exports = { initDB };