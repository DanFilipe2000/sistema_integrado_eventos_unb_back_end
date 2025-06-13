class Participantes {
  constructor(connection) {
    this.connection = connection;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM Participantes', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  getById(matricula) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM Participantes WHERE Matricula = ?',
        [matricula],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0] || null);
        }
      );
    });
  }

  create({ CPF, Fones, Nome, DataNascimento, Email, idCurso }) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO Participantes
          (CPF, Fones, Nome, DataNascimento, Email, idCurso)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      this.connection.query(
        sql,
        [CPF, Fones, Nome, DataNascimento, Email, idCurso],
        (err, result) => {
          if (err) return reject(err);
          resolve({
            Matricula: result.insertId,
            CPF,
            Fones,
            Nome,
            DataNascimento,
            Email,
            idCurso
          });
        }
      );
    });
  }

  update(matricula, { CPF, Fones, Nome, DataNascimento, Email, idCurso }) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE Participantes
        SET CPF = ?, Fones = ?, Nome = ?, DataNascimento = ?, Email = ?, idCurso = ?
        WHERE Matricula = ?
      `;
      this.connection.query(
        sql,
        [CPF, Fones, Nome, DataNascimento, Email, idCurso, matricula],
        (err, result) => {
          if (err) return reject(err);
          if (result.affectedRows === 0) return resolve(null);
          resolve({
            Matricula: matricula,
            CPF,
            Fones,
            Nome,
            DataNascimento,
            Email,
            idCurso
          });
        }
      );
    });
  }

  delete(matricula) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'DELETE FROM Participantes WHERE Matricula = ?',
        [matricula],
        (err, result) => {
          if (err) return reject(err);
          if (result.affectedRows === 0) return resolve(null);
          resolve({ Matricula: matricula });
        }
      );
    });
  }
}

module.exports = Participantes;