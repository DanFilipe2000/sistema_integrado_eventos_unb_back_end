class Tipoingresso {
  constructor(connection) {
    this.connection = connection;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM Tipoingresso', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  getById(Codigo) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM Tipoingresso WHERE Codigo = ?',
        [Codigo],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0] || null);
        }
      );
    });
  }

  create({ Codigo, Titulo }) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO Tipoingresso
          (Codigo, Titulo)
        VALUES (?, ?)
      `;
      this.connection.query(
        sql,
        [Codigo, Titulo],
        (err, result) => {
          if (err) return reject(err);
          resolve({
            Codigo: result.insertId,
            Codigo,
            Titulo
          });
        }
      );
    });
  }

  update(Codigo, { Titulo }) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE Tipoingresso
        SET Codigo = ?, Titulo = ?
        WHERE Codigo = ?
      `;
      this.connection.query(
        sql,
        [Codigo, Titulo, Codigo],
        (err, result) => {
          if (err) return reject(err);
          if (result.affectedRows === 0) return resolve(null);
          resolve({
            Codigo: Codigo,
            Codigo,
            Titulo,
          });
        }
      );
    });
  }

  delete(Codigo) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'DELETE FROM Tipoingresso WHERE Codigo = ?',
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

module.exports = Tipoingresso;