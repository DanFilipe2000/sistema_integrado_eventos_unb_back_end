class Endereco {
  constructor(connection) {
    this.connection = connection;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM Endereco', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM Endereco WHERE Codigo = ?',
        [id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0] || null);
        }
      );
    });
  }

  create({ Logradouro, Bairro, Numero, CEP, idCidade }) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO Endereco
          (Logradouro, Bairro, Numero, CEP, idCidade)
        VALUES (?, ?, ?, ?, ?)
      `;
      this.connection.query(
        sql,
        [Logradouro, Bairro, Numero, CEP, idCidade],
        (err, result) => {
          if (err) return reject(err);
          resolve({
            Codigo: result.insertId,
            Logradouro,
            Bairro,
            Numero,
            CEP,
            idCidade
          });
        }
      );
    });
  }

  update(id, { Logradouro, Bairro, Numero, CEP, Latitude, Longitude, idCidade }) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE Endereco
        SET Logradouro = ?, Bairro = ?, Numero = ?, CEP = ?, Latitude = ?, Longitude = ?, idCidade = ?
        WHERE Codigo = ?
      `;
      this.connection.query(
        sql,
        [Logradouro, Bairro, Numero, CEP, Latitude, Longitude, idCidade, id],
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
        'DELETE FROM Endereco WHERE Codigo = ?',
        [id],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.affectedRows > 0);
        }
      );
    });
  }
}

module.exports = Endereco;
