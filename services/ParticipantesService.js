const Participantes = require('../models/Participantes');
const { connection } = require('../database/db')

const ParticipantesModel = new Participantes(connection);

const ParticipantesService = {
  async getAll() {
    return await ParticipantesModel.getAll();
  },

  async getById(matricula) {
    return await ParticipantesModel.getById(matricula);
  },

  async create(data) {
    if (!data.CPF || !data.Nome) {
      throw new Error('CPF e Nome são obrigatórios');
    }
    return await ParticipantesModel.create(data);
  },

  async update(matricula, data) {
    const participante = await ParticipantesModel.getById(matricula);
    if (!participante) return null;
    return await ParticipantesModel.update(matricula, data);
  },

  async delete(matricula) {
    const participante = await ParticipantesModel.getById(matricula);
    if (!participante) return null;
    return await ParticipantesModel.delete(matricula);
  }
};

module.exports = ParticipantesService;