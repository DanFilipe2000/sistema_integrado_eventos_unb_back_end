const Evento = require('../models/Evento');
const { connection } = require('../database/db');
const EventoModel = new Evento(connection);

const EventoService = {
  async getAll() {
    return await EventoModel.getAll();
  },

  async getById(id) {
    return await EventoModel.getById(id);
  },

  async create(data) {
    const { Titulo, DataInicio, DataFinal, idEndereco } = data;
    if (!Titulo || !DataInicio || !DataFinal || !idEndereco) {
      throw new Error('Título, datas e endereço são obrigatórios');
    }
    return await EventoModel.create({ Titulo, DataInicio, DataFinal, idEndereco });
  },

  async update(id, data) {
    const evento = await EventoModel.getById(id);
    if (!evento) return null;
    return await EventoModel.update(id, data);
  },

  async delete(id) {
    const evento = await EventoModel.getById(id);
    if (!evento) return null;
    return await EventoModel.delete(id);
  }
};

module.exports = EventoService;
