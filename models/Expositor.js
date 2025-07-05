class Expositor {
    constructor(connection) {
        this.connection = connection;
    }

    getAll () {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT CPF, Nome, Fones, Email, CaminhoFoto FROM Expositor', (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    getByEmail (email) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM Expositor WHERE email = ?', [email], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return resolve(null);
                resolve(results[0]);
            });
        });
    }

    create (data) {
        return new Promise((resolve, reject) => {
            const { CPF, Nome, DataNascimento, Fones, Email, Password } = data;
            this.connection.query(
                'INSERT INTO Expositor (CPF, Nome, DataNascimento, Fones, Email, Password) VALUES (?, ?, ?, ?, ?, ?)',
                [CPF, Nome, DataNascimento, Fones, Email, Password],
                (err, results) => {
                    if (err) return reject(err);
                    resolve({
                        id: results.insertId,
                        CPF,
                        Nome,
                        DataNascimento,
                        Fones,
                        Email,
                        Password
                     });
                }
            );
        });
    }
};

module.exports = Expositor;