class RelEventoExpositor {
  constructor(connection) {
    this.connection = connection;
  }

  getExpositoresByEvento({ idEvento }) {
    return new Promise((resolve, reject) => {
      const sql = `
      SELECT e.*
      FROM expositor e
      JOIN rel_evento_expositor ree ON e.CPF = ree.idExpositor
      WHERE ree.idEvento = ?
    `;

      this.connection.query(sql, [idEvento], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  create({ idEvento, idExpositor }) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO rel_evento_expositor
          (idEvento, idExpositor)
        VALUES (?, ?)
      `;
      this.connection.query(
        sql,
        [idEvento, idExpositor],
        (err, _result) => {
          if (err) return reject(err);
          resolve({
            idEvento, idExpositor
          });
        }
      );
    });
  }
}

module.exports = RelEventoExpositor;