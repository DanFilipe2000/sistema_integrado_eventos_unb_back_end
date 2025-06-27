const Estado = require('../models/Estado');
const { connection } = require('../database/db');

const EstadoModel = new Estado(connection);

const EstadoService = {
  async getAll() {
    return await EstadoModel.getAll();
  },

  async getById(sigla) {
    return await EstadoModel.getById(sigla);
  },

  async create(data) {
    const { sigla, Nome } = data;
    if (!sigla || !Nome) {
      throw new Error('Sigla e Nome são obrigatórios');
    }
    return await EstadoModel.create({ sigla, Nome });
  },

  async update(sigla, data) {
    const estado = await EstadoModel.getById(sigla);
    if (!estado) return null;
    return await EstadoModel.update(sigla, data);
  },

  async delete(sigla) {
    const estado = await EstadoModel.getById(sigla);
    if (!estado) return null;
    return await EstadoModel.delete(sigla);
  }
};

module.exports = EstadoService;