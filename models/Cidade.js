class Cidade {
  constructor(connection) {
    this.connection = connection;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM Cidade', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM Cidade WHERE Codigo = ?',
        [id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0] || null);
        }
      );
    });
  }

  create({ Nome, idEstado }) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO Cidade (Nome, idEstado) VALUES (?, ?)`;
      this.connection.query(sql, [Nome, idEstado], (err, result) => {
        if (err) return reject(err);
        resolve({
          Codigo: result.insertId,
          Nome,
          idEstado
        });
      });
    });
  }

  update(id, { Nome, idEstado }) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE Cidade SET Nome = ?, idEstado = ? WHERE Codigo = ?`;
      this.connection.query(sql, [Nome, idEstado, id], (err, result) => {
        if (err) return reject(err);
        resolve(result.affectedRows > 0);
      });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'DELETE FROM Cidade WHERE Codigo = ?',
        [id],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.affectedRows > 0);
        }
      );
    });
  }
}

module.exports = Cidade;
