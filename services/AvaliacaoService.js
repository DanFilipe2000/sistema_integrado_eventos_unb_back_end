const Avaliacao = require('../models/Avaliacao');
const { connection } = require('../database/db')

const AvaliacaoModel = new Avaliacao(connection);

const AvaliacaoService = {
  async getAll() {
    return await AvaliacaoModel.getAll();
  },

  async getById(idParticipante) {
    return await AvaliacaoModel.getById(idParticipante);
  },

  async create(data) {
    if (!data.idParticipante || !data.idEvento) {
      throw new Error('idParticipante e idEvento são obrigatórios');
    }
    return await AvaliacaoModel.create(data);
  },

  async update(idParticipante, data) {
    const participante = await AvaliacaoModel.getById(idParticipante);
    if (!participante) return null;
    return await AvaliacaoModel.update(idParticipante, data);
  },

  async delete(idParticipante) {
    const participante = await AvaliacaoModel.getById(idParticipante);
    if (!participante) return null;
    return await AvaliacaoModel.delete(idParticipante);
  }
};

module.exports = AvaliacaoService;