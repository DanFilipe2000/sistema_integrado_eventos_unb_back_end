class Ingresso {
    constructor(connection) {
        this.connection = connection;
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM Ingresso', (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    getByIds({ idParticipante, idEvento }) {
        return new Promise((resolve, reject) => {
            const sql = `
            SELECT * FROM Ingresso
            WHERE idParticipante = ? AND idEvento = ?
        `;
            this.connection.query(sql, [idParticipante, idEvento], (err, results) => {
                if (err) return reject(err);
                resolve(results[0] || null);
            });
        });
    }


    create({ idParticipante, idEvento, idTipoIngresso }) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO Ingresso (idParticipante, idEvento, idTipoIngresso)
                VALUES (?, ?, ?)
            `;
            this.connection.query(sql, [idParticipante, idEvento, idTipoIngresso], (err, result) => {
                if (err) return reject(err);
                resolve({
                    idParticipante,
                    idEvento,
                    idTipoIngresso
                });
            });
        });
    }

    update({ idParticipante, idEvento, idTipoIngresso }, data) {
        return new Promise((resolve, reject) => {


        const sql = `
            UPDATE Ingresso
            SET idParticipante = ?, idEvento = ?
            WHERE idParticipante = ? AND idEvento = ?
        `;

        this.connection.query(
            sql,
            [
                data.idParticipante || idParticipante,
                data.idEvento || idEvento,
                data.idTipoIngresso || idTipoIngresso,
                idParticipante,
                idEvento,
                idTipoIngresso
            ],
            (err, result) => {
                if (err) return reject(err);
                if (result.affectedRows === 0) return resolve(null);
                resolve({
                    idParticipante: data.idParticipante || idParticipante,
                    idEvento: data.idEvento || idEvento,
                    idTipoIngresso: data.idTipoIngresso || idTipoIngresso
                });
            }
        );
    });
}


    delete({ idParticipante, idEvento }) {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM Ingresso WHERE idParticipante = ? AND idEvento = ?`;
            this.connection.query(sql, [idParticipante, idEvento], (err, result) => {
                if (err) return reject(err);
                resolve(result.affectedRows > 0);
            });
        });
    }
}

module.exports = Ingresso;
