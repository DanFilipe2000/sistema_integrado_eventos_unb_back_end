const Cidade = require('../models/Cidade');

const { connection } = require('../database/connection');

const CidadeModel = new Cidade(connection);

const CidadeService = {
  async getAll() {
    return await CidadeModel.getAll();
  },

  async getById(id) {
    return await CidadeModel.getById(id);
  },

  async create(data) {
    if (!data.Nome || !data.idEstado) {
      throw new Error('Nome e idEstado são obrigatórios');
    }
    return await CidadeModel.create(data);
  },

  async update(id, data) {
    const cidade = await CidadeModel.getById(id);
    if (!cidade) return null;
    return await CidadeModel.update(id, data);
  },

  async delete(id) {
    const cidade = await CidadeModel.getById(id);
    if (!cidade) return null;
    return await CidadeModel.delete(id);
  }
};

module.exports = CidadeService;