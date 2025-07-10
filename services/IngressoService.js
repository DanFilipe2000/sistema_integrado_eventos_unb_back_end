const Ingresso = require('../models/Ingresso');
const { connection } = require('../database/connection');

const IngressoModel = new Ingresso(connection);

const IngressoService = {
    async getAll() {
        return await IngressoModel.getAll();
    },

    async getByIds({ idParticipante, idEvento, idTipoIngresso }) {
        return await IngressoModel.getByIds({ idParticipante, idEvento, idTipoIngresso });
    },


    async create(data) {
        if (!data.idParticipante || !data.idEvento || !data.idTipoIngresso) {
            throw new Error('idParticipante, idEvento e idTipoIngresso são obrigatórios');
        }
        return await IngressoModel.create(data);
    },

    async update({ idParticipante, idEvento, idTipoIngresso }, data) {
        const ingresso = await IngressoModel.getByIds({ idParticipante, idEvento, idTipoIngresso });
        if (!ingresso) return null;
        return await IngressoModel.update({ idParticipante, idEvento, idTipoIngresso }, data);
    },

    async delete({ idParticipante, idEvento }) {
        return await IngressoModel.delete({ idParticipante, idEvento });
    }
};

module.exports = IngressoService;
