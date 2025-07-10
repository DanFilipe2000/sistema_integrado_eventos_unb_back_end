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

  getByEmail(Email) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM Participantes WHERE Email = ?',
        [Email],
        (err, results) => {
          if (err) return reject(err);
          if (results.length === 0) return resolve(null);
          resolve(results[0]);
        }
      );
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

  create({ Matricula, CPF, Fones, Nome, DataNascimento, Email, idCurso, Password, Foto_b64 }) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO Participantes
          (Matricula, CPF, Fones, Nome, DataNascimento, Email, idCurso, Password, Foto_b64)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      this.connection.query(
        sql,
        [Matricula, CPF, Fones, Nome, DataNascimento, Email, idCurso, Password, Foto_b64],
        (err, _result) => {
          if (err) return reject(err);
          resolve({
            Matricula,
            CPF,
            Fones,
            Nome,
            DataNascimento,
            Email,
            idCurso,
            Foto_b64
          });
        }
      );
    });
  }

  update(matricula, { CPF, Fones, Nome, DataNascimento, Email, idCurso, Foto_b64 }) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE Participantes
        SET CPF = ?, Fones = ?, Nome = ?, DataNascimento = ?, Email = ?, idCurso = ?, Foto_b64 = ?
        WHERE Matricula = ?
      `;
      this.connection.query(
        sql,
        [CPF, Fones, Nome, DataNascimento, Email, idCurso, Matricula, Foto_b64],
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
            idCurso,
            Foto_b64
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