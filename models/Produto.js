class Produto {
  constructor(connection) {
    this.connection = connection;
  }

  async getAll() {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM Produto', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM Produto WHERE Codigo = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0] || null);
      });
    });
  }

  async create({Titulo, Descricao, Valor, idExpositor, idEvento}) {
    return new Promise((resolve, reject) => {
      this.connection.query('INSERT INTO Produto SET Titulo = ?, Descricao = ?, Valor = ?, idExpositor = ?, idEvento = ?', [Titulo, Descricao, Valor, idExpositor, idEvento], (err, results) => {
        if (err) return reject(err);
        resolve({ 
            id: results.insertId,
            Titulo,
            Descricao,
            Valor,
            idExpositor,
            idEvento
        });
      });
    });
  }

  async update(id, {Titulo, descricao, valor, idExpositor, idEvento}) {
    return new Promise((resolve, reject) => {
      this.connection.query('UPDATE Produto SET ? WHERE Codigo = ?', [{Titulo, descricao, valor, idExpositor, idEvento}, id], (err, results) => {
        if (err) return reject(err);
        resolve(results.affectedRows > 0);
      });
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      this.connection.query('DELETE FROM Produto WHERE Codigo = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results.affectedRows > 0);
      });
    });
  }
}

module.exports = Produto;
