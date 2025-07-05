class RelEventoCategoria {
  constructor(connection) {
    this.connection = connection;
  }

  getByCategoria () {

  }

  getByExpositor() {

  }

  create({ idEvento, idCategoria }) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO rel_evento_categoriaevento
          (idEvento, idCategoria)
        VALUES (?, ?)
      `;
      this.connection.query(
        sql,
        [idEvento, idCategoria],
        (err, _result) => {
          if (err) return reject(err);
          resolve({
            idEvento, idCategoria
          });
        }
      );
    });
  }
}

module.exports = RelEventoCategoria;