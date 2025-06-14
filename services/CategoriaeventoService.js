const Categoriaevento = require('../models/Categoriaevento');
const { connection } = require('../database/db')

const CategoriaeventoModel = new Categoriaevento(connection);

const CategoriaeventoService = {
  async getAll() {
    return await CategoriaeventoModel.getAll();
  },

  async getById(Codigo) {
    return await CategoriaeventoModel.getById(Codigo);
  },

  async create(data) {
    if (!data.Codigo || !data.Titulo) {
      throw new Error('Codigo e Titulo são obrigatórios');
    }
    return await CategoriaeventoModel.create(data);
  },

  async update(Codigo, data) {
    const categoriaevento = await CategoriaeventoModel.getById(Codigo);
    if (!categoriaevento) return null;
    return await CategoriaeventoModel.update(Codigo, data);
  },

  async delete(Codigo) {
    const categoriaevento = await CategoriaeventoModel.getById(Codigo);
    if (!categoriaevento) return null;
    return await CategoriaeventoModel.delete(Codigo);
  }
};

module.exports = CategoriaeventoService;