const Departamento = require('../models/Departamento');
const { connection } = require('../database/connection');

const DepartamentoModel = new Departamento(connection);

const DepartamentoService = {
  async getAll() {
    return await DepartamentoModel.getAll();
  },

  async getById(id) {
    return await DepartamentoModel.getById(id);
  },

  async create(data) {
    if (!data.Nome) {
      throw new Error('Nome é obrigatório');
    }
    return await DepartamentoModel.create(data);
  },

  async update(id, data) {
    const departamento = await DepartamentoModel.getById(id);
    if (!departamento) return null;
    return await DepartamentoModel.update(id, data);
  },

  async delete(id) {
    const departamento = await DepartamentoModel.getById(id);
    if (!departamento) return null;
    return await DepartamentoModel.delete(id);
  }
};

module.exports = DepartamentoService;
