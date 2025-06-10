class Curso {
  constructor(connection) {
    this.connection = connection;
  }

  create({ Codigo, Titulo, idDepartamento }) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO Curso
          (Codigo, Titulo, idDepartamento)
        VALUES (?, ?, ?)
      `;
      this.connection.query(sql, [Codigo, Titulo, idDepartamento], (err, result) => { if (err) return reject(err); resolve({
            Codigo: result.insertId,
            Titulo,
            idDepartamento
          });
        }
      );
    });
  }
}

module.exports = Curso;