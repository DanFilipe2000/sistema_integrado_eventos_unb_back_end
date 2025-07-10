const mysql = require('mysql2');

require('dotenv').config();

const path = require('path');
const fs = require('fs');

const create_db_path = path.resolve(__dirname, '../scripts_mysql/create_db.sql');
const create_db_sql = fs.readFileSync(create_db_path, 'utf8');

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    multipleStatements: true
});

connection.query(create_db_sql);
connection.changeUser({ database: process.env.DB_NAME });

module.exports = { connection };