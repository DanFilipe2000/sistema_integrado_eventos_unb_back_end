class evento {
  constructor(connection) {
    this.connection = connection;
  }
    getAll() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM Evento', (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
    getById(id) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                'SELECT * FROM Evento WHERE Codigo = ?',
                [id],
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results[0] || null);
                }
            );
        });
    }
    create({ Titulo, DataInicio, DataFinal, idEndereco }) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO Evento (Titulo, DataInicio, DataFinal, idEndereco)
        VALUES (?, ?, ?, ?)
      `;
      this.connection.query(
        sql,
        [Titulo, DataInicio, DataFinal, idEndereco],
        (err, result) => {
          if (err) return reject(err);
          resolve({
            Codigo: result.insertId,
            Titulo,
            DataInicio,
            DataFinal,
            idEndereco
          });
        }
      );
    });
}
    update(id, { Titulo, DataInicio, DataFinal, idEndereco }) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE Evento
        SET Titulo = ?, DataInicio = ?, DataFinal = ?, idEndereco = ?
        WHERE Codigo = ?
      `;
      this.connection.query(
        sql,
        [Titulo, DataInicio, DataFinal, idEndereco, id],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.affectedRows > 0);
        }
      );
    });
  }
    
    delete(id) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'DELETE FROM Evento WHERE Codigo = ?',
        [id],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.affectedRows > 0);
        }
      );
    });
  }
}
module.exports = evento;