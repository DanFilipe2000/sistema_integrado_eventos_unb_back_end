class Estado {
  constructor(connection) {
    this.connection = connection;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM Estado', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  getById(sigla) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM Estado WHERE Sigla = ?',
        [sigla],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0] || null);
        }
      );
    });
  }

  create({ sigla, Nome }) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO Estado (Sigla, Nome) VALUES (?, ?)`;
      this.connection.query(sql, [sigla, Nome], (err, result) => {
        if (err) return reject(err);
        resolve({ sigla, Nome });
      });
    });
  }

  update(sigla, { Nome }) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE Estado SET Nome = ? WHERE Sigla = ?`;
      this.connection.query(sql, [Nome, sigla], (err, result) => {
        if (err) return reject(err);
        resolve(result.affectedRows > 0);
      });
    });
  }

  delete(sigla) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'DELETE FROM Estado WHERE Sigla = ?',
        [sigla],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.affectedRows > 0);
        }
      );
    });
  }
}

module.exports = Estado;