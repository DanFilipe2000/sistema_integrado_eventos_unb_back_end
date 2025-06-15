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

  getById(Sigla) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM Estado WHERE Sigla = ?',
        [Sigla],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0] || null);
        }
      );
    });
  }

  create({ Sigla, Nome }) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO Estado (Sigla, Nome) VALUES (?, ?)`;
      this.connection.query(sql, [Sigla, Nome], (err, result) => {
        if (err) return reject(err);
        resolve({ Sigla, Nome });
      });
    });
  }

  update(Sigla, { Nome }) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE Estado SET Nome = ? WHERE Sigla = ?`;
      this.connection.query(sql, [Nome, Sigla], (err, result) => {
        if (err) return reject(err);
        resolve(result.affectedRows > 0);
      });
    });
  }

  delete(Sigla) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'DELETE FROM Estado WHERE Sigla = ?',
        [Sigla],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.affectedRows > 0);
        }
      );
    });
  }
}

module.exports = Estado;