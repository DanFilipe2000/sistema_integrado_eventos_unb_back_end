class Participantes {
  constructor(connection) {
    this.connection = connection;
  }

  findAll(callback) {
    this.connection.query('SELECT * FROM Participantes', (err, results) => {
      callback(err, results);
    });
  }

  findById(matricula, callback) {
    this.connection.query(
      'SELECT * FROM Participantes WHERE Matricula = ?',
      [matricula],
      (err, results) => {
        if (err) return callback(err);
        callback(null, results[0] || null);
      }
    );
  }

  insert(participante, callback) {
    const { CPF, Fones, Nome, DataNascimento, Email, idCurso } = participante;
    this.connection.query(
      `INSERT INTO Participantes (CPF, Fones, Nome, DataNascimento, Email, idCurso)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [CPF, Fones, Nome, DataNascimento, Email, idCurso],
      (err, result) => {
        if (err) return callback(err);
        callback(null, {
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
  }

  update(matricula, participante, callback) {
    const { CPF, Fones, Nome, DataNascimento, Email, idCurso } = participante;
    this.connection.query(
      `UPDATE Participantes
       SET CPF = ?, Fones = ?, Nome = ?, DataNascimento = ?, Email = ?, idCurso = ?
       WHERE Matricula = ?`,
      [CPF, Fones, Nome, DataNascimento, Email, idCurso, matricula],
      err => {
        if (err) return callback(err);
        callback(null, {
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
  }

  delete(matricula, callback) {
    this.connection.query(
      'DELETE FROM Participantes WHERE Matricula = ?',
      [matricula],
      err => {
        if (err) return callback(err);
        callback(null, { Matricula: matricula });
      }
    );
  }
}

module.exports = { Participantes };