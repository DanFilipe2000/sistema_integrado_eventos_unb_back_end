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

  getById(Codigo) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM Cidade WHERE Codigo = ?',
        [Codigo],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0] || null);
        }
      );
    });
  }

  create({ Codigo, Nome, idEstado }) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO Cidade
          (Codigo, Nome, idEstado)
        VALUES (?, ?, ?)
      `;
      this.connection.query(
        sql,
        [Codigo, Nome, idEstado],
        (err, result) => {
          if (err) return reject(err);
          resolve({
            Codigo: result.insertId,
            Codigo,
            Nome, 
            idEstado
          });
        }
      );
    });
  }

  update(Codigo, { Nome, idEstado }) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE Cidade
        SET Codigo = ?, Nome = ?, idEstado = ?
        WHERE Codigo = ?
      `;
      this.connection.query(
        sql,
        [Codigo, Nome, idEstado],
        (err, result) => {
          if (err) return reject(err);
          if (result.affectedRows === 0) return resolve(null);
          resolve({
            Codigo: Codigo,
            Codigo,
            Nome, 
            idEstado
          });
        }
      );
    });
  }

  delete(Codigo) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'DELETE FROM Cidade WHERE Codigo = ?',
        [Codigo],
        (err, result) => {
          if (err) return reject(err);
          if (result.affectedRows === 0) return resolve(null);
          resolve({ Codigo: Codigo });
        }
      );
    });
  }
}

module.exports = Cidade;