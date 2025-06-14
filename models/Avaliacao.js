class Avaliacao {
  constructor(connection) {
    this.connection = connection;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM Avaliacao', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  getById(idParticipante) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM Avaliacao WHERE idParticipante = ?',
        [idParticipante],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0] || null);
        }
      );
    });
  }

  create({ Nota, Comentario, idParticipante, idEvento }) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO Avaliacao
          (Nota, Comentario, idParticipante, idEvento)
        VALUES (?, ?, ?, ?)
      `;
      this.connection.query(
        sql,
        [Nota, Comentario, idParticipante, idEvento],
        (err, result) => {
          if (err) return reject(err);
          resolve({
            idParticipante: result.insertId,
            Nota,
            Comentario,
            idParticipante,
            idEvento
          });
        }
      );
    });
  }

  update(idParticipante, { Nota, Comentario, idEvento }) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE Avaliacao
        SET Nota= ?, Comentario = ?, idParticipante = ?, idEvento = ?
        WHERE idParticipante = ?
      `;
      this.connection.query(
        sql,
        [Nota, Comentario, idParticipante, idEvento],
        (err, result) => {
          if (err) return reject(err);
          if (result.affectedRows === 0) return resolve(null);
          resolve({
            idParticipante: idParticipante,
            Nota,
            Comentario,
            idParticipante,
            idEvento
          });
        }
      );
    });
  }

  delete(idParticipante) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'DELETE FROM Avaliacao WHERE idParticipante = ?',
        [idParticipante],
        (err, result) => {
          if (err) return reject(err);
          if (result.affectedRows === 0) return resolve(null);
          resolve({ idParticipante: idParticipante });
        }
      );
    });
  }
}

module.exports = Avaliacao;