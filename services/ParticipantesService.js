const Participantes = require('../models/Participantes');
const { connection } = require('../database/connection');

const ParticipantesModel = new Participantes(connection);

const ParticipantesService = {
  async getAll() {
    const participantes = await ParticipantesModel.getAll();
    return participantes;
  },

  async getByEmail(email) {
    const participante = await ParticipantesModel.getByEmail(email);
    return participante;
  },

  async getById(matricula) {
    const participante = await ParticipantesModel.getById(matricula);
    return participante;
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