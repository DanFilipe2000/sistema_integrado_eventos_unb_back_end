const Curso = require('../models/Curso');
const { connection } = require('../database/db')

const CursoModel = new Curso(connection);

const CursoService = {
  async create(data) {
    if (!data.Titulo || !data.idDepartamento ) {
      throw new Error('Codigo, Titulo, idDepartamento são obrigatórios');
    }
    return await CursoModel.create(data);
  },
};

module.exports = CursoService;