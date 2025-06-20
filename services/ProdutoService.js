const Produto = require('../models/Produto');
const { connection } = require('../database/db');
const ProdutoModel = new Produto(connection);

const ProdutoService = {
  async getAll() {
    return await ProdutoModel.getAll();
  },

  async getById(id) {
    return await ProdutoModel.getById(id);
  },

  async create(data) {
    if (!data.Titulo || !data.idExpositor || !data.idEvento) {
      throw new Error('Título, Expositor e Evento são obrigatórios');
    }
    return await ProdutoModel.create(data);
  },

  async update(id, data) {
    const produto = await ProdutoModel.getById(id);
    if (!produto) return null;
    return await ProdutoModel.update(id, data);
    },

  async delete(id) {
    const produto = await ProdutoModel.getById(id);
    if (!produto) return null;
    return await ProdutoModel.delete(id);
  }
};

module.exports = ProdutoService;
