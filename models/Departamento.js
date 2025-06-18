class Departamento {
  constructor(connection) {
    this.connection = connection;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM Departamento', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM Departamento WHERE Codigo = ?',
        [id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0] || null);
        }
      );
    });
  }

  create({ Nome }) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO Departamento (Nome) VALUES (?)`;
      this.connection.query(sql, [Nome], (err, result) => {
        if (err) return reject(err);
        resolve({
          Codigo: result.insertId,
          Nome
        });
      });
    });
  }

  update(id, { Nome }) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE Departamento SET Nome = ? WHERE Codigo = ?`;
      this.connection.query(sql, [Nome, id], (err, result) => {
        if (err) return reject(err);
        resolve(result.affectedRows > 0);
      });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'DELETE FROM Departamento WHERE Codigo = ?',
        [id],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.affectedRows > 0);
        }
      );
    });
  }
}

module.exports = Departamento;
