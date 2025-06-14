const Cidade = require('../models/Cidade');
const { connection } = require('../database/db')

const CidadeModel = new Cidade(connection);

const CidadeService = {
  async getAll() {
    return await CidadeModel.getAll();
  },

  async getById(Codigo) {
    return await CidadeModel.getById(Codigo);
  },

  async create(data) {
    if (!data.Codigo || !data.Nome || !data.idEstado) {
      throw new Error('Codigo, Nome e idEstado são obrigatórios');
    }
    return await CidadeModel.create(data);
  },

  async update(Codigo, data) {
    const Cidade = await CidadeModel.getById(Codigo);
    if (!Cidade) return null;
    return await CidadeModel.update(Codigo, data);
  },

  async delete(Codigo) {
    const Cidade = await CidadeModel.getById(Codigo);
    if (!Cidade) return null;
    return await CidadeModel.delete(Codigo);
  }
};

module.exports = CidadeService;