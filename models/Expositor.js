class Expositor {
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

    getByEmail(email) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM Expositor WHERE email = ?', [email], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return resolve(null);
                resolve(results[0]);
            });
        });
    }
}

module.exports = Expositor;