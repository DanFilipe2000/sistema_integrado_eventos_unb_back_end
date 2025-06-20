const Avaliacao = require('../models/Avaliacao');
const { connection } = require('../database/db');

const AvaliacaoModel = new Avaliacao(connection);

const AvaliacaoService = {
  async getAll() {
    return await AvaliacaoModel.getAll();
  },

  async getById(idParticipante, idEvento) {
    if (!idParticipante || !idEvento) {
      throw new Error('idParticipante e idEvento são obrigatórios');
    }
    return await AvaliacaoModel.getById(idParticipante, idEvento);
  },

  async create(data) {
    if (!data.idParticipante || !data.idEvento) {
      throw new Error('idParticipante e idEvento são obrigatórios');
    }
    
    const existeAvaliacao = await AvaliacaoModel.getById(data.idParticipante, data.idEvento);
    if (existeAvaliacao) {
      throw new Error('Já existe uma avaliação para este participante e evento');
    }

    return await AvaliacaoModel.create(data);
  },

  async update(idParticipante, idEvento, data) {
    if (!idParticipante || !idEvento) {
      throw new Error('idParticipante e idEvento são obrigatórios');
    }

    const avaliacao = await AvaliacaoModel.getById(idParticipante, idEvento);
    if (!avaliacao) return null;

    if (data.idParticipante || data.idEvento) {
      throw new Error('Não é permitido alterar idParticipante ou idEvento');
    }

    return await AvaliacaoModel.update(idParticipante, idEvento, data);
  },

  async delete(idParticipante, idEvento) {
    if (!idParticipante || !idEvento) {
      throw new Error('idParticipante e idEvento são obrigatórios');
    }

    const avaliacao = await AvaliacaoModel.getById(idParticipante, idEvento);
    if (!avaliacao) return null;

    return await AvaliacaoModel.delete(idParticipante, idEvento);
  }
};

module.exports = AvaliacaoService;