class Curso {
  constructor(connection) {
    this.connection = connection;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM Curso', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM Curso WHERE Codigo = ?',
        [id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0] || null);
        }
      );
    });
  }

  create({ Codigo, Titulo, idDepartamento }) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO Curso
          (Codigo, Titulo, idDepartamento)
        VALUES (?, ?, ?)
      `;
      this.connection.query(sql, [Codigo, Titulo, idDepartamento], (err, result) => {
        if (err) return reject(err);
        resolve({
          Codigo: result.insertId,
          Titulo,
          idDepartamento
        });
      });
    });
  }

  update(id, { Codigo, Titulo, idDepartamento }) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE Curso
        SET Codigo = ?, Titulo = ?, idDepartamento = ?
        WHERE Codigo = ?
      `;
      this.connection.query(sql, [Codigo, Titulo, idDepartamento, id], (err, result) => {
        if (err) return reject(err);
        resolve(result.affectedRows > 0);
      });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'DELETE FROM Curso WHERE Codigo = ?',
        [id],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.affectedRows > 0);
        }
      );
    });
  }
}

module.exports = Curso;
