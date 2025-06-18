const Curso = require('../models/Curso');
const { connection } = require('../database/db')

const CursoModel = new Curso(connection);

const CursoService = {
  async getAll() {
    return await CursoModel.getAll();
  },
  async getById(id) {
    return await CursoModel.getById(id);
  },
  async create(data) {
    if (!data.Titulo || !data.idDepartamento ) {
      throw new Error('Codigo, Titulo, idDepartamento são obrigatórios');
    }
    return await CursoModel.create(data);
  },
  async update(id, data) {
    const curso = await CursoModel.getById(id);
    if (!curso) return null;
    return await CursoModel.update(id, data);
  },
  async delete(id) {
    const curso = await CursoModel.getById(id);
    if (!curso) return null;
    return await CursoModel.delete(id);
  }
};

module.exports = CursoService;