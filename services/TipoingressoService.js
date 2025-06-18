const Tipoingresso = require('../models/Tipoingresso');
const { connection } = require('../database/db')

const TipoingressoModel = new Tipoingresso(connection);

const TipoingressoService = {
  async getAll() {
    return await TipoingressoModel.getAll();
  },

  async getById(Codigo) {
    return await TipoingressoModel.getById(Codigo);
  },

  async create(data) {
    if (!data.Codigo || !data.Titulo) {
      throw new Error('Codigo e Titulo são obrigatórios');
    }
    return await TipoingressoModel.create(data);
  },

  async update(Codigo, data) {
    const tipoingresso = await TipoingressoModel.getById(Codigo);
    if (!tipoingresso) return null;
    return await TipoingressoModel.update(Codigo, data);
  },

  async delete(Codigo) {
    const tipoingresso = await TipoingressoModel.getById(Codigo);
    if (!tipoingresso) return null;
    return await TipoingressoModel.delete(Codigo);
  }
};

module.exports = TipoingressoService;