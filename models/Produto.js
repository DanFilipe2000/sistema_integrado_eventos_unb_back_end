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
      this.connection.query('SELECT * FROM Produto WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0] || null);
      });
    });
  }

  async create({Titulo, descricao, valor, idExpositor, idEvento}) {
    return new Promise((resolve, reject) => {
      this.connection.query('INSERT INTO Produto SET Titulo = ?, descricao = ?, valor = ?, idExpositor = ?, idEvento = ?', [Titulo, descricao, valor, idExpositor, idEvento], (err, results) => {
        if (err) return reject(err);
        resolve({ 
            id: results.insertId,
            Titulo,
            descricao,
            valor,
            idExpositor,
            idEvento
        });
      });
    });
  }

  async update(id, {Titulo, descricao, valor, idExpositor, idEvento}) {
    return new Promise((resolve, reject) => {
      this.connection.query('UPDATE Produto SET ? WHERE id = ?', [{Titulo, descricao, valor, idExpositor, idEvento}, id], (err, results) => {
        if (err) return reject(err);
        resolve(results.affectedRows > 0);
      });
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      this.connection.query('DELETE FROM Produto WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results.affectedRows > 0);
      });
    });
  }
}

module.exports = Produto;
