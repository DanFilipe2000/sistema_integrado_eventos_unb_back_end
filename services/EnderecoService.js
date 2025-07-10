const Endereco = require('../models/Endereco');
const { connection } = require('../database/connection');

const EnderecoModel = new Endereco(connection);

const EnderecoService = {
  async getAll() {
    return await EnderecoModel.getAll();
  },

  async getById(id) {
    return await EnderecoModel.getById(id);
  },

  async create(data) {
    const camposObrigatorios = ['Logradouro', 'Bairro', 'Numero', 'CEP', 'idCidade'];
    for (const campo of camposObrigatorios) {
      if (!data[campo]) {
        throw new Error(`${campo} é obrigatório`);
      }
    }
    return await EnderecoModel.create(data);
  },

  async update(id, data) {
    const endereco = await EnderecoModel.getById(id);
    if (!endereco) return null;
    return await EnderecoModel.update(id, data);
  },

  async delete(id) {
    const endereco = await EnderecoModel.getById(id);
    if (!endereco) return null;
    return await EnderecoModel.delete(id);
  }
};

module.exports = EnderecoService;
