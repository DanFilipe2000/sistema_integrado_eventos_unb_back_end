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

  getById(idParticipante, idEvento) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM Avaliacao WHERE idParticipante = ? AND idEvento = ?',
        [idParticipante, idEvento],
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
            Nota,
            Comentario,
            idParticipante,
            idEvento
          });
        }
      );
    });
  }

  update(idParticipante, idEvento, { Nota, Comentario }) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE Avaliacao
        SET Nota = ?, Comentario = ?
        WHERE idParticipante = ? AND idEvento = ?
      `;
      this.connection.query(
        sql,
        [Nota, Comentario, idParticipante, idEvento],
        (err, result) => {
          if (err) return reject(err);
          if (result.affectedRows === 0) return resolve(null);
          resolve({
            idParticipante,
            idEvento,
            Nota,
            Comentario
          });
        }
      );
    });
  }

  delete(idParticipante, idEvento) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'DELETE FROM Avaliacao WHERE idParticipante = ? AND idEvento = ?',
        [idParticipante, idEvento],
        (err, result) => {
          if (err) return reject(err);
          if (result.affectedRows === 0) return resolve(null);
          resolve({ 
            idParticipante, 
            idEvento,
            message: 'Avaliação removida com sucesso' 
          });
        }
      );
    });
  }
}

module.exports = Avaliacao;